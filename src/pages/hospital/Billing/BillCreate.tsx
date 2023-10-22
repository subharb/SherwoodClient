import React, { useState } from 'react';
import { IPatient, IPersonalData, ReduxStore } from '../../../constants/types';
import { Bill, BillItem, BillableCombo } from './types';
import { Language } from 'react-localize-redux';
import { BillForm } from './BillForm';
import { FindPatient } from './find_patient';
import { useSnackBarState } from '../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { pushBillables } from '../../../redux/actions/billingActions';
import PatientInfo from './PatientInfo';
import { Grid, TextField } from '@mui/material';
import { Autocomplete } from "@mui/lab"
import { ButtonAdd } from '../../../components/general/mini_components';

interface BillCreateProps {
    patients:IPatient[],
    personalFields:IPersonalData[],
    currency: string,
    uuidInvestigation: string,
    idBillingInfo:number,
    languageCode: string,
    surveyAdditionalInfo?: any,
    withDiscount: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onCancelBill: () => void

}

const BillCreate: React.FC<BillCreateProps> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(null);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const loadingBillables = useSelector((state:ReduxStore) => state.billing.loading);
    const billableCombos = useSelector((state:ReduxStore) => state.billing.data.billableCombos ? state.billing.data.billableCombos : []);
    const [comboSelected, setComboSelected] = useState<BillableCombo | null>(null);
    const dispatch = useDispatch();

    async function addBillablesCombo(){
        console.log("addBillablesCombo", comboSelected?.billables);
        if(comboSelected){
            const newItems:BillItem[] = [];           
            await dispatch(pushBillables(comboSelected.billables));
        }
        setComboSelected(null);
    }

    function selectCombo(comboSelected:BillableCombo | null){
        if(comboSelected === null){
            return;
        }
        const comboFound = billableCombos.find((combo) => combo.id === comboSelected.id);
        if(comboFound){
            console.log("comboFound", comboFound.billables);
            setComboSelected(comboSelected);
        }
    }

    function onPatientSelected(idPatient: number) {
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if (findPatient) {
            setPatient(findPatient);
        }
        console.log(findPatient);
    }

    function renderPatient(){
        if(!patient){
            return <FindPatient patients={props.patients}
                        personalFields={props.personalFields}
                        codeLanguage={props.languageCode}
                        onPatientSelected={(idPatient) => onPatientSelected(idPatient)} />
        }
        else{
            return <PatientInfo patient={patient} languageCode={props.languageCode} rightSide={
                            <Grid container item xs={6} style={{ display:'flex', paddingTop: '1rem' }} >
                                <Autocomplete
                                    disabled={loadingBillables}
                                    value={comboSelected}
                                    options={billableCombos}
                                    onInputChange={(event, value, reason) => {
                                        console.log("onInputChange",value);
                                    }}
                                    onChange={(event, newValue) => {
                                        console.log("onchange", newValue);
                                        selectCombo(newValue);
                                        }
                                    }
                                    getOptionLabel={(option) => {
                                        return option.name;
                                    }}
                                    style={{ width: 300 }}
                                    renderInput={(params:any) => 
                                        <TextField {...params} label="Select combo" error={false}
                                            helperText={null} color="secondary"
                                            //onChange={(event) => changeField(event.target.value, BillItemKeys.concept)}
                                            variant="outlined" />
                                        }
                                />
                                {
                                    comboSelected &&
                                    <ButtonAdd style={{marginTop:'0.5rem'}} onClick={() => addBillablesCombo()} />
                                }
                            </Grid>
                    } />
        }
    }
    return (
        <>
            {
                renderPatient()
            }
            
            <BillForm patient={patient!} canUpdateBill={true} currency={props.currency} idBillingInfo={props.idBillingInfo}
                withDiscount={props.withDiscount} uuidInvestigation={props.uuidInvestigation} bill={null} 
                print={false}
                onBillSuccesfullyCreated={props.onBillSuccesfullyCreated} onCancelBill={props.onCancelBill}
                />
        </>
    );
};

export default BillCreate;
