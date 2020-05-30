import React from 'react'
import M from 'materialize-css';
import { Translate } from 'react-localize-redux';

//De props cogemos props.input y se lo asignamos a input
export const TextField =  ({input, label, meta, type, disabled}) => {
    return (
        <div className="input-field col s12">
            <input {...input} key={input.name} id={input.name} name={input.name} type={type} disabled={disabled} className="validate" />
            <label key={`label_${input.name}`} htmlFor={input.name}>{label}</label>
            <span className="error text">{meta.touched && meta.error}</span>
       </div>
    )
}

//De props cogemos props.input y se lo asignamos a input
export const SelectField =  ({input, label, meta, type, disabled, options, defaultOption}) => {
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
      });
    return (
        <div className="input-field col s12">
            <select>
                <option value={defaultOption.value} disabled selected>{defaultOption.text}</option>
                {
                    options.map(option => {
                        return <option value={option.value}>{option.text}</option>
                    })
                }
            
            </select>
            <label>{label}</label>
        </div>
    )
}
