import React, { useEffect, useState } from 'react';
import SingleTreatmentSelector from './SingleTreatmentSelector';
import { ButtonAdd } from '../mini_components';
import { Translate } from 'react-localize-redux';
import { Typography } from '@material-ui/core';
import { EnhancedTable } from '../EnhancedTable';
import { useUpdateEffect } from '../../../hooks';

interface Treatment{
    id?:number,
    drug:{
        name:string,
        cis:string,
        id:number
    }, posology:{label:string, value:string}, startDate:number, endDate:number
}

interface Props{
    name : string,
    label : string,
    typeMargin : string,
    slaves : object[],
    errorState: boolean,
    initialState:{
        isAddingDrug:boolean,
        listTreatments:Treatment[]
    },
    treatmentSelected: (treatments:Treatment[]) => void
}

export const MultipleTreatmentSelector:React.FC<Props> = (props) => {
    const [listTreatments, setListTreatment] = useState<Treatment[]>(props.initialState ? props.initialState.listTreatments : []);
    const [isAddingDrug, setIsAddingDrug] = useState<boolean>(props.initialState ? props.initialState.isAddingDrug : false);

    function treatmentSelected(treatment:Treatment){
        console.log(treatment);
        setListTreatment(oldArray => [...oldArray, treatment]);
        setIsAddingDrug(false);
    }
    function deleteTreatment(id:number){
        setListTreatment(listTreatments.filter((item, index) => index !== id));
    }
    useUpdateEffect(() =>{
        props.treatmentSelected(listTreatments);
    }, [listTreatments]);
    if(!isAddingDrug){
        // listTreatment
        let tableTreatments = null;
        if(listTreatments.length > 0){
            const headCells = [{ id: "name", alignment: "left", label: <Translate id="hospital.treatment-name" /> }, { id: "posology", alignment: "left", label: <Translate id="hospital.posology" /> }, ]
            const rows = listTreatments.map((treat, index) => {

                return {
                    id : index,
                    name : treat.drug.name,
                    posology : treat.posology.value
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
                typeMargin={props.typeMargin} treatmentSelected={(treatment:Treatment) => treatmentSelected(treatment)} />
        </div>
    )
}
