import React, { useState, useEffect, Component }  from 'react'
import axios from 'axios';
import Header from '../header';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Translate } from 'react-localize-redux';
import Toolbar from './toolbar';
import LoadingScreen from '../general/loading_screen';
import CreateInvestigation from '../investigation/new_investigation';

export default class Dashboard extends Component{
    async componentDidMount(){
        //Compruebo que hay un jwt
        if(localStorage.getItem("jwt") !==""){
            console.log(localStorage.getItem('jwt'));
            const request = await axios.get(process.env.REACT_APP_API_URL+'/researcher/validate')
            .catch(err => {console.log('Catch', err); return err;}); 
        
            //Guardamos el token si la request fue exitosa
            let error = 0;
            if(request.status !== 200){
                //redirec a /login
                this.props.history.push("/login");
            }
            
            document.addEventListener('DOMContentLoaded', function() {
                let elems = document.querySelectorAll('.sidenav');
                M.Sidenav.init(elems, {isFixed:true});
            });
        }
        else{
            this.props.history.push("/login");
        }
    }
    renderMainContent(){
        console.log(this.props.match.params.action);
        switch(this.props.match.params.action){
            case "create":
                return <CreateInvestigation />

            default:
                return "RESUMEN"
        }
    }
    render(){
        return ([
            <LoadingScreen key="loading_screen" />,
            <Header />,
            <div key="container" className="container">
                <div className="row">
                    <Translate id="dashboard.greetings" />
                </div>
                <div className="row">
                    <div className="col s3">
                        <Toolbar  /> 
                    </div>
                    <div className="col s8 card">
                    { this.renderMainContent() }
                    </div>
                </div>
            </div>
        ]
        )
    }
}
