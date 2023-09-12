import { Card, CardContent, Grid, TextField } from "@mui/material";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";
import { formatPatients } from "../../../utils/index.jsx";
import SearchBox from "../../../components/general/SearchBox";
import { BillStatus } from "../Service/types";
import { green, red } from "@mui/material/colors";



interface Props{
    patients:IPatient[],
    personalFields:any[],
    codeLanguage:string,
    onPatientSelected:(idPatient:number) => void,
    selectingPatientCallBack?:(value:boolean) => void
}

export const statusToColor = (status:BillStatus) => {
    let colour = "#000";
    switch(status){
        case BillStatus.PAID:
            colour = green[900];
            break;
        case BillStatus.PENDING_PAYMENT: 
            colour = red[900];
            break;
    }
    return colour;
}

export const FindPatient:React.FC<Props> = (props) => {
    const [patientName, setPatientName] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<BillStatus[]>([]);
    function callbackNameTyped(name:string){
        setPatientName(name);
        if(props.selectingPatientCallBack){
            props.selectingPatientCallBack(name.length !== 0);
        }
        
    }
    function applyStatusFilter(status:BillStatus){
        if(statusFilter && statusFilter.includes(status)){
            if(statusFilter.length === 1){
                setStatusFilter([]);
            }
            else{
                setStatusFilter(statusFilter.filter((s) => s !== status));
            }
        }
        else if(statusFilter){
            setStatusFilter([...statusFilter, status]);
        }
        else{
            setStatusFilter([status]);
        }
        
    }

    function renderResults(){
        
            const filteredPatients:IPatient[] = props.patients.filter((patient) => {
                const currentPatientData = patient.personalData;
                const currentPatientFullName = currentPatientData.name+" "+currentPatientData.surnames;
                return currentPatientFullName.toLocaleLowerCase().includes(patientName.toLocaleLowerCase());
            }).sort((a,b) => a.dateCreated > b.dateCreated ? -1 : 1);
    
            if(filteredPatients.length === 0){
                return "No patients match the criteria"
            }
            else{
                const hasPhone = props.personalFields.find((pF) => pF.name === "phone");
                let headCells = [{ id: "name", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.name`} /> },
                                    { id: "surnames", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.surnames`} /> },
                                    { id: "sex", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.sex`} /> },
                                    { id: "birthdate", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.birthdate`} /> },
                                    { id: "dateCreated", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.dateCreated`} /> }]
                if(hasPhone){
                    headCells.splice(3, 0, { id: "phone", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.phone`} /> });
                }
                    
                const rows = formatPatients(filteredPatients, props.personalFields, props.codeLanguage)
                return(
                    <EnhancedTable noHeader noSelectable noFooter rows={rows} headCells={headCells} selectRow={(idPatient:number)=> props.onPatientSelected(idPatient)} />
                )
            }
        
        
    }
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <SearchBox textField={{label:"hospital.billing.search_patient", callBack:callbackNameTyped}}
                            activeFilters={statusFilter}
                            filterItems={[
                                {label:"paid", value:BillStatus.PAID, color:statusToColor(BillStatus.PAID), callBack:() => applyStatusFilter(BillStatus.PAID)},
                                {label:"pending_payment", value:BillStatus.PENDING_PAYMENT, color:statusToColor(BillStatus.PENDING_PAYMENT), callBack:() => applyStatusFilter(BillStatus.PENDING_PAYMENT)},
                            ]} />
                        
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
            {
                renderResults()
            }
            </Grid>
        </Grid>
    )
}
