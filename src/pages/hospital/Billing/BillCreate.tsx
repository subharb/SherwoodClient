import React, { useState } from 'react';
import { IPatient, IPersonalData, ReduxStore } from '../../../constants/types';
import { Bill, BillItem, BillableCombo, DocumentStatus, DocumentType } from './types';
import { Language, Translate } from 'react-localize-redux';
import { BillForm } from './BillForm';
import { FindPatient } from './find_patient';
import { useSnackBarState, useStatusDocument } from '../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { pushBillables } from '../../../redux/actions/billingActions';
import PatientInfo from './PatientInfo';
import { Box, Card, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Autocomplete } from "@mui/lab"
import { ButtonAdd } from '../../../components/general/mini_components';

interface BillCreateProps {
    patients:IPatient[],
    personalFields:IPersonalData[],
    currency: string,
    uuidInvestigation: string,
    idBillingInfo:number,
    canCreateBugdet: boolean,
    languageCode: string,
    surveyAdditionalInfo?: any,
    withDiscount: boolean,
    onCreateBill: (bill: Bill) => void,
    onCancelBill: () => void

}

const BillCreate: React.FC<BillCreateProps> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(null);
    const [typeDocument, setTypeDocument] = useState<DocumentType>(props.canCreateBugdet ? DocumentType.SUMMARY : DocumentType.INVOICE);
    
    const {statusDocument, renderStatusDocument} = useStatusDocument(DocumentStatus.DRAFT);
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

    function onCreateBill(billItems: BillItem[]) {
        console.log("onCreateBill BillCreate", billItems);
        const bill: Bill = {} as Bill;
        bill.type = typeDocument;
        bill.status = statusDocument;
        bill.billItems = billItems;
        bill.uuidPatient = patient!.uuid;
        props.onCreateBill(bill);
    }

    function onPatientSelected(idPatient: number) {
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if (findPatient) {
            setPatient(findPatient);
        }
        console.log(findPatient);
    }

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeDocument(Number((event.target as HTMLInputElement).value));
      };
    
    function renderTypeDocument(){
        if(props.canCreateBugdet && patient){
            return (
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label"><Typography variant="body2" component='span' fontWeight='bold' ><Translate id="hospital.billing.bill.type" /></Typography></FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={typeDocument}
                    onChange={handleChangeType}
                  >
                    <FormControlLabel value={DocumentType.SUMMARY} control={<Radio />} label={<Typography variant="body2" component='span' ><Translate id="hospital.billing.bill.types.summary" /></Typography>} />
                    <FormControlLabel value={DocumentType.INVOICE} control={<Radio />} label={<Typography variant="body2" component='span' ><Translate id="hospital.billing.bill.types.invoice" /></Typography>} />
                  </RadioGroup>
                </FormControl>
              );
        }
        else{
            return null;
        }
    }

    function renderOptions(){
        if(patient){
            return (
                <Card style={{margin:'10px'}}>
                    <Box padding={2} > 
                        { renderTypeDocument() }
                        { renderStatusDocument }
                    </Box>
                </Card>
            )
        }
        else{
            return null;
        }
        
    }

    function renderPatient(){
        if(!patient){
            return <FindPatient patients={props.patients}
                        personalFields={props.personalFields}
                        codeLanguage={props.languageCode}
                        onPatientSelected={(idPatient) => onPatientSelected(idPatient)} />
        }
        else{
            return (
                <Card style={{margin:'10px'}}>
                    <Box padding={2} > 
                    <PatientInfo patient={patient} languageCode={props.languageCode} rightSide={
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
                    </Box>
                </Card>
            )
        }
    }
    return (
        <>
            
            {
                renderPatient()
            }
            {
                renderOptions()
            }
            
            <BillForm patient={patient!} canUpdateBill={true} currency={props.currency} idBillingInfo={props.idBillingInfo}
                withDiscount={props.withDiscount} uuidInvestigation={props.uuidInvestigation} bill={null} 
                print={false}
                onBillItemsValidated={onCreateBill} onCancelBill={props.onCancelBill}
                />
        </>
    );
};

export default BillCreate;
