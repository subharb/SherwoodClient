import { Card, CardContent, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Translate } from "react-localize-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";
import { formatPatients } from "../../../utils/index.jsx";
import { findPatientsByNameOrSurname } from "../../../db";


interface Props{
    personalFields:any[],
    codeLanguage:string,
    uuidInvestigation:string,
    onPatientSelected:(idPatient:number) => void,
    selectingPatientCallBack?:(value:boolean) => void
}
export const FindPatient:React.FC<Props> = (props) => {
    const [patientName, setPatientName] = useState<string>("");
    const [filteredPatients, setFilteredPatients] = useState<IPatient[]>([]);

    useEffect(() => {
        (async () => {
            if(patientName.length > 2){
                const filteredPatients = (await findPatientsByNameOrSurname(patientName, props.uuidInvestigation)).sort((a,b) => a.dateCreated > b.dateCreated ? -1 : 1);
                setFilteredPatients(filteredPatients);
            }
        })();
    }, [patientName]);
    
    function onChange(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        console.log(event.target.value);
        setPatientName(event.target.value);
        if(props.selectingPatientCallBack){
            props.selectingPatientCallBack(event.target.value.length !== 0);
        }
    }
    
    function renderResults(){
        if(patientName !== "" &&  patientName.length > 2){
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
