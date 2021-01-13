import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export function useFechData(name, request){
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function fetchData(url){
            setIsLoading(true);
            const response = await request()
                .catch(err => {console.log('Catch', err); return err;}); 
            setIsLoading(true);
            if(response.request.status === 200){
                //redirec a /login
                setData(response.data.investigations);
            }
            else if(response.request.status === 401){
                setError({
                    code : 401
                })
                history.push("/auth/sign-in");
            } 
            else{
                setError({
                    code : 500
                })
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);
    return {data, isLoading, error};
}

export function useInvestigations(){
    const [investigations, setInvestigations] = useState([]);
    const [errors, setErrors] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function fetchInvestigations(){
            setSubmitting(true);
            const response = await axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}})
            .catch(err => {console.log('Catch', err); return err;}); 
            setSubmitting(true);
            if(response.request.status === 200){
                //redirec a /login
                setInvestigations(response.data.investigations);
            }
            else if(response.request.status === 401){
                setErrors({
                    code : 401
                })
                history.push("/auth/sign-in");
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