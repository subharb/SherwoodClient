import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { fetchUser } from "../services/authService";
import { decryptData, encryptData } from '../utils';
import { useQuery } from 'react-query'
import { SIGN_IN_ROUTE } from '../routes';

export function usePatientsData(investigation, patientsData){
    const [decryptedPatientData, setDecryptedPatientData] = useState([]);
    const [errorEncryption, setErrorEncryption ] = useState(false);
    
    useEffect(() => {  
        try{
            if(patientsData.length !== 0 && patientsData.length !== decryptedPatientData.length){
                //const rawKeyResearcher = await decryptData("U2FsdGVkX1+vRAPd6EOpOTY53I8LLfs9iyX0mGh1Xesn6rwUS4UnTQvqTyWQvu0VeYLHUScUUtM22K8+4zJqZQ==", "Cabezadesherwood2")
                let tempDecryptedData = [];
                for(const patient of patientsData){
                    let encryptedFields = {};
                    if(investigation.permissions !== 0){
                        const rawKeyResearcher = investigation.encryptedKeyUsed === 0 ? process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD : localStorage.getItem("rawKeyResearcher");
                        
                        const keyInvestigation = decryptData(investigation.keyResearcherInvestigation, rawKeyResearcher);
                        
                        for(const personalField of investigation.personalFields){
                            const encryptedField = patient.personalData[personalField.name];
                            if(!encryptedField){
                                console.error("No coinciden campos!");
                                return "error!";
                            }
                            const decryptedField = decryptData(encryptedField, keyInvestigation);
                            encryptedFields[personalField] = decryptedField; 
                        }
                    }
                    
                    encryptedFields["id"] = patient.id; 
                    tempDecryptedData.push(encryptedFields);
                }
                setDecryptedPatientData(tempDecryptedData);
            }
        }
        catch(error){
            setErrorEncryption(true);
            return;
        }
        
    }, [patientsData])

    return {decryptedPatientData:decryptedPatientData, errorEncryption:errorEncryption}
}
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
                this.props.history.push({
                    pathname: SIGN_IN_ROUTE,
                    state: { 
                        from: this.props.location.pathname
                    }
                })
                
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
    return [data, isLoading, error];
}

export function useInvestigations(initInvestigations) {
    const [isLoading, setLoading ] = useState(true);
    const [investigations, setInvestigations] = useState(initInvestigations);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function fetchInvestigations(){
            setLoading(true);
            try{
                const request = await axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}});
                if(request.status === 200){
                    setInvestigations(request.data.investigations)
                }
                else{
                    setError(true);
                }
            }
            catch(error){
                console.error(error);
                setError(true);
            }
            
            setLoading(false);
        }
        if(!investigations){
            fetchInvestigations();
        }
        else{
            setLoading(false);
        }
        
    }, [])
    const value = React.useMemo(() => {
       return({
           isLoading, error, investigations : investigations
        }) 
    }, [investigations, isLoading, error]);

    return value
}

export function useInvestigation(uuid) {
    const { data, isLoading, error } = useQuery('investigations', () =>
        axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/'+uuid, { headers: {"Authorization" : localStorage.getItem("jwt")}})
    )

    const value = React.useMemo(() => {
       return({
           isLoading, error, investigation : data ? data.data.investigation : data, status : data ? data.status : data
        }) 
    }, [data, isLoading, error]);

    return value
}

export function useRouter(initValue){
    const history = useHistory();
    return {
        pathname : initValue ? initValue : history.location.pathname,

    }
}

export function useSherwoodUser(){
    const history = useHistory();
    let location = useLocation();
    const initialLocation = location.pathname;
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
     
        async function checkUser(){
            try{
                console.log("JWT", localStorage.getItem("jwt"));
            
                if(localStorage.getItem("jwt") !==""){
                    const isAuth = await fetchUser();
                    
                    if(isAuth){
                        setIsAuth(true);
                    }   
                    else{
                        setIsAuth(false);
                    } 
                }
                else{
                    setIsAuth(false);
                }
                setIsLoading(false);
            }
            catch(error){
                console.log(error);
                setIsLoading(false);
                setIsAuth(false);
                setError(true);
            }
        }
        
        checkUser();
        
    }, [history])
    
    if(!isAuth){        
        history.push({
            pathname: SIGN_IN_ROUTE,
            state: { 
                from: history.location.pathname
            }
        })
    }
    

    return {isLoading, isAuth, error}
}