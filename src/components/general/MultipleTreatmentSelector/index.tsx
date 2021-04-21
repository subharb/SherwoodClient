import React, { useEffect, useState } from 'react';
import SingleTreatmentSelector from './SingleTreatmentSelector';
import { ButtonAdd } from '../mini_components';
import { Translate } from 'react-localize-redux';
import { FormControl, InputLabel, Select, Typography, MenuItem } from '@material-ui/core';
import { EnhancedTable } from '../EnhancedTable';
import { useSelectSmartField, useUpdateEffect } from '../../../hooks';

interface Treatment{
    id?:number,
    treatment : string,
    "drug-code": string,
    "treatment-posology": string,
    "treatment-start":Date,
    "treatment-finish":Date
   
}

interface Props{
    name : string,
    label : string,
    typeMargin : string,
    slaves : object[],
    errorState: boolean,
    initialState:{
        isAddingDrug:boolean,
        addTreatment: boolean | null,
        listTreatments:Treatment[]
    },
    treatmentSelected: (treatments:Treatment[] | boolean) => void
}

export const MultipleTreatmentSelector:React.FC<Props> = (props) => {
    const [addTreatment, renderSelect, setAddSmartField ] = useSelectSmartField(props.initialState, props.label, props.errorState);
    const [listTreatments, setListTreatment] = useState<Treatment[]>(props.initialState ? props.initialState.listTreatments : []);
    const [isAddingDrug, setIsAddingDrug] = useState<boolean>(props.initialState ? props.initialState.isAddingDrug : true);

    function treatmentSelected(treatment:Treatment){
        console.log(treatment);
        setListTreatment(oldArray => [...oldArray, treatment]);
        setIsAddingDrug(false);
    }
    function deleteTreatment(id:number){
        setListTreatment(listTreatments.filter((item, index) => index !== id));
    }
    function resetState(){
        setAddSmartField(null);
        setIsAddingDrug(true);
    }
    function cancelTreatment(){
        
        if(listTreatments.length === 0){
            resetState()
        }
        else{
            setIsAddingDrug(false);
        }
    }
    useUpdateEffect(() =>{
        setListTreatment(props.initialState.listTreatments);
    }, [props.initialState]);
    useUpdateEffect(() =>{
        props.treatmentSelected(listTreatments);
        if(listTreatments.length === 0){
            resetState()
        }
    }, [listTreatments]);
    useUpdateEffect(() =>{
        if(!addTreatment){
            props.treatmentSelected(false);
        }
    }, [addTreatment]);

    if(!addTreatment){
        return renderSelect();
        
    }
    else if(!isAddingDrug){
        // listTreatment
        let tableTreatments = null;
        if(listTreatments.length > 0){
            const headCells = [{ id: "name", alignment: "left", label: <Translate id="hospital.treatment-name" /> }, { id: "posology", alignment: "left", label: <Translate id="hospital.posology" /> }, ]
            const rows = listTreatments.map((treat, index) => {

                return {
                    id : index,
                    name : treat.treatment,
                    posology : treat['treatment-posology']
                }
            })
            
            tableTreatments = <EnhancedTable noHeader rows={rows} headCells={headCells} 
                actions={{"delete" : (index:number) => deleteTreatment(index)}}
            />
        }
        
        return(
            <React.Fragment>
                {tableTreatments}
                <div style={{display:'flex',alignItems: "center",justifyContent: "left"}}>
                    <ButtonAdd onClick={() =>{setIsAddingDrug(true)}} />
                    <Typography variant="body2" component="span" >
                        <Translate id="hospital.add-treatment" />
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
    
    return (
        <div>
            <SingleTreatmentSelector name={props.name} label={props.label} slaves={props.slaves}
                cancelTreatment={cancelTreatment}
                typeMargin={props.typeMargin} treatmentSelected={(treatment:Treatment) => treatmentSelected(treatment)} />
        </div>
    )
}
