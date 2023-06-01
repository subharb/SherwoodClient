import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
    // ...y devuelve otro componente...
    class withLoggedUser extends React.Component {
        async componentDidMount(){
            //Compruebo que hay un jwt
            const redirectUrl = localStorage.getItem('type') === null ?  "/researcher/login" :  "/"+localStorage.getItem('type')+"/login";
            if(localStorage.getItem("jwt") !==""){
                console.log(localStorage.getItem('jwt'));
                const request = await axios.get(import.meta.env.VITE_APP_API_URL+'/researcher/validate', { headers: {"Authorization" : localStorage.getItem("jwt")}})
                .catch(err => {console.log('Catch', err); return err;}); 
            
                //Guardamos el token si la request fue exitosa
                if(request.status !== 200){
                    //redirect a /login
                    this.props.history.push(redirectUrl);
                }
            }
            else{
                this.props.history.push(redirectUrl);
            }
        }
  
  
    render() {
        // ... y renderiza el componente envuelto con los datos frescos!
        // Toma nota de que pasamos cualquier prop adicional
        if(localStorage.getItem("type") === "researcher" || localStorage.getItem("type") === "patient"){
            return <ChildComponent {...this.props} />;
        }
        else{
            return "Not logged in";
        }
        
      }
    }
    return withRouter(withLoggedUser);
  }
  