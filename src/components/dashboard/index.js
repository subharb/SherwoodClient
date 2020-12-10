import React, { useState, useEffect, Component }  from 'react'
import axios from 'axios';
import Header from '../general/header';
import Toolbar from './toolbar';
import LoadingScreen from '../general/loading_screen';
import CreateInvestigation from '../investigation/create';
import withLoggedUser from '../withLoggedUser';
import GridInvestigations from '../investigation/show/all';
import SingleInvestigation from '../investigation/show/single';
import Summary from './summary';
/**
 * Main component where all the interactions occur
 */
class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {investigations:null}
    }

    async componentDidMount(){  
        const request = await axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}})
                .catch(err => {console.log('Catch', err); return err;}); 
        if(request.status === 200){
            //redirec a /login
            this.setState({investigations:request.data.investigations})
        }
        else if(request.status === 401){
            this.props.history.push(this.props.typeUser+"/login");
        } 
    }
    renderMainContent(){
        console.log(this.props.action);
        if(this.state.investigations === null){
            return "CARGANDO";
        }
        switch(this.props.action){
            case "create":
                return <CreateInvestigation />
            case "show":
                if(typeof this.props.uuid === "undefined"){
                    return <GridInvestigations typeUser={localStorage.getItem("type")} investigations={this.state.investigations} />
                }
                else{
                    const currentInvestigationArray = this.state.investigations.filter(investigation => {
                        return investigation.uuid === this.props.uuid
                    })
                    return <SingleInvestigation typeUser={localStorage.getItem("type")} investigation={currentInvestigationArray[0]} />
                }
                
            case "edit":
                return <CreateInvestigation uuid={this.props.uuid} />
            case "pending":
            case "ongoing":
            case "draft":
            case "live":
                return <GridInvestigations filter={this.props.action} typeUser={localStorage.getItem("type")} investigations={this.state.investigations} />
            default:
                return <GridInvestigations  typeUser={localStorage.getItem("type")} investigations={this.state.investigations} />
        }
    }
    render(){
        return ([
            <LoadingScreen key="loading_screen" />,
            <Header />,
            <div key="container" className="container">
                <div className="row">
                    <div className="col-3">
                        <Toolbar typeUser={localStorage.getItem("type")} /> 
                    </div>
                    <div className="col-9">
                        { this.renderMainContent() }
                    </div>
                </div>
            </div>
        ]
        )
        
    }
}

export default withLoggedUser(Dashboard)
