import React, { Component } from 'react'
import M from 'materialize-css';
import { withLocalize } from 'react-localize-redux';
import axios from 'axios';

class FieldSherwood extends Component{
    constructor(props){
        super(props);

        this.state = {options : []}
    }
    async componentDidMount(){
        let selects = document.querySelectorAll('select');
        var instances = M.FormSelect.init(selects, {});
        if(typeof this.props.optionsUrl !== "undefined"){
            const request = await axios.get(this.props.optionsUrl);
            if(request.status === 200){
                this.setState({options : request.data});
            }
        }
    }
    render(){
        const {input, label, meta, type, disabled, options, defaultOption, size} = this.props;
        const sizeCurrent = size ? size : "s12";
        let errorClass = (meta.touched && meta.error) ? "invalid" : "";
        switch(type){
            case "select":
                let optionsArray = [];
                if(typeof this.props.optionsUrl !== "undefined"){
                    optionsArray = this.state.options.map(option => {
                        return <option key={option.code} value={option.code}>{this.props.translate(option.code)}</option>
                    })
                }
                else{
                    optionsArray = options.map(option => {
                        return <option key={option.value} value={option.value}>{this.props.translate(option.text)}</option>
                    })
                }
                return (
                    <div className={`input-field col ${sizeCurrent}`}>
                        <select data-testid={input.name} {...input} >
                            <option value={defaultOption.value} disabled>{this.props.translate(defaultOption.text)}</option>
                            {
                                optionsArray
                            }
                        </select>
                        <label>{this.props.translate(label)}</label>
                        <span className="error text">{(meta.touched && meta.error) && this.props.translate(meta.error)}</span>
                    </div>
                    
                );
            case "checkbox":
                const className = (meta.touched && meta.error) ? "error text" : ""
                return (
                    <div className={`input-field col ${sizeCurrent}`}>
                        <label>
                            <input data-testid={input.name} {...input} type="checkbox"/>
                            <span className={className}>{this.props.translate(label)}</span>
                        </label>
                        
                    </div>
                )
            default:               
                return(
                    <div  className={`input-field col ${sizeCurrent}`}>
                        <input data-testid={input.name} {...input}  className={`validate ${errorClass}`} key={input.name} id={input.name} name={input.name} type={type} disabled={disabled} />
                        <label key={`label_${input.name}`} htmlFor={input.name}>{this.props.translate(label)}</label>
                        <span className="error text">{(meta.touched && meta.error) && this.props.translate(meta.error)}</span>
                    </div>
                );
        }
    }
}


export default withLocalize(FieldSherwood);
