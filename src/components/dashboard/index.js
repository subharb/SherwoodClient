import React, { useState, useEffect, Component }  from 'react'
import Header from '../header';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Translate } from 'react-localize-redux';
import Toolbar from './toolbar';

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
    render(){
        
        return (
            <div>
                <Header />
                    <Translate id="dashboard.greetings" />
                    <Toolbar  /> 
            </div>
        )
    }
}
