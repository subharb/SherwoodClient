import React, { Component, PureComponent, useEffect, useState } from 'react'
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

function FieldSherwood(props) {
    const [optionsRemote, setOptionsRemote] = useState([]);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const typeMargin = "dense";//dense, none;
    const {input, label, meta, type, options, size, removeClass, validation, country} = props;
        const sizeCurrent = size ? size : "s12";
        const errorState = (meta.touched && meta.error) ? true : false;
        const errorString = meta.error && errorState ? props.translate(meta.error) : "";
        const labelString = label.hasOwnProperty("url") ? <a target="_blank" without rel="noreferrer" href={label.url} >{props.translate(label.label)}</a> : props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : props.translate(label);
    function handleRadioChange(event){
        console.log(event);
        props.input.onChange(event.target.value);
    }
    function multiOptionSelected(value){
        let tempValue = [value];
        if(props.input.value !== ""){
            let index = props.input.value.indexOf(value);
            if (index !== -1){
                tempValue = [...props.input.value];
                tempValue.splice(index, 1);
            } 
            else{
                tempValue = props.input.value.concat([value]);
            }
        }
        props.input.onChange(tempValue);
        
    }
    function autoCompleteChanged(value){
        console.log("Este es el value "+value);
        if(value.length > 4){
            setLoading(true);
        }
        
    }
    function diagnosesSelected(listDiagnoses){
        props.input.onChange(listDiagnoses);
    }
    function resetDiagnose(){
        props.input.onChange(undefined);
    }
    function treatmentSelected(treatments){
        props.input.onChange(treatments);
    }
    function handleDateChange(value){
        props.input.onChange(value);
    }
    function selectChange(value){
        props.input.onChange(value);
    }
    function imagesSelected(images){
        props.input.onChange(images);
    }
    useEffect(() => {
        async function getRemoteOptions(){
            if(typeof props.optionsUrl !== "undefined"){
                const request = await axios.get(props.optionsUrl);
                if(request.status === 200){
                    let options = request.data.map(opt => {return {"label" : opt.code, "value":opt.id}});
                    setOptionsRemote(options);
                }
            }
        }
        getRemoteOptions();
    }, [])
        switch(type){
            case "select":
                let optionsArray = [];
                if(typeof props.optionsUrl !== "undefined"){
                    optionsArray = optionsRemote.map(anOption => {
                        const optionString = props.translate(`countries.${anOption.label}`).indexOf("Missing translationId:") !== -1 ?  anOption.label : props.translate(`countries.${anOption.label}`);
                        return <MenuItem value={anOption.value}>{optionString}</MenuItem>
                    })
                }
                else{
                    optionsArray = options.map(option => {
                        const optionText = props.translate(option.label).indexOf("Missing translationId:") !== -1 ?  option.label : props.translate(option.label);
                    return <MenuItem value={option.value}>{optionText}</MenuItem>
                        
                    })
                }
                const labelId = `${input.name}_label`;
                return(
                    <FormControl mt={3} variant="outlined" margin={typeMargin} style={{width:"235px"}} error={errorState} >
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
            //         activationValues={activationValues} onChange={(value) => selectChange(value)}/>

            case "multioption" : 
                    const optionButtons = options.map(option => {
                        if(input.value.includes(option.value)){
                            return <ButtonCheck onClick={() => multiOptionSelected(option.value)}>{option.text}</ButtonCheck>
                        }
                        return <ButtonEmptyCheck onClick={() => multiOptionSelected(option.value)}>{option.text}</ButtonEmptyCheck>
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
                        <RadioGroup aria-label={input.name} name={input.name} value={input.value} onChange={handleRadioChange}>
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
                            margin={typeMargin}
                            id={input.name}
                            inputVariant="outlined"
                            style={{width: "235px"}}
                            label={input.value ? "" : labelString}
                            //label={labelString}
                            format="dd/MM/yyyy"
                            value={value}
                            defaultValue={value} 
                            openTo="year"
                            onChange={handleDateChange}
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
                            margin={typeMargin}
                            size="small"
                            inputVariant="outlined"
                            id={input.name}
                            label={labelString}
                            value={input.value === "" ? new Date() : input.value}
                            onChange={handleDateChange}
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
                            <Icon onClick={()=>props.input.onChange(i)}></Icon>
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
                        <TextFieldSherwood {...input}  type="password" variant="outlined"
                            label={labelString} error={errorState} 
                            helperText={errorString} />
                    </Box>
                )  
            case "autocomplete":
                return(
                    <Autocomplete
                        id={input.name}
                        options={optionsRemote}
                        onInputChange={(event, newValue) => {
                            autoCompleteChanged(newValue);
                          }}
                        getOptionLabel={(option) => {console.log(option);return option.label}}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label={labelString} variant="outlined" />}
               />
                );
            case "file" : 
                return <File label={labelString} mode="form"
                            imagesSelected = {(images) => imagesSelected(images) }
                            type={type} {...input} 
                            value={input.value} />
            case "allergy":
            case "family-background":
            case "background":
            case "ict" : 
            case "treatment" : 
            case "treatment_regular" : 
                return(
                    <SmartField mode="form" label={labelString} type={type}{...input} initialState={Array.isArray(input.value)  ? {listElements: input.value} : null} 
                        variant="outlined" margin={typeMargin} error={errorState} country={country}
                        helperText={errorString} resetDiagnose={resetDiagnose} typeMargin={typeMargin} 
                        size="small" slaves={props.slaves} elementSelected={(listDiagnoses) => diagnosesSelected(listDiagnoses)} />
                );
            case "separator":
                return(
                    <Typography variant="subtitle1" style={{paddingBottom:'1rem'}}>
                        { labelString }
                    </Typography>);
            default:    
                console.log("TextFieldSherwood",input.value);
                return(
                    <TextFieldSherwood {...input} variant="outlined" margin={typeMargin}
                        label={labelString} error={errorState} size="small"
                        helperText={errorString} />
                )
        }
}

export default withLocalize(FieldSherwood);