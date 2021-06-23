import React, { useState } from 'react'
import ICTSelectorOMS from './ICT/ICTSelectorOMS';
import { ButtonDelete, ButtonPlus } from '../mini_components';
import { Grid, PropTypes, Typography } from '@material-ui/core';
import { useSelectSmartField, useUpdateEffect } from '../../../hooks';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../EnhancedTable';
import ICTSelectorGeneral from './ICT';
import Background from './Background';
import Allergy from './Allergy';
import FamilyBackground from './FamilyBackground';
import SingleTreatmentSelector from './SingleTreatmentSelector';


export interface PropsSmartField {
    variant:"standard" | "filled" | "outlined" | undefined,
    size:string,
    language:string,
    typeMargin:PropTypes.Margin | undefined,
    type:string,
    slaves?:object[],
    cancel: boolean | (() => void),
    elementSelected: (element:SmartFieldType) => void,
    error:boolean,
}
export interface PropsSmartFieldLocalized extends PropsSmartField, LocalizeContextProps{

}
export interface PropsIct extends PropsSmartField{
    
    diagnose:SmartFieldType | null,
    setError:(error:boolean) => void,
}

export interface DrugType{
    name:string,
    code:string
}
export interface AllergyType{
    allergy : string,
    "allergy-code" : string
}


export interface BackgroundType{
    background : string,
    "background-code" : string,
    "background-date" : string
}

export interface FamilyBackgroundType{
    "family-background" : string,
    "family-background-code" : string,
    "family-background-relation" ?: string
}

export type SmartFieldType = Diagnosis | BackgroundType | FamilyBackgroundType | AllergyType;

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
    error: boolean,
    mode : string,
    language?:string,
    initialState:{
        addingElements:boolean,
        listElements:Diagnosis[]
    },
    elementSelected: (treatments:SmartFieldType[] | boolean) => void
}

const TRANSLATED_COLUMNS = ["treatment-posology"]

const SmartField:React.FC<Props> = (props) => {
    const [listElements, setListElements] = useState<SmartFieldType[]>(props.initialState ? props.initialState.listElements : []);
    const [addingElements, setAddingElements] = useState(props.mode === "form");
    const [addElement, renderSelect, resetState ] = useSelectSmartField(props.initialState, props.label, props.error, setAddingElements);

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
            const headCells = [];//[{ id: "name", alignment: "left", label: <Translate id={`hospital.${props.type}-plural`} /> }]
            
            const keys = Object.keys(listElements[0]);
            for(let i = 0; i < keys.length;i++){
                if(!keys[i].includes("code")){
                    headCells.push({ id: keys[i], alignment: "left", label: <Translate id={`hospital.${keys[i]}-table`} /> }) 
                }
            }
            const rows = listElements.map((element, index) => {
                let valueDict:any = {...element};
                for(const [key, val] of Object.entries(element)) {
                    if(val && typeof val.getMonth === 'function'){
                        valueDict[key] = val.toLocaleDateString();
                    }   
                    else if(TRANSLATED_COLUMNS.includes(key)){
                        const translation = props.translate(`hospital.${key}-values.${val}`).toString();
                        valueDict[key] = translation.includes('Missing translationId:') ? val : translation;
                    } 
                    else{
                        valueDict[key] = val;
                    }
                }
                valueDict.id = index;
                    
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
            const propsSmartField:PropsSmartField = {type:props.type, variant:"outlined", typeMargin:props.typeMargin, 
                cancel:cancel, language:props.language ? props.language : props.activeLanguage.code, error:props.error, slaves:props.slaves,
                size:"small", elementSelected:(diag:SmartFieldType) => elementSelected(diag)}
                
            if(props.type === "background"){
                return <Background {...propsSmartField} />
            }
            if(props.type === "family-background"){
                return <FamilyBackground {...propsSmartField} />
            }
            if(props.type === "allergy"){
                return <Allergy {...propsSmartField}/>
            }
            else if(props.type === "ict"){
                return <ICTSelectorGeneral {...propsSmartField} />
            }
            else if(props.type === "treatment"){
                return <SingleTreatmentSelector {...propsSmartField} />
            }
            // return <BackgroundSelector type={props.type} variant="outlined" typeMargin={props.typeMargin} 
            //         cancel={cancel} size="small" error={props.errorState} language={props.activeLanguage.code} 
            //         elementSelected={(diag:Smartfield) => elementSelected(diag)} />
        }
    }
    useUpdateEffect(() =>{
        if(props.initialState && props.initialState.listElements.length >0 ){
            setListElements(props.initialState.listElements);
            setAddingElements(false);
        }
        
    }, [props.initialState]);
    
    useUpdateEffect(() =>{
        if(props.mode === "form"){
            props.elementSelected(listElements);
            if(listElements.length === 0){
                resetState()
            }
        }
        
    }, [listElements]);
    useUpdateEffect(() =>{
        if(!addElement){
            props.elementSelected(false);
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