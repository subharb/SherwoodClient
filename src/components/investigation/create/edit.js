import React, { useEffect, useState } from 'react';
import UpdateInvestigation from './index';
import { fetchInvestigation as fetchInvestigationRemote } from '../../../services/sherwoodService';

export default function EditInvestigation(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [investigation, setInvestigation] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        async function fetchInvestigation(){
            try{
                const response = await fetchInvestigationRemote(props.uuid);
                setInvestigation(response.investigation);
                setIsLoading(false);
            }
            catch(error){
                setError(true);
                setIsLoading(false);
            }
        }
        setIsLoading(true);
        fetchInvestigation();
        
    }, [])

    return <UpdateInvestigation  uuid={props.uuid}
            initialState={{investigation:investigation, isLoading:isLoading, error : error}} />
}
