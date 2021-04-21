import React, { useState } from 'react'
import ICTSelectorOMS from './ICTSelectorOMS';
import { ButtonDelete, ButtonPlus } from '../mini_components';
import { Grid, Typography } from '@material-ui/core';
import { useSelectSmartField, useUpdateEffect } from '../../../hooks';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { ICTSelectorFR } from './ICTSelectorFR';
import { EnhancedTable } from '../EnhancedTable';

export interface Diagnosis{
    ict : string,
    "ict-code": string
}
interface Props extends LocalizeContextProps {
    name : string,
    label : string,
    typeMargin : string,
    slaves : object[],
    errorState: boolean,
    initialState:{
        addingDiagnosis:boolean,
        listDiagnosis:Diagnosis[]
    },
    diagnosesSelected: (treatments:Diagnosis[] | boolean) => void
}


const MultipleICTSelector:React.FC<Props> = (props) => {
    
    const [listDiagnosis, setListDiagnosis] = useState<Diagnosis[]>(props.initialState ? props.initialState.listDiagnosis : []);
    const [addingDiagnosis, setAddingDiagnosis] = useState(true);
    const [addDiagnosis, renderSelect, resetState ] = useSelectSmartField(props.initialState, props.label, props.errorState, setAddingDiagnosis);

    function cancel(){
        if(listDiagnosis.length === 0){
            resetState();
        }
        else{
            setAddingDiagnosis(false);
        }
    }
    function renderDiagnosis(){
        if(listDiagnosis.length > 0 && !addingDiagnosis){
            const headCells = [{ id: "name", alignment: "left", label: <Translate id="hospital.diagnostic" /> }]
            const rows = listDiagnosis.map((diag, index) => {

                return {
                    id : index,
                    name : diag.ict
                }
            })
            
            return <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                actions={{"delete" : (index:number) => removeDiagnosis(index)}}
            />
            
        }
    }
    function removeDiagnosis(id:number){
        setListDiagnosis(listDiagnosis.filter((item, index) => index !== id));
    }
    function diagnosisSelected(diagnose:Diagnosis){
        console.log(diagnose);
        setListDiagnosis(oldArray => [...oldArray, diagnose]);
        setAddingDiagnosis(false);
    }
    function addDiagnose(){
        setAddingDiagnosis(true);
    }
    function renderSelector(){
        if(addingDiagnosis){
            if(["ean", "es", "ar"].indexOf(props.activeLanguage.code) !== -1 ){
                return <ICTSelectorOMS label={props.label}  variant="outlined" margin={props.typeMargin} 
                    cancel={cancel} language={props.activeLanguage.code}
                    size="small" diagnosisSelected={(diag:Diagnosis) => diagnosisSelected(diag)} />
            }
            else{
                return <ICTSelectorFR label={props.label} variant="outlined" margin={props.typeMargin} 
                    cancel={cancel}
                    size="small" diagnosisSelected={(diag:Diagnosis) => diagnosisSelected(diag)} />
            }
        }
            
        
    }
    useUpdateEffect(() =>{
        if(props.initialState && props.initialState.listDiagnosis.length >0 ){
            setListDiagnosis(props.initialState.listDiagnosis);
            setAddingDiagnosis(false);
        }
        
    }, [props.initialState]);
    
    useUpdateEffect(() =>{
        props.diagnosesSelected(listDiagnosis);
        if(listDiagnosis.length === 0){
            resetState()
        }
    }, [listDiagnosis]);
    useUpdateEffect(() =>{
        if(!addDiagnosis){
            props.diagnosesSelected(false);
        }
    }, [addDiagnosis]);
    if(!addDiagnosis && listDiagnosis.length === 0){
        return renderSelect();
    }
    return (
        <React.Fragment>
            {
                (!addingDiagnosis) &&
                <React.Fragment>
                    <ButtonPlus onClick={addDiagnose} />
                    <Typography variant="body2" component="span"><Translate id="hospital.add-diagnosis" /></Typography>
                </React.Fragment>
            }
            {
                renderSelector()
            }
            
            {
                renderDiagnosis()
            }
        </React.Fragment>
    )
}
export default withLocalize(MultipleICTSelector);