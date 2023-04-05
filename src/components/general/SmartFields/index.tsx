import React, { useState } from 'react'
import ICTSelectorOMS from './ICT/ICTSelectorOMS';
import { ButtonDelete, ButtonPlus } from '../mini_components';
import { Card, CardContent, Grid, PropTypes, Typography } from '@material-ui/core';
import { useSelectSmartField, useUpdateEffect } from '../../../hooks';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../EnhancedTable';
import ICTSelectorGeneral from './ICT';
import Background from './Background';
import Allergy from './Allergy';
import FamilyBackground from './FamilyBackground';
import SingleTreatmentSelector from './SingleTreatmentSelector';
import BMIField from './BMIField';
import EDDField from './EDDField';
import { isInteger } from 'lodash';
import RequestField from './RequestField';
import MedicalHistoryAI from './MedicalHistory';
import { MEDICAL_HISTORY_FIELDS } from '../../../constants';




export interface PropsSmartField {
    variant:"standard" | "filled" | "outlined" | undefined,
    size?:string,
    language:string,
    typeMargin:PropTypes.Margin | undefined,
    type:string,
    slaves?:object[],
    country?:string,
    template? : string,
    cancel?: (() => void),
    updateElement?: (index:number, element:SmartFieldType) => void,
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
    id:string
}
export interface AllergyType{
    allergy : string,
    "compo-code" : string
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

export interface TreatmentType{
    "treatment" : string,
    "drug-code" : string,
    "treatment-posology": string, 
    "treatment-dose": string, 
    "treatment-start" : string, 
    "treatment-finish" : string 
}

export interface TreatmentRegularType{
    "treatment_regular" : string,
    "drug-code" : string,
    "treatment_regular-posology": string
}

export interface BMIType{
    "bmi" : number,
    "bmi_height" : number,
    "bmi_weight": number
}

export interface EDDType{
    "edd" : Date,
    "edd_last_period" : Date
}

export interface RequestLabType{
    "request_lab" : string,
    "request_id" : number
}

export interface RequestImageType{
    "request_img" : string,
    request_id: number
}

export interface MedicalHistoryType{
    medical_history_ai : string,
    "medical_history_ai-send_email"?: boolean
}

export type SmartFieldType = Diagnosis | BackgroundType | FamilyBackgroundType | AllergyType | TreatmentType | TreatmentRegularType | BMIType | EDDType | RequestLabType | RequestImageType | MedicalHistoryType;

export interface Diagnosis{
    ict : string,
    "ict-code": string
}

enum DATE_FIELDS {"background-date", "treatment-start", "treatment-finish"};
const DATE_FIELDS_FORMAT:{[key: string]: any} = {"background-date" : "YYYY", "treatment-start" : "regular", "treatment-finish" : "regular", edd : "regular", edd_last_period:"regular"};

const NO_TABLE_FIELDS = MEDICAL_HISTORY_FIELDS;
const SINGLE_SMARTFIELDS = ["bmi", "edd", ...MEDICAL_HISTORY_FIELDS];
export const INITIAL_SELECT = ["ict", "background", "treatment", "treatment_regular", "family-background", "allergy"];

interface Props extends LocalizeContextProps {
    name : string,
    label : string,
    typeMargin : PropTypes.Margin | undefined,
    slaves : object[],
    type:string,
    error: boolean,
    mode : string,
    country:string,
    language?:string,
    uuidPatient?:string,
    template? : string,
    formValues?:any,
    uuidSurvey?:string,
    uuidInvestigation?:string,
    initialState:{
        addingElements:boolean,
        listElements:Diagnosis[]
    },
    updateElement?: (index:number, element:SmartFieldType) => void,
    elementSelected: (treatments:SmartFieldType[] | boolean) => void
}

const TRANSLATED_COLUMNS = ["treatment-posology", "treatment-frecuency"]

const SmartField:React.FC<Props> = (props) => {
    const [listElements, setListElements] = useState<SmartFieldType[]>(props.initialState ? props.initialState.listElements : []);
    const [addingElements, setAddingElements] = useState(props.mode === "form");
    const [addElement, renderSelect, resetState ] = useSelectSmartField(props.initialState, props.label, props.type, props.error, setAddingElements);

    function cancel(){
        if(listElements.length === 0){
            resetState();
        }
        else{
            setAddingElements(false);
        }
    }
    function renderElements(){
        if(listElements.length > 0 && !addingElements && ! NO_TABLE_FIELDS.includes(props.type)){
            const headCells = [];//[{ id: "name", alignment: "left", label: <Translate id={`hospital.${props.type}-plural`} /> }]
            
            const keys = Object.keys(listElements[0]);
            for(let i = 0; i < keys.length;i++){
                //Para no incluir attributos de los smarfield en la tabla
                if(!["code", "id"].some(word => keys[i].includes(word))){
                    headCells.push({ id: keys[i], alignment: "left", label: <Translate id={`hospital.${keys[i]}-table`} /> }) 
                }
            }
            const rows = listElements.map((element, index) => {
                let valueDict:any = {...element};
                for(const [key, val] of Object.entries(element)) {
                    
                    if(val && DATE_FIELDS_FORMAT.hasOwnProperty(key)){
                        let dateObject = null;
                        const format = DATE_FIELDS_FORMAT[key] as string;
                        if(val && typeof val.getMonth === 'function'){
                            dateObject = val;
                        }   
                        else if(val && Date.parse(val)){
                            dateObject =  new Date(val.replace(' ', 'T').replace(' ', 'Z'));
                        }
                        valueDict[key] = format === "regular" ? dateObject.toLocaleDateString() : dateObject.getFullYear();
                    }
                    else if( val && TRANSLATED_COLUMNS.includes(key)){
                        const translation = props.translate(`hospital.${key}-values.${val}`).toString();
                        valueDict[key] = translation.includes('Missing translationId:') ? val : translation;
                    } 
                    
                    else{
                        if(isNaN(val) || isInteger(val)){
                            valueDict[key] = val;
                        }
                        else{
                            valueDict[key] = parseFloat(val).toFixed(2);
                        }
                    }
                }
                valueDict.id = index;
                    
                return valueDict
            })
            if(props.mode === "form"){
                return <Grid item xs={12} spacing={3}>
                        <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                            actions={[{"type" : "delete", "func" : (index:number) => removeElement(index)}]}
                            />
                    </Grid>
                    
            }
            else{
                return (
                    <Grid item xs={12}>
                        <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} />
                    </Grid>
                )
            }   
        }
    }

    function removeElement(id:number){
        setListElements(listElements.filter((item, index) => index !== id));
    }

    function updateElement(id:number, element:SmartFieldType){
        if(listElements.length > 0){
            setListElements(listElements.map((item, index) => index === id ? element : item));
        }
        else{
            setListElements([element]);
        }
    }

    function elementSelected(diagnose:SmartFieldType){
        console.log(diagnose);
        setListElements(oldArray => [...oldArray, diagnose]);
        setAddingElements(false);
    }
   
    function renderSelector(){
        if((addingElements && props.mode === "form") || NO_TABLE_FIELDS.includes(props.type)){
            const propsSmartField:PropsSmartField = {type:props.type, variant:"outlined", typeMargin:props.typeMargin, 
                template : props.template,
                cancel, language:props.language ? props.language : props.activeLanguage.code, country:props.country, error:props.error, slaves:props.slaves,
                size:"small", updateElement:(index:number, smartF:SmartFieldType) => updateElement(index, smartF) ,elementSelected:(smartF:SmartFieldType) => elementSelected(smartF)}
            
            let smartField = null;
            switch(props.type){
                case "background":
                    smartField = <Background {...propsSmartField} />
                    break;
                case "family-background":
                    smartField = <FamilyBackground {...propsSmartField} />        
                    break;
                case "allergy":
                    smartField = <Allergy {...propsSmartField}/>
                    break;
                case "ict": 
                    smartField = <ICTSelectorGeneral {...propsSmartField} />    
                    break;
                case "treatment":
                    smartField = <SingleTreatmentSelector {...propsSmartField} />
                    break;
                case "treatment_regular":
                    smartField = <SingleTreatmentSelector {...propsSmartField} />
                    break;
                case "bmi":
                    smartField = <BMIField {...propsSmartField} />
                    break;
                case "medical_history_ai":
                case "medical_history_template":
                case "medical_history_template_fill":
                    smartField = <MedicalHistoryAI {...propsSmartField} listElements={listElements} uuidInvestigation={props.uuidInvestigation as string} formValues={props.formValues} />
                    break;
                case "edd":
                    smartField = <EDDField {...propsSmartField} />
                    break;
                case "request_lab":
                case "request_img":
                    if(props.uuidPatient && props.uuidInvestigation && props.uuidSurvey){
                        const serviceType = props.type === "request_lab" ? 0 : 1;
                        smartField = <RequestField cancel={cancel} serviceType={serviceType} uuidInvestigation={props.uuidInvestigation} 
                                        uuidSurvey={props.uuidSurvey}
                                        uuidPatient={props.uuidPatient} {...propsSmartField} />
                    }
                    else{
                        smartField = <div>Missing uuidPatient</div>
                    }
                    break;
                
                default:
                    smartField = "Smarfield not defined"
            }
            return(
                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    <Typography color="textSecondary" gutterBottom>
                        <Translate id={`hospital.${props.type}`} />
                    </Typography>
                    { smartField }
                </Grid>
            ) 
        }
    }
    useUpdateEffect(() =>{
        if(props.initialState && props.initialState.listElements.length > 0 ){
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
    
    if((!addElement && listElements.length === 0)){
        return renderSelect();
    }
    else{
        return (
            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    <Card variant="outlined">
                        <CardContent>
                        {
                            (!addingElements && props.mode === "form" && !SINGLE_SMARTFIELDS.includes(props.type)) &&
                            <Grid item xs={12}>
                                <ButtonPlus onClick={() =>  setAddingElements(true)} />
                                <Typography variant="body2" component="span">{props.translate(`hospital.add-${props.type}`)}</Typography>
                            </Grid>
                        }
                        {
                            renderSelector()
                        }
                        
                        {
                            renderElements()
                        }
                        </CardContent>
                </Card>
            </Grid>
        )
    }
    
}
export default withLocalize(SmartField);