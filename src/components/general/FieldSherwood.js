import React, { Component } from 'react'
import M from 'materialize-css';
import { withLocalize } from 'react-localize-redux';
import axios from 'axios';

class FieldSherwood extends Component{
    constructor(props){
        super(props);

        this.state = {options : []}
    }
    componentDidUpdate(){
        let selects = document.querySelectorAll('select');
        var instances = M.FormSelect.init(selects, {});
    }
    async componentDidMount(){
        if(typeof this.props.optionsUrl !== "undefined"){
            const request = await axios.get(this.props.optionsUrl);
            if(request.status === 200){
                this.setState({options : request.data});
            }
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
                        return <option key={option.value} value={option.value}>{this.props.translate(option.text)}</option>
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
                const className = removeClass ?  `col ${sizeCurrent}` : `input-field col ${sizeCurrent}`
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


export default withLocalize(FieldSherwood);
