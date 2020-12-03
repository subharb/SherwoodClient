import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { ButtonCheck, ButtonEmptyCheck } from '../general/mini_components';
import { FormControl, Select, InputLabel, MenuItem, TextField, 
        FormControlLabel, Checkbox, ButtonGroup } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
    } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const sharedStyle = css`
    & label {
        position: relative;
        padding-right: 25px;
        &+div{
        margin-top: 0;
        &:before {
            bottom: 5px;
        }
        &:after {
            bottom: 5px;
        }
        svg {
            top: 0;
        }
        }
    }
`

const FormControlSherwood = styled(FormControl)`
    ${sharedStyle}
`;

const TextFieldSherwood = styled(TextField)`
    ${sharedStyle}
`;

class FieldSherwood extends Component{
    constructor(props){
        super(props);

        this.state = {options : [], date : new Date()}

        this.multiOptionSelected = this.multiOptionSelected.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        
    }
    // componentDidUpdate(){
    //     let selects = document.querySelectorAll('select');
    //     var instances = M.FormSelect.init(selects, {});
    // }
    async componentDidMount(){
        if(typeof this.props.optionsUrl !== "undefined"){
            const request = await axios.get(this.props.optionsUrl);
            if(request.status === 200){
                this.setState({options : request.data});
            }
        }
        // if(this.props.type === "select"){
        //     let selects = document.querySelectorAll('select[name="'+this.props.input.name+'"]');
        //     M.FormSelect.init(selects, {});
            
        // }
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
    handleDateChange(value){
        this.props.input.onChange(value);
    }
    render(){
        const {input, label, meta, type, options, size, option, removeClass} = this.props;
        const sizeCurrent = size ? size : "s12";
        const errorState = (meta.touched && meta.error) ? true : false;
        const errorString = meta.error ? this.props.translate(meta.error) : "";
        const labelString = this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : this.props.translate(label);
        switch(type){
            case "select":
                let optionsArray = [];
                if(typeof this.props.optionsUrl !== "undefined"){
                    optionsArray = this.state.options.map(anOption => {
                        return <option key={anOption[option.value]} value={anOption[option.value]}>{anOption[option.text]}</option>
                    })
                }
                else{
                    optionsArray = options.map(option => {
                        const optionText = this.props.translate(option.text).indexOf("Missing translationId:") !== -1 ?  option.text : this.props.translate(option.text);
                    return <MenuItem value={option.value}>{optionText}</MenuItem>
                        
                    })
                }
                return(
                    <FormControlSherwood >
                        <InputLabel id={input.name}>{labelString}</InputLabel>
                        <Select  
                            labelId={input.name}
                            {...input} error={errorState} 
                            helperText={errorString}
                            >
                            {optionsArray}
                        </Select>
                    </FormControlSherwood>
                    
                )
            case "multioption" : 
                    const optionButtons = options.map(option => {
                        if(input.value.includes(option.value)){
                            return <ButtonCheck spaceRight={false} onClick={() => this.multiOptionSelected(option.value)}>{option.text}</ButtonCheck>
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
                return(
                    <FormControlLabel
                        control={<Checkbox checked={input.value} {...input} />}
                        label={labelString}
                    />
                );
            case "date":
                return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id={input.name}
                            label={label}
                            format="MM/dd/yyyy"
                            value={input.value === "" ? new Date() : input.value}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                );
            case "time":
                return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={input.value === "" ? new Date() : input.value}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                )
            case "hidden":
                return(
                    <input data-testid={input.name} key={input.name} value={input.value} type="hidden" {...input} />
                );
            case "textarea":
                return(
                    <div class="input-field col s12">
                        <textarea id="textarea2" class="materialize-textarea" data-length="120"></textarea>
                        <label for="textarea2">{label}</label>
                    </div>
                )
            default:    
                    console.log("TextFieldSherwood",input.value);
                return(
                    <TextFieldSherwood {...input}  
                        label={labelString} error={errorState} 
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
