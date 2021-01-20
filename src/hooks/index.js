import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from 'react-query'

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

export function useSherwoodUser(){
    const history = useHistory();
    let location = useLocation();
    const initialLocation = location.pathname;
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(true);
    
    useEffect(() => {
        async function fetchUser(){
            const request = await axios.get(process.env.REACT_APP_API_URL+'/researcher/validate', { headers: {"Authorization" : localStorage.getItem("jwt")}})
                .catch(err => {
                    console.log('Catch', err); 
                    return { status : 401};
                }); 
            
            return request.status === 200
        }
        async function checkUser(){
            
            console.log("JWT", localStorage.getItem("jwt"));
            
            if(localStorage.getItem("jwt") !==""){
                const isAuth = await fetchUser();
                setIsLoading(false);
                if(isAuth){
                    setIsAuth(true);
                    //history.push(initialLocation);
                    return; 
                }    
            }
            
            setIsAuth(false);
            
        }
        
        checkUser();
        
    }, [history])
    
    if(!isAuth){
        const redirectUrl = "/auth/sign-in";//localStorage.getItem('type') === null ?  "/auth/sign-in" :  "/"+localStorage.getItem('type')+"/login";
        history.push(redirectUrl);
    }
    

    return {isLoading, isAuth}
}