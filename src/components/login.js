import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import FieldSherwood  from './FieldSherwood';
import Header from './header';
import { validateField } from '../utils';


const Container = styled.div`
    justify-content:center;
`;

const FIELDS = {
    "email" : {
        required : true,
        validation : "email"
    },
    "password" : {
        required : true,
        validation : "password"
    }
}
class Login extends Component {
    constructor(props){
        super(props);

        this.state = {loading:false, error:false};


    }
    handleLogin(values){
        console.log("HandleLogin", values);
           
    }
    render() {
        return ([
            <Header key="header" />,
            <Container key="container" >            
                <div className="row">
                    <div className="col s6 m5 l3 offset-s3 offset-m4 offset-l5"> 
                    <div className="card white darken-1">
                        <div className="card-content">
                            <span className="card-title">Login</span>
                            <div className="row">
                                <form onSubmit={this.props.handleSubmit(values => this.handleLogin(values))} className="col s12 text-center">
                                    
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <Field key="email" type="text" name="email" required={true} validation="email" component={FieldSherwood} label="Email"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <Field key="password" type="password" name="password" required={true} validation="password" component={FieldSherwood} label="Password"/>
                                        </div>
                                    </div>
                                    <button className="waves-effect waves-light btn">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Container>
        ]
           
        )
    }
}

function validate(values){
    console.log("Validate");
    //console.log(values);
    const errors = {};
    
    Object.keys(FIELDS).forEach(key => {
        console.log(key);
        const validation = validateField({value : values[key], validation:FIELDS[key].validation, required:FIELDS[key].required})
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    })
        
    

    // if(!validateField({value : values.email, validation:"email"}).result){
    //     errors.email = "Error email"
    // }
    // if(!validateField({value : values.password, validation:"password"}).result){
    //     errors.password = "Error password";
    // }
    // if(!values.email || values.email.length > 4){
    //     errors.email = "Error email";
    // }
    
    return errors;
}

export default reduxForm({
    validate : validate,
    form : 'loginForm'
})(Login)
