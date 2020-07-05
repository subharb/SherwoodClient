import React from 'react';
import axios from 'axios';

export default function withLoggedResearcher(WrappedComponent, selectData) {
    // ...y devuelve otro componente...
    return class extends React.Component {
        async componentDidMount(){
            //Compruebo que hay un jwt
            if(localStorage.getItem("jwt") !==""){
                console.log(localStorage.getItem('jwt'));
                const request = await axios.get(process.env.REACT_APP_API_URL+'/researcher/validate')
                .catch(err => {console.log('Catch', err); return err;}); 
            
                //Guardamos el token si la request fue exitosa
                if(request.status !== 200){
                    //redirec a /login
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
        return <WrappedComponent {...this.props} />;
      }
    };
  }