import React, { useState } from 'react'
import ICTSelectorOMS from './ICTSelectorOMS';
import { ButtonDelete, ButtonPlus } from '../mini_components';
import { Grid, PropTypes, Typography } from '@material-ui/core';
import { useSelectSmartField, useUpdateEffect } from '../../../hooks';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import BackgroundSelector from './ICTSelectorFR';
import { EnhancedTable } from '../EnhancedTable';
import { ICTSelectorGeneral } from './ICTSelectorGeneral';

export interface Allergy{
    allergy : string,
    "allergy-code" : string
}


export interface Background{
    background : string,
    "background-code" : string,
    "background-date" : string
}

export interface FamilyBackground{
    "family-background" : string,
    "family-background-code" : string
}



export type Smartfield = Diagnosis | Background | FamilyBackground | Allergy;

export interface Diagnosis{
    ict : string,
    "ict-code": string
}
interface Props extends LocalizeContextProps {
    name : string,
    label : string,
    typeMargin : PropTypes.Margin | undefined,
    slaves : object[],
    type:string,
    errorState: boolean,
    mode : string,
    initialState:{
        addingDiagnosis:boolean,
        listDiagnosis:Diagnosis[]
    },
    diagnosesSelected: (treatments:Smartfield[] | boolean) => void
}


const MultipleICTSelector:React.FC<Props> = (props) => {
    
    const [listDiagnosis, setListDiagnosis] = useState<Smartfield[]>(props.initialState ? props.initialState.listDiagnosis : []);
    const [addingDiagnosis, setAddingDiagnosis] = useState(props.mode === "form");
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
            const headCells = [{ id: "name", alignment: "left", label: <Translate id={`hospital.${props.type}-plural`} /> }]
            if(props.type === "background"){
                headCells.push({ id: "date", alignment: "left", label: <Translate id={`general.date`} /> })  
            }
            const rows = listDiagnosis.map((element, index) => {
                let valueDict = {};
                
                if(props.type === "ict"){
                    const diag = element as Diagnosis;
                    valueDict = {
                        id : index,
                        name : diag["ict"]
                    }
                }
                if(props.type === "allergy"){
                    const allergy = element as Allergy;
                    valueDict = {
                        id : index,
                        name : allergy["allergy"]
                    }
                    
                }
                if(props.type === "background"){
                    const back = element as Background;
                    valueDict = {
                        id : index,
                        name :  back["background"],
                        date : back["background-date"],
                    }
                }
                if(props.type === "family-background"){
                    const backf = element as FamilyBackground;
                    valueDict = {
                        id : index,
                        name :  backf["family-background"]
                    }
                    
                }
                
                return valueDict
            })
            if(props.mode === "form"){
                return <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                    actions={{"delete" : (index:number) => removeDiagnosis(index)}}
                />
            }
            else{
                return <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells}     
                    />
            }
            
            
        }
    }
    function removeDiagnosis(id:number){
        setListDiagnosis(listDiagnosis.filter((item, index) => index !== id));
    }
    function elementSelected(diagnose:Smartfield){
        console.log(diagnose);
        setListDiagnosis(oldArray => [...oldArray, diagnose]);
        setAddingDiagnosis(false);
    }
    function addDiagnose(){
        setAddingDiagnosis(true);
    }
    function renderSelector(){
        if(addingDiagnosis && props.mode === "form"){
            if(props.type !== "allergy"){
                return <ICTSelectorGeneral type={props.type}  variant="outlined" typeMargin={props.typeMargin} 
                    cancel={cancel} language={props.activeLanguage.code} error={props.errorState} 
                    size="small" elementSelected={(diag:Smartfield) => elementSelected(diag)} />
            }
            
            return <BackgroundSelector type={props.type} variant="outlined" typeMargin={props.typeMargin} 
                    cancel={cancel} size="small" error={props.errorState} language={props.activeLanguage.code} 
                    elementSelected={(diag:Smartfield) => elementSelected(diag)} />
        }
    }
    useUpdateEffect(() =>{
        if(props.initialState && props.initialState.listDiagnosis.length >0 ){
            setListDiagnosis(props.initialState.listDiagnosis);
            setAddingDiagnosis(false);
        }
        
    }, [props.initialState]);
    
    useUpdateEffect(() =>{
        if(props.mode === "form"){
            props.diagnosesSelected(listDiagnosis);
            if(listDiagnosis.length === 0){
                resetState()
            }
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
        <Grid container spacing={2}>
            {
                (!addingDiagnosis && props.mode === "form") &&
                <Grid item xs={12}>
                    <ButtonPlus onClick={addDiagnose} />
                    <Typography variant="body2" component="span">{props.translate(`hospital.add-${props.type}`)}</Typography>
                </Grid>
            }
            {
                renderSelector()
            }
            <Grid item xs={12}>
            {
                renderDiagnosis()
            }
            </Grid>
        </Grid>
    )
}
export default withLocalize(MultipleICTSelector);