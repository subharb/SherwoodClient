import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import { loginUser, toogleLoading } from '../actions';
import FieldSherwood  from './FieldSherwood';
import Header from './header';
import LoadingScreen from '../components/general/loading_screen';
import { validateField } from '../utils';

/**
 * Component for login researchers
 * 
 * @component
 * return (
 *   <Login  />
 * )
 */
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
    componentDidUpdate(nextProps, nextState) {
        //Si se ha terminado la conexión de login y hay un token, entonces redirijo al panel
        if(!nextState.loading && this.state.loading && localStorage.getItem("jwt") && nextState.error === 0){
            this.props.history.push("/dashboard");
        }
    }
    componentDidMount(){
        console.log("Current Token", localStorage.getItem("jwt"));
        if(localStorage.getItem("jwt")){
            this.props.history.push("/dashboard");
        }
    }
    async loginUser(email, password) {
        const postObj = {email:email, password:password};
        const request = await axios.post(process.env.REACT_APP_API_URL+'/researchers/login', postObj)
            .catch(err => console.log('Catch', err)); 
        
        //Guardamos el token si la request fue exitosa
        let error = 0;
        if(request.status === 200){
            console.log("TOKEN: "+request.data.token);
            localStorage.setItem("jwt", request.data.token);
        }
        else{
            error = 1;
        }
        this.setState({loading:false, error:error});
        this.props.toogleLoading();
    }
    handleLogin(values){
        console.log("HandleLogin", values);
        this.setState({loading:true});
        this.props.toogleLoading();
        const hashPassword = CryptoJS.SHA256("Message").toString(CryptoJS.enc.Base64)
        console.log("hashPassword", hashPassword);
        this.loginUser(values.email, hashPassword);
       
    }
    render() {
        console.log("Render");
        
        return ([
            <LoadingScreen />,
            <Header key="header" />,
            <Container key="container" >            
                <div className="row">
                    <div className="col s6 m5 l3 offset-s3 offset-m4 offset-l5"> 
                    <div className="card white darken-1">
                        <div className="card-content">
                            <span className="card-title">Login</span>
                            <div className="row">
                                <form onSubmit={this.props.handleSubmit(values => this.handleLogin(values))} className="col s12 text-center">
                                    {this.state.loading &&
                                        <span>Cargando...</span>
                                    }
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <Field disabled={this.state.loading} key="email" type="text" name="email" required={true} validation="email" component={FieldSherwood} label="login.email"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <Field disabled={this.state.loading} key="password" type="password" name="password" required={true} validation="password" component={FieldSherwood} label="login.password"/>
                                        </div>
                                    </div>
                                    
                                    <button disabled={this.state.loading} className="waves-effect waves-light btn">Login</button>
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
})(connect(null, { loginUser, toogleLoading })(Login))
