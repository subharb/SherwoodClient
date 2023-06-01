import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import { loginUser, toggleLoading } from '../../actions';
import FieldSherwood  from '../general/FieldSherwood';
import Header from '../general/header';
import LoadingScreen from '../general/loading_screen';
import { validateField, decryptData } from '../../utils/index.jsx';
import { ButtonContinue } from '../../components/general/mini_components';
import jwt from 'jsonwebtoken';

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
    background-color: ${props => props.theme.buttonContinue.background};
`;

const FIELDS = {
    "email" : {
        required : true,
        validation : "validEmail"
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
    // componentDidUpdate(nextProps, nextState) {
    //     //Si se ha terminado la conexión de login y hay un token, entonces redirijo al panel
    //     if(!nextState.loading && this.state.loading && localStorage.getItem("jwt") && nextState.error === 0){
    //         this.props.history.push("/dashboard");
    //     }
    // }
    componentDidMount(){
        console.log("Current Token", localStorage.getItem("jwt"));
        
    }
    async loginUser(email, password) {
        const postObj = {email:email, password:password};

        const request = await axios.post(import.meta.env.VITE_APP_API_URL+'/'+this.props.match.params.type+'/login', postObj)
            .catch(err => {console.log('Catch', err); return err;}); 
        
        //Guardamos el token si la request fue exitosa
        let error = 0;
        if(request.status === 200){
            console.log("TOKEN: "+request.data.jwt);
            localStorage.setItem("jwt", request.data.jwt);
            localStorage.setItem("type", this.props.match.params.type);
            const payload = jwt.decode(localStorage.getItem("jwt"));
            const rawKeyResearcher = await decryptData(payload.keyResearcher, password);
            localStorage.setItem("rawKeyResearcher", rawKeyResearcher);

            axios.defaults.headers['Authorization'] = localStorage.getItem('jwt');
            this.props.history.push("/dashboard");
        }
        else{
            error = 1;
        }
        this.setState({loading:false, error:error});
        this.props.toggleLoading();
    }
    handleLogin(values){
        console.log("HandleLogin", values);
        this.setState({loading:true});
        this.props.toggleLoading();
        const hashPassword = CryptoJS.SHA256(values.password).toString(CryptoJS.enc.Base64)
        console.log("hashPassword", hashPassword);
        this.loginUser(values.email, hashPassword);
       
    }
    render() {
        console.log("Render");
        return ([
            <LoadingScreen />,
            <Header key="header" />,
            <Container className="container" key="container" >            
                <div className="row">
                    <div className="col-s12 col-lg6 mx-auto"> 
                    <div className="card white darken-1">
                        <div className="card-body">
                            <span className="card-title mx-auto">Login</span>
                            <div className="row mx-auto">
                                <form onSubmit={this.props.handleSubmit(values => this.handleLogin(values))} className="col s12 text-center">
                                    {this.state.loading &&
                                        <span>Cargando...</span>
                                    }
                                    <div className="row">
                                        <div className=" col-s12">
                                            <Field disabled={this.state.loading} key="email" type="text" name="email" required={true}  component={FieldSherwood} label="login.email"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" col-s12">
                                        <Field disabled={this.state.loading} key="password" type="password" name="password" required={true}  component={FieldSherwood} label="login.password"/>
                                        </div>
                                    </div>
                                    {this.state.error && 
                                        <div>Login Error</div>
                                    }
                                    <ButtonContinue type="submit"  disabled={this.state.loading}>Login</ButtonContinue>
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
    
    return errors;
}

export default reduxForm({
    validate : validate,
    form : 'loginForm'
})(connect(null, { loginUser, toggleLoading })(Login))
