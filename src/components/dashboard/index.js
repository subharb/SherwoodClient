import React, { useState, useEffect, Component }  from 'react'
import axios from 'axios';
import Header from '../general/header';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Translate } from 'react-localize-redux';
import Toolbar from './toolbar';
import LoadingScreen from '../general/loading_screen';
import CreateInvestigation from '../investigation/create';
import withLoggedResearcher from '../withLoggedResearcher';
import AllInvestigations from '../investigation/show/all_investigations';
import SingleInvestigation from '../investigation/show/single_investigation';

class Dashboard extends Component{
   componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {isFixed:true});
        });
   }
    renderMainContent(){
        console.log(this.props.match.params.action);
        switch(this.props.match.params.action){
            case "create":
                return <CreateInvestigation />
            case "show":
                if(typeof this.props.match.params.uuid === "undefined"){
                    return <AllInvestigations uuid={this.props.match.params.uuid} />
                }
                else{
                    return <SingleInvestigation uuid={this.props.match.params.uuid} />
                }
                
            case "edit":
                return <CreateInvestigation  uuid={this.props.match.params.uuid} />
            case "pending":
                return <AllInvestigations uuid={this.props.match.params.uuid} />
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

export default withLoggedResearcher(Dashboard)
