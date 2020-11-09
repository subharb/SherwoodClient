import React, { Component } from 'react'
import M from 'materialize-css';
import { withLocalize } from 'react-localize-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

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
        if(this.props.type === "select"){
            let selects = document.querySelectorAll('select');
            var instances = M.FormSelect.init(selects, {});
        }
    }
    render(){
        const {input, label, meta, type, disabled, options, defaultOption, size, option, removeClass} = this.props;
        const sizeCurrent = size ? size : "s12";
        let errorClass = (meta.touched && meta.error) ? "invalid" : "";
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
                        return <option key={option.value} value={option.value}>{optionText}</option>
                    })
                }
                return (
                    <div className={`input-field col ${sizeCurrent}`}>
                        <select data-testid={input.name} {...input} aria-labelledby={labelString} >
                            <option value={defaultOption.value} disabled>{this.props.translate(defaultOption.text)}</option>
                            {
                                optionsArray
                            }
                        </select>
                        <label aria-label={labelString}>{labelString}</label>
                        <span className="error text">{(meta.touched && meta.error) && this.props.translate(meta.error)}</span>
                    </div>
                    
                );
            case "checkbox":
                console.log("Value checkbox: "+input.name+" "+input.value);
                const classNameError = (meta.touched && meta.error) ? "error text" : "";
                const className = removeClass ?  `col ${sizeCurrent}` : `col ${sizeCurrent}`
                return (
                    <div className={className}>
                        <label>
                            <input className={classNameError} data-testid={input.name} {...input} type="checkbox"/>
                            <span className={classNameError}>{labelString}</span>
                        </label>
                    </div>
                )
            case "hidden":
                return(
                    <input data-testid={input.name} key={input.name} value={input.value} type="hidden" {...input} />
                );
            case "textarea":
                return(
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea2" class="materialize-textarea" data-length="120"></textarea>
                            <label for="textarea2">{label}</label>
                        </div>
                    </div>
                )
            default:     
                const isActive = input.value !== "" ? "active" : "";
                return(
                    <div  className={`input-field col ${sizeCurrent}`}>
                        <input data-testid={input.name} {...input}  
                            className={`validate ${errorClass}`} key={input.name} id={input.name} 
                            name={input.name} type={type} disabled={disabled} />
                        <label className={isActive} key={`label_${input.name}`} htmlFor={input.name}>{labelString}</label>
                        <span className="error text">{(meta.touched && meta.error) && this.props.translate(meta.error)}</span>
                    </div>
                );
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
