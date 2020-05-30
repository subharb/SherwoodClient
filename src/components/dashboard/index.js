import React, { useState, useEffect, Component }  from 'react'
import Header from '../header';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Translate } from 'react-localize-redux';
import Toolbar from './toolbar';
import LoadingScreen from '../general/loading_screen';
import CreateInvestigation from '../investigation/create';

export default class Dashboard extends Component{
    componentDidMount(){
    
        //Compruebo que hay un jwt
        if(localStorage.getItem("jwt") !==""){
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems, {isFixed:true});
                
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
            <div key="container" className="container">
                <div className="row">
                    <Header />
                </div>
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
