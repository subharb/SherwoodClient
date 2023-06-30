import React, { Component, PureComponent } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { ButtonAdd, ButtonCheck, ButtonContinue, ButtonDelete, ButtonEmptyCheck, DeleteHolder, RedFormHelperText } from '../general/mini_components';
import { Select, InputLabel, MenuItem, TextField, 
        FormControlLabel, Checkbox, ButtonGroup, IconButton, 
        Icon, Box, FormControl as MuiFormControl, Typography, FormHelperText, FormLabel, RadioGroup, Radio, Grid, Divider } from '@mui/material';
import { spacing } from "@mui/system";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'date-fns';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@mui/material';
import { change, registerField } from "redux-form";
import SmartField from './SmartFields';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import File from './File';
import { FieldWrapper } from './mini_components';
import { Field, FieldArray } from 'redux-form'
import FileBase64 from './FileBase64';
import DrugSelector from './SmartFields/DrugSelector';
import { formatDateByLocale } from '../../utils/index.jsx';
import AppointmentField from './SmartFields/AppointmentField';
import Multioption from './Multioption';
import dayjs from 'dayjs';

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
    min-width: 148px!important;
    xmargin-top:1rem!important;
`;
export const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 200px;

    ${props => props.error && css`
        border:1px solid red;
    `
    }
  }
  .ql-editor p{
      font-size:18px;
  }
  .ql-editor ul, .ql-editor ol{
    font-size:18px;
}
`;
const EvaluateContainer = styled.div`
    display:flex;
`;
const EvaluateElement = styled.div`
    display:flex;
    flex-direction:column;
`;
const SpanElement = styled.span`
  text-align:center;
`;
const sharedStyle = css`
    // & label {
    //     position: relative;
    //     padding-right: 25px;
    //     &+div{
    //     margin-top: 0;
    //     &:before {
    //         bottom: 5px;
    //     }
    //     &:after {
    //         bottom: 5px;
    //     }
    //     svg {
    //         top: 0;
    //     }
    //     }
    // }
`



export const TextFieldSherwood = styled(TextField)`
    ${sharedStyle}
`;

class FieldSherwood extends PureComponent{
    constructor(props){
        super(props);
        this.typeMargin = "dense";//dense, none;
        this.state = {options : [], date : new Date(), loading:false}

        this.multiOptionSelected = this.multiOptionSelected.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.resetDiagnose = this.resetDiagnose.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.renderOptionText = this.renderOptionText.bind(this);
        this.imageBase64 = this.imageBase64.bind(this);
    }

    async componentDidMount(){
        if(typeof this.props.optionsUrl !== "undefined"){
            const request = await axios.get(this.props.optionsUrl);
            if(request.status === 200){
                let options = request.data.map(opt => {return {"label" : opt.code, "value":opt.id}});
                this.setState({options : options});
            }
        }
        else if(this.props.options){
            this.setState({options : this.props.options});
        }
    }
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("shouldComponentUpdate");
    //     console.log(`NextProps: ${nextProps.input.value} Props: ${this.props.input.value} Result: ${nextProps.input.value !== this.props.input.value}`);
        
    //     return (nextProps.input.value !== this.props.input.value);
    // }
    handleRadioChange(event){
        const valueRetuned = event.target.value;
        const value = valueRetuned.toLowerCase() === "true" ? true : valueRetuned.toLowerCase() === "false" ? false : valueRetuned; 
    
        this.props.input.onChange(value);
    }
    multiOptionSelected(value){
        let tempValue = [{"multioption" : value}];
        if(this.props.input.value !== ""){
            let index = this.props.input.value.findIndex((option) => option.multioption === value);
            if (index !== -1){
                tempValue = [...this.props.input.value];
                tempValue.splice(index, 1);
            } 
            else{
                tempValue = this.props.input.value.concat(tempValue);
            }
        }
        this.props.input.onChange(tempValue);
        
    }
    autoCompleteChanged(value){
        this.props.input.onChange(value);
        
    }
    drugSelected(drug){
        console.log("Treatment Drug:", drug);
        this.props.input.onChange(drug);
    }
    diagnosesSelected(listDiagnoses){
        this.props.input.onChange(listDiagnoses);
    }
    resetDiagnose(){
        this.props.input.onChange(undefined);
    }
    treatmentSelected(treatments){
        this.props.input.onChange(treatments);
    }
 
    handleDateChange(value){
        this.props.input.onChange(value.toDate());
    }
    selectChange(value){
        console.log("Select Change", value);
        this.props.input.onChange(value);
    }
    imagesSelected(images){
        this.props.input.onChange(images);
    }
    imageBase64(imageBase64){
        this.props.input.onChange(imageBase64);
    }
    renderOptionText(props){
        return <FieldWrapper noWrap = {this.props.fullWidth}>
                    <TextFieldSherwood {...props.input} fullWidth variant="outlined" 
                        margin={this.typeMargin}
                        label={props.label}  size="small" 
                         />
                </FieldWrapper>
    }
    renderOptions(props){
        const {fields} = props;
        let elements = [
            <Grid item xs={12}>
                <ButtonAdd type="button" onClick={() => fields.push("")} />
            </Grid>
            
        ]
        const options = fields.map((member, index) => (
            <Grid item xs={12}>
                <div style={{display:'flex'}}>
                    <Field
                        name={`${member}`}
                        type="text"
                        component={this.renderOptionText}
                        label={`Option ${index + 1}`}
                    />
                    <ButtonDelete onClick={() => fields.remove(index)} />
                </div>
            </Grid>
          ))
        elements = elements.concat(options);
        return <Grid container>
            {elements}
        </Grid>;
    }
    renderExtraField(extraField){
        if(extraField){
            if(extraField.type === "option"){
                return <FieldArray name={`${extraField.name}_options`} key={extraField.name} component={this.renderOptions} />
            }
        }
        else return null;
    }
    render(){
        const {input, color, label, meta, hideTitle, type, options, size, removeClass, template,  validation, activeLanguage, country, activationValues, activatedFields, params, uuidPatient, uuidInvestigation, uuidSurvey} = this.props;
        const sizeCurrent = size ? size : "s12";
        const errorState = (meta.touched && meta.error) ? true : false;
        const errorString = meta.error && errorState ? this.props.translate(meta.error) : "";
        const labelString = label.hasOwnProperty("url") ? <a target="_blank" without rel="noreferrer" href={label.url} >{this.props.translate(label.label)}</a> : this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : this.props.translate(label);
        switch(type){
            case "select":
                let optionsArray = [];
                if(typeof this.props.optionsUrl !== "undefined"){
                    optionsArray = this.state.options.map(anOption => {
                        const optionString = this.props.translate(`countries.${anOption.label}`).indexOf("Missing translationId:") !== -1 ?  anOption.label : this.props.translate(`countries.${anOption.label}`);
                        return <MenuItem value={anOption.value}>{optionString}</MenuItem>
                    })
                }
                else{
                    optionsArray = options.map(option => {
                        const optionText = this.props.translate(option.label).indexOf("Missing translationId:") !== -1 ?  option.label : this.props.translate(option.label);
                    return <MenuItem value={option.value}>{optionText}</MenuItem>
                        
                    })
                }
                let extraField = null;
                if(typeof activationValues !== "undefined" && activationValues.indexOf(input.value) !== -1){
                    extraField = {...activatedFields[input.value]}; 
                }
                
                const labelId = `${input.name}_label`;
                return([
                    <FieldWrapper noWrap = {this.props.fullWidth}>
                        <FormControl  fullWidth variant="outlined"  margin={this.typeMargin} error={errorState} >
                            <InputLabel id={labelId}>{labelString}</InputLabel>
                            <Select
                                {...input} 
                                labelId={labelId}
                                id={input.name}
                                label={labelString}
                                onChange={(event) => this.selectChange(event.target.value)}
                            >
                            { optionsArray }
                            </Select>
                        </FormControl>
                    </FieldWrapper>,
                    this.renderExtraField(extraField)
                ]
                )
            // case "select":
            //     return <SelectField input={input} options={options} labelString={label} activatedFields={activatedFields} 
            //         activationValues={activationValues} onChange={(value) => this.selectChange(value)}/>
            case "drug_selector" : 
                return <DrugSelector error={errorState} freeSolo chemicalComponent={params.chemicalComponent} 
                            drugSelected={(drug) => this.drugSelected(drug)} country={country} />
            case "appointment" : 
                return <AppointmentField uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} value={input.value}
                            label={label} department={this.props.department}
                            appointmentSelected={(date) => this.props.input.onChange(date)} />
            case "multioption" : 
                    return <Multioption mode="input" color={color} value={input.value} options={options} label={labelString} name={input.name} multiOptionSelected={this.multiOptionSelected} />
                    
            case "radio":
                return(
                    <Grid container style={{paddingTop:'0.5rem'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{labelString}</FormLabel>
                            <RadioGroup aria-label={input.name} name={input.name} value={input.value} onChange={this.handleRadioChange}>
                                {
                                    options.map(option => {
                                        const labelString = this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  option.label : this.props.translate(option.label);
                                        return <FormControlLabel value={option.value} control={<Radio />} label={labelString}  />
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                )
                
            case "checkbox":
                console.log("Value checkbox: "+input.name+" "+input.value);
                const classNameError = (meta.touched && meta.error) ? "error text" : "";
                const className = removeClass ?  `col ${sizeCurrent}` : `col ${sizeCurrent}`
                const errorText = errorState ? <RedFormHelperText><Translate id="general.field-required" /></RedFormHelperText> : "";
                return([
                    <FormControlLabel
                        control={<Checkbox checked={input.value} {...input} />}
                        label={labelString}
                    />,
                    errorText
                ]);
            case "date":
                const value = input.value ? dayjs(input.value) : null;
                
                return (
                    <DatePicker value={value} label={labelString}
                        format={formatDateByLocale(activeLanguage.code)}
                        slotProps={{
                            textField: {
                              error: errorState,
                              helperText: errorString,
                            },
                          }}
                        onChange={this.handleDateChange}/>
                        // <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                        //     <KeyboardDatePicker
                        //         disableToolbar
                        //         fullWidth
                        //         inputVariant="outlined"
                        //         variant="inline"
                        //         format={formatDateByLocale(activeLanguage.code)}
                        //         margin="normal"
                        //         id="date-picker-inline"
                        //         label={labelString}
                        //         openTo="year"
                        //         value={value}
                        //         onChange={this.handleDateChange}
                        //         KeyboardButtonProps={{
                        //             'aria-label': 'change date',
                        //         }}
                        //         error={errorState} 
                        //         helperText={errorString} 
                        //         />
                        // </MuiPickersUtilsProvider>
                    
                )
            case "time":
                return (
                    <FieldWrapper noWrap = {this.props.fullWidth}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin={this.typeMargin}
                                size="small"
                                inputVariant="outlined"
                                id={input.name}
                                label={labelString}
                                value={input.value === "" ? new Date() : input.value}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                error={errorState} 
                                helperText={errorString}
                            />
                        </MuiPickersUtilsProvider>
                    </FieldWrapper>
                )
            case "evaluation":
                let arrayButtons = [];
                for(let i= options[0].value;i <=options[1].value; i++){
                    let Icon = PanoramaFishEyeIcon;
                    if(input.value ===  i){
                        Icon = FiberManualRecordIcon;
                    }
                    arrayButtons.push(
                        <EvaluateElement>
                            <Icon onClick={()=>this.props.input.onChange(i)}></Icon>
                            <SpanElement><Typography variant="body2" gutterBottom>{i}</Typography></SpanElement>
                        </EvaluateElement>
                    )
                }
                return (
                    <Grid container style={{paddingTop:'0.5rem'}}>
                        <Grid item xs={12}>
                            <InputLabel color={color} id={input.name}>{labelString}</InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <EvaluateContainer>
                                {arrayButtons}
                            </EvaluateContainer>
                        </Grid>
                    </Grid>
                    );
                
            case "hidden":
                return(
                    <input data-testid={input.name} key={input.name} value={input.value} type="hidden" {...input} />
                );
            case "textarea":
                return(
                    <Box mt={3} mb={3} >
                        {
                            !hideTitle &&
                            <Typography variant="body2" gutterBottom>
                                {labelString}: 
                            </Typography>
                        }
                        
                        <QuillWrapper className={input.name} error={errorState}>
                            <ReactQuill style={{fontSize:'24px'}}
                                {...input}
                                onChange={(newValue, delta, source) => {
                                    if (source === 'user') {
                                    input.onChange(newValue);
                                    }
                                }}
                                onBlur={(range, source, quill) => {
                                    input.onBlur(quill.getHTML());
                                }}
                            />
                        </QuillWrapper>
                    </Box>
                )
            case "password":
                return(
                    <Box mt={1}>
                        <TextFieldSherwood {...input}  type="password" variant="outlined"
                            label={labelString} error={errorState} color={color}
                            helperText={errorString} />
                    </Box>
                )  
            case "autocomplete":
                return(
                    <Autocomplete
                        color={color}
                        id={input.name}
                        options={this.state.options}
                        freeSolo
                        onInputChange={(event, newValue) => {
                            this.autoCompleteChanged(newValue);
                          }}
                        getOptionLabel={(option) => option.label}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label={labelString} variant="outlined" />}
                    />
                );
            case "file" : 
                return (
                    <File label={labelString} mode="form"
                        imagesSelected = {(images) => this.imagesSelected(images) }
                        type={type} {...input} color={color}
                        value={input.value} />
                )
            case "file_base64" : 
                return (
                    <FileBase64  color={color} label={labelString} error={errorState} value={input.value} callBackBase64={this.imageBase64} />
                )
            case "edd":
            case "bmi":    
            case "allergy":
            case "family-background":
            case "background":
            case "ict" : 
            case "treatment" : 
            case "treatment_regular" : 
            case "request_lab" : 
            case "request_img" : 
            case "medical_history_ai":
            case "medical_history_template":
            case "medical_history_template_fill":
                return(
                    <SmartField mode="form" formValues={this.props.formValues} label={labelString} type={type}{...input} initialState={Array.isArray(input.value)  ? {listElements: input.value} : null} 
                        variant="outlined" margin={this.typeMargin} error={errorState} country={country} template={template}
                        uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} uuidSurvey={uuidSurvey} color={color}
                        helperText={errorString} resetDiagnose={this.resetDiagnose} typeMargin={this.typeMargin} 
                        size="small" slaves={this.props.slaves} elementSelected={(listDiagnoses) => this.diagnosesSelected(listDiagnoses)} />
                    
                );
            case "title_section":
                return(
                    <Typography variant="subtitle1" color="textPrimary" style={{ fontWeight: 600 }}>
                        { labelString }
                    </Typography>);
            case "text_blob":
                return(
                    <Typography variant="body2" color="textPrimary" >
                        { labelString }
                    </Typography>);
            case "separator":
                return(
                    <Divider />
                );
            default:    
                console.log("TextFieldSherwood",input.value);
                return(
                    <FieldWrapper noWrap = {this.props.fullWidth}>
                        <TextFieldSherwood {...input} fullWidth variant="outlined" margin={this.typeMargin}
                            label={labelString} error={errorState} size="small" color={color}
                            helperText={errorString} />
                    </FieldWrapper>
                )
        }
    }
}

FieldSherwood.propTypes = {
    input : PropTypes.object.isRequired,
    label : PropTypes.string.isRequired,
    meta : PropTypes.object.isRequired,
    type : PropTypes.string.isRequired,
    disabled : PropTypes.bool,
    options : PropTypes.array,
    defaultOption : PropTypes.object,
    size : PropTypes.string,
    option : PropTypes.object,
    removeClass : PropTypes.string
}
export default withLocalize(FieldSherwood);
