import { useState, useEffect } from 'react';
import axios from 'axios';

export function useInvestigations(){
    const [investigations, setInvestigations] = useState([]);
    const [errors, setErrors] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchInvestigations(){
            setSubmitting(true);
            const request = await axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}})
            .catch(err => {console.log('Catch', err); return err;}); 
            setSubmitting(true);
            if(request.status === 200){
                //redirec a /login
                setInvestigations(request.data.investigations);
            }
            else if(request.status === 401){
                setErrors({
                    code : 401
                })
                //this.props.history.push(this.props.typeUser+"/login");
            } 
            else{
                setErrors({
                    code : 500
                })
            }
            setSubmitting(false);
        }
        fetchInvestigations();
    }, []);

    return [investigations, submitting, errors];
}