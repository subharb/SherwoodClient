import { Card, CardContent, Grid, TextField } from "@mui/material";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";
import { formatPatients } from "../../../utils/index.jsx";


interface Props{
    patients:IPatient[],
    personalFields:any[],
    codeLanguage:string,
    onPatientSelected:(idPatient:number) => void,
    selectingPatientCallBack?:(value:boolean) => void
}
export const FindPatient:React.FC<Props> = (props) => {
    const [patientName, setPatientName] = useState<string>("");
    
    function onChange(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        console.log(event.target.value);
        setPatientName(event.target.value);
        if(props.selectingPatientCallBack){
            props.selectingPatientCallBack(event.target.value.length !== 0);
        }
        
    }
    
    function renderResults(){
        if(patientName !== ""){
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
        
    }
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <TextField label="Search Patient" color="secondary" onChange={(event) => onChange(event) } />
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
