import { TextField } from "@material-ui/core";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";
import { formatPatients } from "../../../utils";


interface Props{
    patients:IPatient[],
    personalFields:[],
    codeLanguage:string,
    onPatientSelected:(idPatient:number) => void,
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
                                    { id: "birthdate", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.birthdate`} /> },
                                    { id: "dateCreated", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.dateCreated`} /> }]
                const rows = formatPatients(filteredPatients, props.personalFields, props.codeLanguage)
                return(
                    <EnhancedTable  noSelectable noFooter rows={rows} headCells={headCells} selectRow={(idPatient:number)=> props.onPatientSelected(idPatient)} />
                )
            }
        }
        
    }
    return(
        <React.Fragment>
            <TextField label="Search Patient" onChange={(event) => onChange(event) } />
            {
                renderResults()
            }
        </React.Fragment>
    )
}
