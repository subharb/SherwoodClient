import React, { useState } from 'react'
import ICTSelectorOMS from './ICT/ICTSelectorOMS';
import { ButtonDelete, ButtonPlus } from '../mini_components';
import { Grid, PropTypes, Typography } from '@material-ui/core';
import { useSelectSmartField, useUpdateEffect } from '../../../hooks';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../EnhancedTable';
import ICTSelectorGeneral from './ICT';
import Background from './Background';

export interface PropsIctGeneral extends LocalizeContextProps{
    variant:"standard" | "filled" | "outlined" | undefined,
    size:string,
    language:string,
    typeMargin:PropTypes.Margin | undefined,
    type:string,
    cancel: () => void,
    elementSelected: (element:SmartFieldType) => void,
    error:boolean,
}
export interface PropsIct extends PropsIctGeneral{
    
    diagnose:SmartFieldType | null,
    setError:(error:boolean) => void,
}

export interface Allergy{
    allergy : string,
    "allergy-code" : string
}


export interface BackgroundType{
    background : string,
    "background-code" : string,
    "background-date" : string
}

export interface FamilyBackground{
    "family-background" : string,
    "family-background-code" : string,
    "family-background-relation" ?: string
}

export type SmartFieldType = Diagnosis | BackgroundType | FamilyBackground | Allergy;

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
    diagnosesSelected: (treatments:SmartFieldType[] | boolean) => void
}

const SmartField:React.FC<Props> = (props) => {
    const [listElements, setListElements] = useState<SmartFieldType[]>(props.initialState ? props.initialState.listDiagnosis : []);
    const [addingElements, setAddingElements] = useState(props.mode === "form");
    const [addElement, renderSelect, resetState ] = useSelectSmartField(props.initialState, props.label, props.errorState, setAddingElements);

    function cancel(){
        if(listElements.length === 0){
            resetState();
        }
        else{
            setAddingElements(false);
        }
    }
    function renderElements(){
        if(listElements.length > 0 && !addingElements){
            const headCells = [{ id: "name", alignment: "left", label: <Translate id={`hospital.${props.type}-plural`} /> }]
            if(props.type === "background"){
                headCells.push({ id: "date", alignment: "left", label: <Translate id={`general.date`} /> })  
            }
            const rows = listElements.map((element, index) => {
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
                    const back = element as BackgroundType;
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
                        name : backf["family-background"],
                        relation : backf["family-background-relation"],
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
        setListElements(listElements.filter((item, index) => index !== id));
    }
    function elementSelected(diagnose:SmartFieldType){
        console.log(diagnose);
        setListElements(oldArray => [...oldArray, diagnose]);
        setAddingElements(false);
    }
    function addDiagnose(){
        setAddingElements(true);
    }
    function renderSelector(){
        if(addingElements && props.mode === "form"){
            if(props.type === "background"){
                return <Background type={props.type}  variant="outlined" typeMargin={props.typeMargin} 
                cancel={cancel} language={props.activeLanguage.code} error={props.errorState} 
                size="small" elementSelected={(diag:SmartFieldType) => elementSelected(diag)} />
            }
            else if(props.type !== "allergy"){
                return <ICTSelectorGeneral type={props.type}  variant="outlined" typeMargin={props.typeMargin} 
                    cancel={cancel} language={props.activeLanguage.code} error={props.errorState} 
                    size="small" elementSelected={(diag:SmartFieldType) => elementSelected(diag)} />
            }
            
            // return <BackgroundSelector type={props.type} variant="outlined" typeMargin={props.typeMargin} 
            //         cancel={cancel} size="small" error={props.errorState} language={props.activeLanguage.code} 
            //         elementSelected={(diag:Smartfield) => elementSelected(diag)} />
        }
    }
    useUpdateEffect(() =>{
        if(props.initialState && props.initialState.listDiagnosis.length >0 ){
            setListElements(props.initialState.listDiagnosis);
            setAddingElements(false);
        }
        
    }, [props.initialState]);
    
    useUpdateEffect(() =>{
        if(props.mode === "form"){
            props.diagnosesSelected(listElements);
            if(listElements.length === 0){
                resetState()
            }
        }
        
    }, [listElements]);
    useUpdateEffect(() =>{
        if(!addElement){
            props.diagnosesSelected(false);
        }
    }, [addElement]);
    if(!addElement && listElements.length === 0){
        return renderSelect();
    }

    return (
        <React.Fragment>
            {
                (!addingElements && props.mode === "form") &&
                <React.Fragment>
                    <ButtonPlus onClick={addDiagnose} />
                    <Typography variant="body2" component="span">{props.translate(`hospital.add-${props.type}`)}</Typography>
                </React.Fragment>
            }
            {
                renderSelector()
            }
            
            {
                renderElements()
            }
        </React.Fragment>
    )
}
export default withLocalize(SmartField);