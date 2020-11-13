import React, { Component } from 'react'
import M from 'materialize-css';
import { withLocalize } from 'react-localize-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { FormControl, Select, InputLabel, MenuItem, TextField, FormControlLabel, Checkbox } from '@material-ui/core';

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

        this.state = {options : []}
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
