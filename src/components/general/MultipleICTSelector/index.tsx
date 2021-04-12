import React, { useState } from 'react'
import ICTSelector from './ICTSelector';
import { ButtonPlus } from '../mini_components';
import { Grid, Typography } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import { useUpdateEffect } from '../../../hooks';

interface Diagnosis{
    name : string,
    code: string
}
interface Props{
    name : string,
    label : string,
    typeMargin : string,
    slaves : object[],
    errorState: boolean,
    initialState:{
        addingDiagnosis:boolean,
        listDiagnosis:Diagnosis[]
    },
    diagnosesSelected: (treatments:Diagnosis[]) => void
}

export const MultipleICTSelector:React.FC<Props> = (props) => {
    const [listDiagnosis, setListDiagnosis] = useState<Diagnosis[]>(props.initialState ? props.initialState.listDiagnosis : []);
    const [addingDiagnosis, setAddingDiagnosis] = useState(true);
    
    function renderDiagnosis(){
        if(listDiagnosis.length > 0 ){
            return(
            <Grid container spacing={3}>
                {
                    listDiagnosis.map(diagnosis => {
                        return(
                            <Grid item xs={12}>
                                <Typography variant="body2" color="textPrimary">
                                    { diagnosis.name }
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
            );
            
        }
    }
    function diagnosisSelected(diagnose:Diagnosis){
        console.log(diagnose);
        setListDiagnosis(oldArray => [...oldArray, diagnose]);
        setAddingDiagnosis(false);
    }
    function addDiagnose(){
        setAddingDiagnosis(true);
    }
    useUpdateEffect(() =>{
        props.diagnosesSelected(listDiagnosis);
    }, [listDiagnosis]);
    return (
        <React.Fragment>
            {
                (listDiagnosis.length > 0 && !addingDiagnosis) &&
                <React.Fragment>
                    <ButtonPlus onClick={addDiagnose} />
                    <Typography variant="body2" color="textPrimary" component="span"><Translate id="hospital.add-diagnosis" /></Typography>
                </React.Fragment>
            }
            {
                addingDiagnosis &&
                <ICTSelector label={props.label}  variant="outlined" margin={props.typeMargin} 
                    size="small" diagnosisSelected={(diag:Diagnosis) => diagnosisSelected(diag)} />
            }
            
            {
                renderDiagnosis()
            }
        </React.Fragment>
    )
}
