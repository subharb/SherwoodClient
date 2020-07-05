import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import AllInvestigations from './all_investigations';
import SingleInvestigation from './single_investigation';
import withLoggedResearcher from '../../withLoggedResearcher';

const InvestigationCard = styled.div`

`;
class ShowInvestigations extends Component {

    async componentDidMount(){  
        const request = await axios.get(process.env.REACT_APP_API_URL+'/investigation/all')
                .catch(err => {console.log('Catch', err); return err;}); 
        if(request.status === 200){
            //redirec a /login
            this.setState({investigations:request.data})
        }
            
    }
    render() {
        if(this.props.uuid){
            return <SingleInvestigation uuid={this.props.uuid} />
        }
        else{
            return <AllInvestigations />
        }
        
    }
}

export default withLoggedResearcher(ShowInvestigations);
