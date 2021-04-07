import React, { useState } from 'react';
import SingleTreatmentSelector from './SingleTreatmentSelector';
import { ButtonAdd } from '../mini_components';
import { Translate } from 'react-localize-redux';
import { Typography } from '@material-ui/core';
import { EnhancedTable } from '../EnhancedTable';

interface Props{
    name : string,
    label : string,
    typeMargin : string,
    slaves : object[],
    errorState: boolean,
    drugSelected: (drugSel:string) => void
}

export const MultipleTreatmentSelector:React.FC<Props> = (props) => {
    const [listTreatment, setListTreatment] = useState<object[]>([]);
    const [isAddingDrug, setIsAddingDrug] = useState<boolean>(false);

    function drugSelected(treatment:object){
        console.log(treatment);
        setListTreatment(oldArray => [...oldArray, treatment]);
        setIsAddingDrug(false);
    }
    if(!isAddingDrug){
        // listTreatment
        // const tableTreatments = <EnhancedTable titleTable={<Translate id="investigation.create.summary.patients" />} rows={rows} headCells={headCells} 
        // selectRow={index => props.showPatientCallBack(index)}
        // />
        return(
            <div style={{display:'flex'}}>
                <ButtonAdd onClick={() =>{setIsAddingDrug(true)}} />
                <Typography variant="body2" gutterBottom>
                    <Translate id="hospital.add-drug" />
                </Typography>
            </div>
        );
    }
    return (
        <div>
            <SingleTreatmentSelector name={props.name} label={props.label} slaves={props.slaves}
                typeMargin={props.typeMargin} drugSelected={(drug:object) => drugSelected(drug)} />
        </div>
    )
}
