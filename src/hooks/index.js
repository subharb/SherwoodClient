import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
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

export function useInvestigations(props) {
    const { data, isLoading, error } = useQuery('investigations', () =>
        axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}})
    ) //useFechData('fetchInvestigations', () =>
        //     axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}})
        // )
    

    const value = React.useMemo(() => {
       return({
           isLoading, error, investigations : data ? data.data.investigations : data, status : data ? data.status : data
        }) 
    }, [data, isLoading, error]);

    return value
}

export function useInvestigation(uuid, initialData) {
    const { data, isLoading, error } = useQuery('investigations', () =>
        axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/'+uuid, { headers: {"Authorization" : localStorage.getItem("jwt")}}),
        {
            initialData: initialData ? {data: initialData} : initialData,
        }
    )

    const value = React.useMemo(() => {
       return({
           isLoading, error, investigation : data ? data.data.investigation : data, status : data ? data.status : data
        }) 
    }, [data, isLoading, error]);

    return value
}