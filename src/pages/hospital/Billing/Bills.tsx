import { Card, CardContent, Grid } from '@material-ui/core';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { BillActions } from '.';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Loader from '../../../components/Loader';
import { fullDateFromPostgresString } from '../../../utils';
import BillsTable from './BillsTable';
import { FindPatient } from './find_patient';

type BillsProps = {
    loading: boolean;
    bills: any[];
    patients: any[];
    billingInfo: any;
    activeLanguage: any;
    personalFields: any[];
    makeActionBillCallBack: (index:number, action:BillActions) => void;
    patientSelectedCallBack: (idPatient: number) => void;
};

const Bills: React.FC<BillsProps> = ({ loading, bills, patients, billingInfo, personalFields, 
                                                activeLanguage, makeActionBillCallBack, patientSelectedCallBack }) => {
    const [showingBills, setShowingBills] = React.useState(true);

    if(loading){
        return <Loader />
    }
    if(bills.length === 0){
        return <Translate id="hospital.billing.no_bills" />;
    }
    else{
        const rows = bills.map((bill) => {
            const patient = patients.sort((patA, patB) => patB.id - patA.id).find((patient) => patient.id === bill.patientInvestigation.id);
            return {
                "id" : bill.id,
                "patient" : patient?.personalData.name+" "+patient?.personalData.surnames, 
                "total" : Number(bill.total),
                "totalPending" : Number(bill.total) - Number(bill.totalPaid),
                "dateCreation" : fullDateFromPostgresString(activeLanguage.code, bill.createdAt)
            }
        });
        const headCells = [
                { id: "id", alignment: "left", label: "ID" },
                { id: "patient", alignment: "left", label: <Translate id={`hospital.billing.bill.patient`} /> },
                { id: "total", alignment: "left", label: [<Translate id={`hospital.billing.bill.total`} />,"("+billingInfo.currency+")"] },
                { id: "totalPending", alignment: "left", label: [<Translate id={`hospital.billing.bill.total_pending`} />,"("+billingInfo.currency+")"]},
                { id: "dateCreation" , alignment: "right",  label: [<Translate id={`hospital.billing.bill.date`} />] } 
            ]
        
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FindPatient patients={patients}
                        personalFields={personalFields}
                        codeLanguage={activeLanguage.code}
                        onPatientSelected={(idPatient) => patientSelectedCallBack(idPatient)}
                        selectingPatientCallBack={(value) => setShowingBills(!value)} />
                </Grid>
                <Grid item xs={12}>
                {
                    showingBills &&
                    <BillsTable patients={patients} currency={billingInfo.currency} bills={bills} languageCode={activeLanguage.code} 
                        makeActionBillCallBack={makeActionBillCallBack}/>
                }
                
                </Grid>
            </Grid>
        )
        
    }
    
};

export default Bills;