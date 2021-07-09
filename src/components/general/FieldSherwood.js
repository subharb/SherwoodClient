import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { ButtonCheck, ButtonEmptyCheck } from '../general/mini_components';
import { Select, InputLabel, MenuItem, TextField, 
        FormControlLabel, Checkbox, ButtonGroup, IconButton, 
        Icon, Box, FormControl as MuiFormControl, Typography, FormHelperText, FormLabel, RadioGroup, Radio, Grid } from '@material-ui/core';
import { spacing } from "@material-ui/system";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
    } from '@material-ui/pickers';
import 'date-fns';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';
import { change, registerField } from "redux-form";
import SmartField from './SmartFields';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import File from './File';

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
    min-width: 148px!important;
    xmargin-top:1rem!important;
`;
const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 200px;
    ${props => props.error && css`
        border:1px solid red;
    `
    }
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
const RedFormHelperText = styled(FormHelperText)`
  color:red;
`

export const TextFieldSherwood = styled(TextField)`
    ${sharedStyle}
`;

class FieldSherwood extends Component{
    constructor(props){
        super(props);
        this.typeMargin = "dense";//dense, none;
        this.state = {options : [], date : new Date(), loading:false}

        this.multiOptionSelected = this.multiOptionSelected.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.resetDiagnose = this.resetDiagnose.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    async componentDidMount(){
        if(typeof this.props.optionsUrl !== "undefined"){
            const request = await axios.get(this.props.optionsUrl);
            if(request.status === 200){
                let options = request.data.map(opt => {return {"label" : opt.code, "value":opt.id}});
                this.setState({options : options});
            }
        }

    }
    handleRadioChange(event){
        console.log(event);
        this.props.input.onChange(event.target.value);
    }
    multiOptionSelected(value){
        let tempValue = [value];
        if(this.props.input.value !== ""){
            let index = this.props.input.value.indexOf(value);
            if (index !== -1){
                tempValue = [...this.props.input.value];
                tempValue.splice(index, 1);
            } 
            else{
                tempValue = this.props.input.value.concat([value]);
            }
        }
        this.props.input.onChange(tempValue);
        
    }
    autoCompleteChanged(value){
        console.log("Este es el value "+value);
        if(value.length > 4){
            let tempState = {...this.state};
            tempState.loading = true;
            this.setState(tempState);

        }
        
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
        this.props.input.onChange(value);
    }
    selectChange(value){
        this.props.input.onChange(value);
    }
    imagesSelected(images){
        this.props.input.onChange(images);
    }
    render(){
        const {input, label, meta, type, options, size, removeClass, validation, country} = this.props;
        const sizeCurrent = size ? size : "s12";
        const errorState = (meta.touched && meta.error) ? true : false;
        const errorString = meta.error && errorState ? this.props.translate(meta.error) : "";
        const labelString = label.hasOwnProperty("url") ? <a href={label.url} >{this.props.translate(label.label)}</a> : this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : this.props.translate(label);
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
                const labelId = `${input.name}_label`;
                return(
                    <FormControl mt={3} variant="outlined" margin={this.typeMargin} style={{width:"235px"}} error={errorState} >
                        <InputLabel id={labelId}>{labelString}</InputLabel>
                        <Select
                        labelId={labelId}
                        id={input.name}
                        label={labelString}
                        {...input} 
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                    
                )
            // case "select":
            //     return <SelectField input={input} options={options} labelString={label} activatedFields={activatedFields} 
            //         activationValues={activationValues} onChange={(value) => this.selectChange(value)}/>

            case "multioption" : 
                    const optionButtons = options.map(option => {
                        if(input.value.includes(option.value)){
                            return <ButtonCheck onClick={() => this.multiOptionSelected(option.value)}>{option.text}</ButtonCheck>
                        }
                        return <ButtonEmptyCheck onClick={() => this.multiOptionSelected(option.value)}>{option.text}</ButtonEmptyCheck>
                    });
                    console.log("optionButtons",input.value);
                    return ([
                        <div className="container">
                            <div className="row">
                                <InputLabel id={input.name}>{labelString}</InputLabel>
                            </div>
                            <div className="row">
                                <InputLabel shrink={true}><Translate id="general.choose-options" /></InputLabel>
                            </div>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                {optionButtons}
                            </ButtonGroup>
                        </div>
                    ]);
            case "radio":
                return(
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{labelString}</FormLabel>
                        <RadioGroup aria-label={input.name} name={input.name} value={input.value} onChange={this.handleRadioChange}>
                            {
                                options.map(option => {
                                    return <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                                })
                            }
                        </RadioGroup>
                    </FormControl>
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
                const value = input.value ? input.value : "";
                return (
                    <MuiPickersUtilsProvider key={input.name} utils={DateFnsUtils} id={input.name}>
                        <KeyboardDatePicker
                            disableToolbar
                            margin={this.typeMargin}
                            id={input.name}
                            inputVariant="outlined"
                            style={{width: "235px"}}
                            label={input.value ? "" : labelString}
                            //label={labelString}
                            format="dd/MM/yyyy"
                            value={value}
                            defaultValue={value} 
                            openTo="year"
                            onChange={this.handleDateChange}
                            maxDate={validation === "pastDate" ? new Date() : undefined}
                            emptyLabel={labelString}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            error={errorState} 
                            helperText={errorString} 
                        />
                    </MuiPickersUtilsProvider>
                    
                );
            case "time":
                return (
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
                    <div className="container">
                        <div className="row">
                            <InputLabel id={input.name}>{labelString}</InputLabel>
                        </div>
                        <EvaluateContainer>
                            {arrayButtons}
                        </EvaluateContainer>
                    </div>
                    );
                
            case "hidden":
                return(
                    <input data-testid={input.name} key={input.name} value={input.value} type="hidden" {...input} />
                );
            case "textarea":
                return(
                    <Box mt={3} mb={3} >
                        <Typography variant="body2" gutterBottom>
                            {labelString}: 
                        </Typography>
                        <QuillWrapper className={input.name} error={errorState}>
                            <ReactQuill
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
                        <TextFieldSherwood {...input}  type="password"
                            label={labelString} error={errorState} 
                            helperText={errorString} />
                    </Box>
                )  
            case "autocomplete":
                return(
                    <Autocomplete
                        id={input.name}
                        options={this.state.options}
                        onInputChange={(event, newValue) => {
                            this.autoCompleteChanged(newValue);
                          }}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label={labelString} variant="outlined" />}
               />
                );
            case "file" : 
                return <File label={labelString} mode="form"
                            imagesSelected = {(images) => this.imagesSelected(images) }
                            type={type} {...input} 
                            value={input.value} />
            case "allergy":
            case "family-background":
            case "background":
            case "ict" : 
            case "treatment" : 
                return(
                    <SmartField mode="form" label={labelString} type={type}{...input} initialState={Array.isArray(input.value)  ? {listElements: input.value} : null} 
                        variant="outlined" margin={this.typeMargin} error={errorState} country={country}
                        helperText={errorString} resetDiagnose={this.resetDiagnose} typeMargin={this.typeMargin} 
                        size="small" slaves={this.props.slaves} elementSelected={(listDiagnoses) => this.diagnosesSelected(listDiagnoses)} />
                );
            default:    
                console.log("TextFieldSherwood",input.value);
                return(
                    <TextFieldSherwood {...input} variant="outlined" margin={this.typeMargin}
                        label={labelString} error={errorState} size="small"
                        helperText={errorString} />
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
