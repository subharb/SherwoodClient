import { TextField } from "@material-ui/core";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";


interface Props{
    patients:IPatient[]
}
export const FindPatient:React.FC<Props> = (props) => {
    const [patientName, setPatientName] = useState<null | string>(null);
    function onChange(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        console.log(event.target.value);
        setPatientName(event.target.value);
    }
    function renderResults(){
        if(patientName !== null){
            const filteredPatients:IPatient[] = props.patients.filter((patient) => {
                const currentPatientData = patient.personalData;
                const currentPatientFullName = currentPatientData.name+" "+currentPatientData.surnames;
                return currentPatientFullName.toLocaleLowerCase().includes(patientName.toLocaleLowerCase());
            });
    
            if(filteredPatients.length === 0){
                return "No patients match the criteria"
            }
            else{
                const headCells = [{ id: "name", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.name`} /> },
                                    { id: "surnames", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.surnames`} /> },
                                    { id: "sex", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.sex`} /> },
                                    { id: "age", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.birthdate`} /> },
                                    { id: "dateCreated", alignment: "left", label: <Translate id={`hospital.dateCreated-table`} /> }]
                const rows = filteredPatients.map((patient:any) => {
                    return {name :patient.personalData.name, surnames:patient.personalData.surnames, sex:patient.personalData.sex}
                })
                return(
                    <EnhancedTable rows={rows} headCells={headCells}   />
                )
            }
        }
        
    }
    return(
        <React.Fragment>
            <TextField onChange={(event) => onChange(event) } />
            {
                renderResults()
            }
        </React.Fragment>
    )
}
