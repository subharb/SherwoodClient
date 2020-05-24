import React from 'react'

//De props cogemos props.input y se lo asignamos a input
export default ({input, label, meta, type}) => {
    return (
       [
            <input {...input} key={input.name} id={input.name} name={input.name} type={type} className="validate" />,
            <label key={`label_${input.name}`} htmlFor={input.name}>{label}</label>,
            <span className="error text">{meta.touched && meta.error}</span>
       ]
    )
}
