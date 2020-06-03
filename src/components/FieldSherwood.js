import React, { Component } from 'react'
import M from 'materialize-css';
import { withLocalize } from 'react-localize-redux';

class FieldSherwood extends Component{
    componentDidMount(){
        let selects = document.querySelectorAll('select');
        var instances = M.FormSelect.init(selects, {});
    }
    render(){
        const {input, label, meta, type, disabled, options, defaultOption, size} = this.props;
        const sizeCurrent = size ? size : "s12";
        let errorClass = (meta.touched && meta.error) ? "invalid" : "";
        switch(type){
            case "select":
                

                return (
                    // <div className={`input-field col ${sizeCurrent}`}>
                    //     <InputLabel id="demo-simple-select-label">{this.props.translate(label)}</InputLabel>
                    //     <Select  {...input}
                    //         labelId="demo-simple-select-label"
                    //         id="demo-simple-select"
                    //         value={defaultOption.value}
                    //         >
                    //         {
                    //             options.map(option => {
                    //                 return <MenuItem value={option.value}>{this.props.translate(option.text)}</MenuItem>
                    //             })
                    //         }
                    //     </Select>
                    // </div>
                        <div className={`input-field col ${sizeCurrent}`}>
                        <select {...input} >
                            <option value={defaultOption.value} disabled>{this.props.translate(defaultOption.text)}</option>
                            {
                                options.map(option => {
                                    return <option key={option.value} value={option.value}>{this.props.translate(option.text)}</option>
                                })
                            }
                        </select>
                        <label>{this.props.translate(label)}</label>
                        <span className="error text">{(meta.touched && meta.error) && this.props.translate(meta.error)}</span>
                    </div>
                    
                );
            case "checkbox":
                return (
                    <div className={`input-field col ${sizeCurrent}`}>
                        <label>
                            <input {...input} type="checkbox"/>
                            <span>{this.props.translate(label)}</span>
                        </label>
                        
                    </div>
                )
            default:               
                return(
                    <div className={`input-field col ${sizeCurrent}`}>
                        <input {...input} className={`validate ${errorClass}`} key={input.name} id={input.name} name={input.name} type={type} disabled={disabled} />
                        <label key={`label_${input.name}`} htmlFor={input.name}>{this.props.translate(label)}</label>
                        <span className="error text">{(meta.touched && meta.error) && this.props.translate(meta.error)}</span>
                    </div>
                );
        }
    }
}


export default withLocalize(FieldSherwood);
