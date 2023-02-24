import { Grid, GridSize, Paper, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React, { ReactElement, useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { compose } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { usePrevious } from '../../hooks';
import { validateField } from '../../utils';
import FieldSherwood from './FieldSherwood';
import Form from './form';
import { ButtonCancel, ButtonContinue } from './mini_components';


interface FormTSFuncProps {
    fields: {[key: string]: FieldProps},
    uuidSurvey?: string,
    country?: string,
    fullWidth?: boolean,
    uuidInvestigation?: string,
    uuidPatient?: string,
    externalError?: string,
    dataTestid?: string,
    submitText?: string,
    alterSubmitButton?:string,
    cancelText?: string,
    closeCallBack?: () => void,
    callBackForm?: (values:FormValues, buttonSubmitted:string | null) => void,
    initialData?: FormValues,
}

interface FormTSFuncCoreProps extends FormTSFuncProps, InjectedFormProps<FormValues>, Omit<LocalizeContextProps, 'initialize'> {
    
}

interface FormTSState{
    showOptions: any
}

export interface FieldProps{
    name: string,
    type: string,
    label: string,
    shortLabel?: string,
    required: boolean,
    validation: string,
    encrypted?: boolean,
    params?: any,
    validationField?: string,
    validationValue?:string,
    defaultValue?: string,
    numberColumnsXs?: number,
    numberColumnsLg?: number,
    options?: any[],
}

export interface IForm{
    [key: string]: FieldProps
}

export interface FormValues{
    [key: string]: string | boolean | number | Date | string[] | boolean[] | number[] | undefined | { multioption: string; }[]
}

const FormTSFunc: React.FC<FormTSFuncProps> = (props) => {
    // @ts-ignore: Unreachable code error
    return <Form {...props} />
}

export default FormTSFunc;

const FormTSCore: React.FC<FormTSFuncCoreProps> = (props) => {
    const [state, setState] = React.useState<FormTSState>({showOptions:{}});

    //const prevProps:FormTSFuncCoreProps = usePrevious(props);
    function sherwoodValidation(value:string, allValues:number, propsForm:any, key:string){
        if(props.fields[key]){
            const fieldValueCompare = props.fields[key].validationField ? value : props.fields[key].validationValue ? props.translate(props.fields[key].validationValue ? props.fields[key].validationValue as string : "") : null;
            const valueField = props.fields[key].type === "textarea" && typeof value !== "undefined" ? value.replace(/<[^>]+>/g, '') : value;
            const validationFunc = props.fields[key].validation ? props.fields[key].validation : "notEmpty";
            const validation:any = validateField({  
                                    value : valueField, 
                                    validation:validationFunc, 
                                    required: props.fields[key].required
                                },
                                fieldValueCompare);

            return validation.result ? undefined : validation.messageCode;
            
        }
        else{
            return undefined;
        }
    }
    function callBackForm(values:FormValues, buttonSubmitted:string | null = null){
        if(props.callBackForm){
            //Filtro los que sean undefined
            let tempValues:FormValues = {}
            Object.keys(values).forEach(key => {
                if(typeof values[key] !== "undefined"){
                    tempValues[key] = values[key]
                }
            })
            return props.callBackForm(tempValues, buttonSubmitted);
        }
        
    }
    // useEffect(() => {
    //     console.log("cambian props");
    //     for(let i = 0; i < Object.keys(props.fields).length; i++){
    //         const key = Object.keys(props.fields)[i];
            
    //         let field = props.fields[key];
            
    //         //let prevField = prevProps.fields[key];
            
    //     }
        
    // }, [props]);
    useEffect(() => {
        //Busco el campo DefaultValue para inicializar el form con esos valores
        let initData:FormValues = {};
        Object.keys(props.fields).forEach(key => {
            if(props.initialData){
                initData[key] = props.initialData[key];
            }
            else{
                if(props.fields[key].defaultValue !== undefined){
                    initData[key] = props.fields[key].defaultValue as string;
                }
                else if(props.fields[key].type === "checkbox"){
                    initData[key] = false;
                }
            }
            
        });
        props.initialize(initData);
    }, []);

    function showOptions(key:string){
        let tempState = state;
        tempState.showOptions[key] = true;
        setState(tempState);
    }
    function closeOptions(key:string){
        let tempState = state;
        tempState.showOptions[key] = false;
        setState(tempState);
    }
    
    function renderExtraFields(key:string){
        //Un field que habilita la aparición de otro field
       
        // const {input, activationValues, activatedFields} = {...props.fields[key]};

        // if(activationValues && activatedFields){
            
            
        //         return (
        //             <div className="container">
        //                 <FieldArray name={`${key}_options`} key={key} component={renderOptions} />
        //             </div>
        //         )
            
        // }
    }
    function renderFields(){
        
        let fieldsMarkup:ReactElement[] = [];
        let currentSection:ReactElement[] = [];
        let pastInput = [];
        Object.keys(props.fields).map((key, index) => {
            if(props.fields[key].type !== "options"){
                if(props.fields[key].type === "title_section"){
                    if(currentSection.length > 0){
                        fieldsMarkup.push(
                            <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                                {currentSection}
                            </Paper>
                        );
                    }
                    currentSection = [];
                }
                const sizeXS:GridSize = props.fields[key].numberColumnsXs ? props.fields[key].numberColumnsXs as GridSize : 12;
                const sizeLG:GridSize = props.fields[key].numberColumnsLg ? props.fields[key].numberColumnsLg as GridSize : 12;
                currentSection.push(
                    <Grid item xs={sizeXS}  lg={sizeLG} 
                        style={{paddingLeft:"0.5rem"}} >
                        <Field
                            name={props.fields[key].name ? props.fields[key].name : key}
                            type={props.fields[key].type}
                            // @ts-ignore: Unreachable code error
                            component={FieldSherwood}
                            key={key}
                            uuidSurvey={props.uuidSurvey}
                            uuidPatient={props.uuidPatient}
                            uuidInvestigation={props.uuidInvestigation}
                            hideTitle = { currentSection.length === 1 }
                            fullWidth={props.fullWidth}
                            country={props.country}
                            label={props.fields[key].label}
                            validate={[sherwoodValidation]}
                            options = {props.fields[key].options}
                            //{...props.fields[key]}
                        />
                        {
                            renderExtraFields(key)
                        }
                    </Grid>
                    );
                
                
                if(index === Object.keys(props.fields).length -1){
                    fieldsMarkup.push(
                        <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                            <Grid container>
                            {currentSection}
                            </Grid>
                        </Paper>
                    );
                }
            }
            
        })
        return fieldsMarkup;
    }
    
    return(
        <div className="container">
            <form data-testid="form" className="form-group"  >
                {
                    renderFields()
                }
                {/* {Object.keys(props.fields).map(key => {
                    console.log(props.typeValue);
                    if(props.fields[key].type !== "options"){
                        return (
                            <div className="row" key={key}>
                                <Field name={key} {...props.fields[key]} country={props.country}
                                    type={props.fields[key].type} label={props.fields[key].label} 
                                    callBackMultiOptionSelected={(name, value) => props.change(name, value)}
                                    component={renderField} />
                                {
                                    renderExtraFields(key)
                                }
                            </div>);
                    }
                })} */}
                {
                    props.externalError &&
                    <Typography variant="body2" style={{color:"#e53e3e"}}>
                        <Translate id={props.externalError} />
                    </Typography> 
                }
                <div style={{paddingTop:"1rem"}}>
                    
                    <ButtonContinue type="submit" data-testid={props.dataTestid} spaceright={1} onClick={props.handleSubmit(values => {callBackForm(values, "button1")})}>
                        { props.submitText ?  props.translate(props.submitText) : props.translate("investigation.create.save")}
                    </ButtonContinue>
                    {
                    props.alterSubmitButton &&
                        <ButtonContinue color={blue[700]} type="submit" data-testid={props.dataTestid} spaceright={1} 
                            onClick={props.handleSubmit(values => {callBackForm(values, "button2")})}>
                            { props.translate(props.alterSubmitButton) }
                        </ButtonContinue>
                    }
                    
                    {props.closeCallBack &&
                        <ButtonCancel data-testid="cancel" onClick={props.closeCallBack}>
                            { props.cancelText ?  props.translate(props.cancelText) : props.translate("general.cancel")}
                        </ButtonCancel>
                    } 
                </div>
            </form>
        </div>
        
    ) 
    
};



const enhance = compose<React.ComponentType>(
    reduxForm<FormValues, LocalizeContextProps>({
      form: 'form',
      // your other reduxForm options here
    }),
    withLocalize
);
  
const EnhancedFormTS = React.memo(enhance(FormTSCore));