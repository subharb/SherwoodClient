import React, { useState, useEffect, Component }  from 'react'
import axios from 'axios';
import Header from '../general/header';
import M from 'materialize-css';

import { Translate } from 'react-localize-redux';
import Toolbar from './toolbar';
import LoadingScreen from '../general/loading_screen';
import CreateInvestigation from '../investigation/create';
import withLoggedUser from '../withLoggedUser';
import GridInvestigations from '../investigation/show/all';
import SingleInvestigation from '../investigation/show/single';
import SurveyData from '../investigation/survey';
import Summary from './summary';

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
                    return <GridInvestigations />
                }
                else{
                    return <SingleInvestigation uuid={this.props.match.params.uuid} />
                }
                
            case "edit":
                return <CreateInvestigation uuid={this.props.match.params.uuid} />
            case "pending":
            case "ongoing":
            case "draft":
            case "live":
                return <GridInvestigations filter={this.props.match.params.action} />
            case "add":
                return <SurveyData uuidInvestigation={this.props.match.params.uuid} />
            default:
                return <Summary />
        }
    }
    render(){
        return ([
            <LoadingScreen key="loading_screen" />,
            <Header />,
            <div key="container" className="">
                <div className="row">
                        <Toolbar  /> 
                    <div className="col s8">
                    { this.renderMainContent() }
                    </div>
                </div>
            </div>
        ]
        )
    }
}

export default withLoggedUser(Dashboard)
