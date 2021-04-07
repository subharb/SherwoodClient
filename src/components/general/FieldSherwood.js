import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { ButtonCheck, ButtonEmptyCheck } from '../general/mini_components';
import { Select, InputLabel, MenuItem, TextField, 
        FormControlLabel, Checkbox, ButtonGroup, IconButton, 
        Icon, Box, FormControl as MuiFormControl, Typography, FormHelperText } from '@material-ui/core';
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

import ICTSelector from './ICTSelector';
import { MultipleTreatmentSelector } from './TreatmentSelector';

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

const TextFieldSherwood = styled(TextField)`
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
    diagnoseSelected(code){
        this.props.input.onChange(code);
    }
    resetDiagnose(){
        this.props.input.onChange(undefined);
    }
    drugSelected(drug){
        this.props.input.onChange([drug.name]);
    }
    drugStartDate(date){
        this.props.change('net', "newValue");
    }
    handleDateChange(value){
        this.props.input.onChange(value);
    }
    render(){
        const {input, label, meta, type, options, size, option, removeClass, validation} = this.props;
        const sizeCurrent = size ? size : "s12";
        const errorState = (meta.touched && meta.error) ? true : false;
        const errorString = meta.error && errorState ? this.props.translate(meta.error) : "";
        const labelString = this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : this.props.translate(label);
        switch(type){
            case "select":
                let optionsArray = [];
                if(typeof this.props.optionsUrl !== "undefined"){
                    optionsArray = this.state.options.map(anOption => {
                        return <MenuItem value={anOption.value}>{anOption.label}</MenuItem>
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
                    <FormControl mt={3} variant="outlined" margin={this.typeMargin} style={{width:"100%"}} >
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
                                <InputLabel shrink={true}>Choose the options that apply</InputLabel>
                            </div>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                {optionButtons}
                            </ButtonGroup>
                        </div>
                    ])
            case "checkbox":
                console.log("Value checkbox: "+input.name+" "+input.value);
                const classNameError = (meta.touched && meta.error) ? "error text" : "";
                const className = removeClass ?  `col ${sizeCurrent}` : `col ${sizeCurrent}`
                const errorText = errorState ? <RedFormHelperText>This field is required</RedFormHelperText> : "";
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
                            margin={this.typeMargin}
                            id={input.name}
                            inputVariant="outlined"
                            size="small"
                            label={input.value ? "" : labelString}
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
            case "evaluate":
                let arrayButtons = [];
                for(let i= 0;i < 10; i++){
                    const value = i+1;
                    let iconString = "panorama_fish_eye";
                    if(input.value ===  value){
                        iconString = "fiber_manual_record";
                    }
                    arrayButtons.push(
                        <IconButton onClick={()=>this.props.input.onChange(value)}>
                            {value}.
                            <Icon>{iconString}</Icon>
                        </IconButton>
                    )
                }
                return (
                    <div className="container">
                        <div className="row">
                            <InputLabel id={input.name}>{labelString}</InputLabel>
                        </div>
                        <div className="row">
                            {arrayButtons}
                        </div>
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
                )
            case "ict" : 
                return(
                    <ICTSelector label={labelString} {...input} variant="outlined" margin={this.typeMargin} 
                        helperText={errorString} resetDiagnose={this.resetDiagnose}
                        size="small" diagnoseSelected={(code) => this.diagnoseSelected(code)} />
                );
            case "test" : return null;
            case "drug" : 
                return(
                    <MultipleTreatmentSelector label={labelString} {...input} variant="outlined" margin={this.typeMargin} 
                        helperText={errorString}  errorState={errorState} slaves={this.props.slaves}
                        resetDiagnose={this.resetDiagnose} 
                        size="small" drugSelected={(code) => this.drugSelected(code)} />
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
