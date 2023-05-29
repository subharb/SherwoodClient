import React, { Component, ReactElement } from 'react'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector, InjectedFormProps } from 'redux-form'
import FieldSherwood from './FieldSherwood';
import { validateField } from '../../utils/index.jsx';
import PropTypes from 'prop-types';
import { DeleteHolder, ButtonCancel, ButtonContinue, ButtonAdd } from '../../components/general/mini_components';
import { Grid, GridSize, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { blue } from '@material-ui/core/colors';
import { compose } from 'redux';

 /**
 * Component that renders a form with the values passed by props
 * 
 * @param {Object} fields - Fields to be rendered
 * @param Boolean creating - If we are creating a form
 * 
 */

export interface FieldProps{
    name: string,
    type: string,
    label: string,
    required: boolean,
    validation: string,
    validationField: string,
    validationValue:string,
    defaultValue?: string,
    numberColumnsXs?: number,
    numberColumnsLg?: number,
}

interface FormValues{
    [key: string]: string | boolean
}

interface FormTSProps extends InjectedFormProps<FormValues>, Omit<LocalizeContextProps, 'initialize'> {
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
    callBackForm: (values:FormValues, buttonSubmitted:string | null) => void,
    initialData?: FormValues,
  }

interface FormTSState{
    showOptions: any
}

class FormTS extends Component<FormTSProps, FormTSState> {
    constructor(props:FormTSProps){
        super(props);

        this.renderFields= this.renderFields.bind(this);
        this.sherwoodValidation = this.sherwoodValidation.bind(this)
        
        //Para guardar el estado de los extra fields con opciones, si mostrarlos o no
        this.state = {showOptions:{}}
    }
    sherwoodValidation(value:string, allValues:number, propsForm:any, key:string){
        if(this.props.fields[key]){
            const fieldValueCompare = this.props.fields[key].validationField ? value : this.props.fields[key].validationValue ? this.props.translate(this.props.fields[key].validationValue) : null;
            const valueField = this.props.fields[key].type === "textarea" && typeof value !== "undefined" ? value.replace(/<[^>]+>/g, '') : value;
            const validationFunc = this.props.fields[key].validation ? this.props.fields[key].validation : "notEmpty";
            const validation:any = validateField({  
                                    value : valueField, 
                                    validation:validationFunc, 
                                    required: this.props.fields[key].required
                                },
                                fieldValueCompare);

            return validation.result ? undefined : validation.messageCode;
            
        }
        else{
            return undefined;
        }
    }
    callBackForm(values:FormValues, buttonSubmitted:string | null = null){
        //Filtro los que sean undefined
        let tempValues:FormValues = {}
        Object.keys(values).forEach(key => {
            if(typeof values[key] !== "undefined"){
                tempValues[key] = values[key]
            }
        })
        return this.props.callBackForm(tempValues, buttonSubmitted);
    }
    componentDidUpdate(prevProps:FormTSProps){
        console.log("cambian props");
        for(let i = 0; i < Object.keys(this.props.fields).length; i++){
            const key = Object.keys(this.props.fields)[i];
            
            let field = this.props.fields[key];
            
            let prevField = prevProps.fields[key];
            
        }
        
    }
    componentDidMount(){
        //Busco el campo DefaultValue para inicializar el form con esos valores
        let initData:FormValues = {};
        Object.keys(this.props.fields).forEach(key => {
            if(this.props.initialData){
                initData[key] = this.props.initialData[key];
            }
            else{
                if(this.props.fields[key].defaultValue !== undefined){
                    initData[key] = this.props.fields[key].defaultValue as string;
                }
                else if(this.props.fields[key].type === "checkbox"){
                    initData[key] = false;
                }
            }
            
        });
        this.props.initialize(initData);
    }
    showOptions(key:string){
        let tempState = this.state;
        tempState.showOptions[key] = true;
        this.setState(tempState);
    }
    closeOptions(key:string){
        let tempState = this.state;
        tempState.showOptions[key] = false;
        this.setState(tempState);
    }
    
    renderExtraFields(key:string){
        //Un field que habilita la aparición de otro field
       
        // const {input, activationValues, activatedFields} = {...this.props.fields[key]};

        // if(activationValues && activatedFields){
            
            
        //         return (
        //             <div className="container">
        //                 <FieldArray name={`${key}_options`} key={key} component={this.renderOptions} />
        //             </div>
        //         )
            
        // }
    }
    renderFields(){
        
        let fieldsMarkup:ReactElement[] = [];
        let currentSection:ReactElement[] = [];
        let pastInput = [];
        Object.keys(this.props.fields).map((key, index) => {
            if(this.props.fields[key].type !== "options"){
                if(this.props.fields[key].type === "title_section"){
                    if(currentSection.length > 0){
                        fieldsMarkup.push(
                            <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                                {currentSection}
                            </Paper>
                        );
                    }
                    currentSection = [];
                }
                const sizeXS:GridSize = this.props.fields[key].numberColumnsXs ? this.props.fields[key].numberColumnsXs as GridSize : 12;
                const sizeLG:GridSize = this.props.fields[key].numberColumnsLg ? this.props.fields[key].numberColumnsLg as GridSize : 12;
                currentSection.push(
                    <Grid item xs={sizeXS}  lg={sizeLG} 
                        style={{paddingLeft:"0.5rem"}} >
                        <Field
                            name={this.props.fields[key].name ? this.props.fields[key].name : key}
                            type={this.props.fields[key].type}
                            component={FieldSherwood}
                            key={key}
                            uuidSurvey={this.props.uuidSurvey}
                            uuidPatient={this.props.uuidPatient}
                            uuidInvestigation={this.props.uuidInvestigation}
                            hideTitle = { currentSection.length === 1 }
                            fullWidth={this.props.fullWidth}
                            country={this.props.country}
                            label={this.props.fields[key].label}
                            validate={[this.sherwoodValidation]}
                             
                        />
                        {
                            this.renderExtraFields(key)
                        }
                    </Grid>
                    );
                
                
                if(index === Object.keys(this.props.fields).length -1){
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
    render() {
        return(
            <div className="container">
                <form data-testid="form" className="form-group"  >
                    {
                        this.renderFields()
                    }
                    {/* {Object.keys(this.props.fields).map(key => {
                        console.log(this.props.typeValue);
                        if(this.props.fields[key].type !== "options"){
                            return (
                                <div className="row" key={key}>
                                    <Field name={key} {...this.props.fields[key]} country={this.props.country}
                                        type={this.props.fields[key].type} label={this.props.fields[key].label} 
                                        callBackMultiOptionSelected={(name, value) => this.props.change(name, value)}
                                        component={renderField} />
                                    {
                                        this.renderExtraFields(key)
                                    }
                                </div>);
                        }
                    })} */}
                    {
                        this.props.externalError &&
                        <Typography variant="body2" style={{color:"#e53e3e"}}>
                            <Translate id={this.props.externalError} />
                        </Typography> 
                    }
                    <div style={{paddingTop:"1rem"}}>
                        
                        <ButtonContinue type="submit" data-testid={this.props.dataTestid} spaceright={1} onClick={this.props.handleSubmit(values => {this.callBackForm(values, "button1")})}>
                            { this.props.submitText ?  this.props.translate(this.props.submitText) : this.props.translate("investigation.create.save")}
                        </ButtonContinue>
                        {
                        this.props.alterSubmitButton &&
                            <ButtonContinue color={blue[700]} type="submit" data-testid={this.props.dataTestid} spaceright={1} 
                                onClick={this.props.handleSubmit(values => {this.callBackForm(values, "button2")})}>
                                { this.props.translate(this.props.alterSubmitButton) }
                            </ButtonContinue>
                        }
                        
                        {this.props.closeCallBack &&
                            <ButtonCancel data-testid="cancel" onClick={this.props.closeCallBack}>
                                { this.props.cancelText ?  this.props.translate(this.props.cancelText) : this.props.translate("general.cancel")}
                            </ButtonCancel>
                        } 
                    </div>
                </form>
            </div>
            
        ) 
    }
}


// connect(mapStateToProps) is not necessary anymore
const enhance = compose<React.ComponentType>(
    reduxForm<FormValues, LocalizeContextProps>({
      form: 'form',
      // your other reduxForm options here
    }),
    withLocalize
  );
  
  export default enhance(FormTS);

  

//export default withLocalize(Form);