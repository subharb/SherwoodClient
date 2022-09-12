import { Button, Checkbox, Grid, IconButton, TextField, Typography } from "@material-ui/core"
import { red } from "@material-ui/core/colors"
import React, { ReactElement, useEffect, useRef, useState } from "react"
import { Language, Translate } from "react-localize-redux"
import styled from "styled-components"
import { EnhancedTable } from "../../../components/general/EnhancedTable"
import { ButtonAdd, IconGenerator } from "../../../components/general/mini_components"
import Loader from "../../../components/Loader"
import { IPatient, TYPE_BILL_ITEM } from "../../../constants/types"
import { Bill, Billable, BillItem, BillItemKeys, BillItemTable } from "./types";
import { createBillService, updateBillService } from "../../../services/billing";

import { FindPatient } from "./find_patient";

import { dateToFullDateString, fullDateFromPostgresString } from "../../../utils"
import { Autocomplete, createFilterOptions } from "@material-ui/lab"
import { BillItems } from "./BillItems"

interface Props {
    updatingBill: boolean,
    patients: IPatient[],
    personalFields: [],
    currency: string,
    uuidInvestigation: string,
    bill: Bill | null,
    locale: Language,
    billables?:Billable[],
    print: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onCancelBill: () => void

}


const GridContainer = styled(Grid)`
    flex-direction: column;
    @media (min-width: 768px) {
        min-height:500px;
        min-width:400px;   
    }
`





export const BillForm: React.FC<Props> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(props.bill ? props.bill.patientInvestigation : null);

    function onPatientSelected(idPatient: number) {
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if (findPatient) {
            setPatient(findPatient);
        }
        console.log(findPatient);
    }
    function renderPatient() {
        if (!patient) {
            return <FindPatient patients={props.patients}
                personalFields={props.personalFields}
                codeLanguage={props.locale.code}
                onPatientSelected={(idPatient) => onPatientSelected(idPatient)} />
        }
        else {
            return (
                <Grid container>
                    <Grid item xs={6}  >
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {patient.personalData.name} {patient.personalData.surnames}</Typography>
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(patient.personalData.birthdate, props.locale.code)}</Typography>
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {patient.personalData.sex}</Typography>
                    </Grid>
                    {
                        props.bill &&
                        <Grid item xs={6} style={{ textAlign: 'right' }} >
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.locale.code, props.bill.createdAt)}</Typography>
                        </Grid>
                    }
                </Grid>

            )
        }
    }

    function renderItems(){
        if(patient){
            return <BillItems uuidPatient={patient?.uuid} 
                currency={props.currency} print={props.print}
                locale = {props.locale} bill={props.bill} billables={props.billables}
                updatingBill={props.updatingBill} uuidInvestigation={props.uuidInvestigation}
                onBillSuccesfullyCreated={props.onBillSuccesfullyCreated}
                onCancelBill={props.onCancelBill} />
        } 
    }
    
    return (
        <GridContainer container xs={12} >
            {
                renderPatient()
            }
            {
                renderItems()
            }
        </GridContainer>
    )
}