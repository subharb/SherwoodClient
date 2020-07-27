// import React, { Component } from 'react'
// import axios from 'axios';
// import styled from 'styled-components';
// import AllInvestigations from './all_investigations';
// import SingleInvestigation from './single_investigation';
// import withLoggedResearcher from '../../withLoggedResearcher';

// const InvestigationCard = styled.div`

// `;
// class ShowInvestigations extends Component {

//     async componentDidMount(){  
//         const request = await axios.get(process.env.REACT_APP_API_URL+'/investigation/all')
//                 .catch(err => {console.log('Catch', err); return err;}); 
//         if(request.status === 200){
//             this.setState({investigations:request.data})
//         }
            
//     }
//     render() {
//         if(this.props.uuid){
//             return <SingleInvestigation uuid={this.props.uuid} />
//         }
//         else{
//             return <AllInvestigations />
//         }
        
//     }
// }

// export default withLoggedResearcher(ShowInvestigations);


import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
    // ...y devuelve otro componente...
    class withLoggedResearcher extends React.Component {
        async componentDidMount(){
            //Compruebo que hay un jwt
            if(localStorage.getItem("jwt") !==""){
                console.log(localStorage.getItem('jwt'));
                const request = await axios.get(process.env.REACT_APP_API_URL+'/researcher/validate')
                .catch(err => {console.log('Catch', err); return err;}); 
            
                //Guardamos el token si la request fue exitosa
                if(request.status !== 200){
                    //redirect a /login
                    this.props.history.push("/login");
                }
            }
            else{
                this.props.history.push("/login");
            }
        }
  
  
      render() {
        // ... y renderiza el componente envuelto con los datos frescos!
        // Toma nota de que pasamos cualquier prop adicional
        return <ChildComponent {...this.props} />;
      }
    }
    return withRouter(withLoggedResearcher);
  }
  