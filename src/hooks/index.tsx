import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { fetchUser } from "../services/authService";
import { decryptData, encryptData } from '../utils';
import { useQuery } from 'react-query'
import { SIGN_IN_ROUTE } from '../routes';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import { FieldWrapper } from '../components/general/mini_components';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentsInvestigationAction } from '../redux/actions/hospitalActions';
import { Color } from '@material-ui/lab';
import { IDepartment } from '../constants/types';
import { INITIAL_SELECT } from '../components/general/SmartFields';
import { IRequest } from '../pages/hospital/Service/types';
import { fetchProfileInfo } from '../redux/actions/profileActions';

export interface SnackbarType{
    show: boolean;
    message?: string | undefined;
    severity?: Color | undefined;
    
}

export function useSnackBarState(){
    const [showSnackbar, setShowSnackbar] = useState<{ show: boolean; message?: string; severity?: Color; }>({show : false});

    return [showSnackbar, setShowSnackbar] as const;
}

export function useRouter(initValue:any){
    const history = useHistory();
    return {
        pathname : initValue ? initValue : history.location.pathname,

    }
}

export function useProfileInfo(){
    const investigations = useSelector((state:any) => state.investigations);
    const profile = useSelector((state:any) => state.profile.info);
    const loadingProfile = useSelector((state:any) => state.investigations.loading | state.profile.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        
        if(investigations.currentInvestigation){
            if(!profile){
                dispatch(fetchProfileInfo(investigations.currentInvestigation.uuid));
            }
        }
    }, [ investigations]);

    return { profile, loadingProfile }
}


export function useDepartments(){
    const investigations= useSelector((state:any) => state.investigations);
    const departments = useSelector((state:{hospital : {data: {departments : IDepartment[]}}}) => state.hospital.data.departments ? state.hospital.data.departments : null);
    const researchers = useSelector((state:any) => state.hospital.data.researchers ? state.hospital.data.researchers : []);
    const loading = useSelector((state:any) => state.hospital.loading | state.investigations.loading);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function getDepartments(uuidInvestigation:string){
            await dispatch(
                getDepartmentsInvestigationAction(uuidInvestigation)
            ); 
        }
        if(investigations.data && investigations.currentInvestigation){
            getDepartments(investigations.currentInvestigation.uuid)
        }
    }, [investigations])

    return { departments, researchers, investigations, loading}
}

export function useRequest(idRequest:number){
    const investigations= useSelector((state:any) => state.investigations);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [request, setRequest] = useState<IRequest | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRequest = async () => {
            setLoadingRequest(true);
            
            const response = await axios(`${process.env.REACT_APP_API_URL}/hospital/${investigations.currentInvestigation.uuid}/request/${idRequest}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {console.log('Catch', err); return err;});
            if(response.status === 200){
                setRequest(response.data.request);
            }
            setLoadingRequest(false);
        }
        if(investigations.data && investigations.currentInvestigation){
            fetchRequest();
        }
        
    }, [idRequest, investigations])

    return { request, loadingRequest}
}

export function useSelectSmartField(initialState:any, label:string, type:string, errorState:boolean, setAddingSmartField:(adding:boolean) => void){
    //Hay que devolver undefined para que el select no ponga el placeholder arriba
    const [addSmartField, setAddSmartField] = useState(initialState && initialState.addSmartField ? initialState.addSmartField : !INITIAL_SELECT.includes(type) ? true : undefined);

    function selectChanged(event:React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>){
        console.log(event);
        setAddSmartField(event.target.value);
    }
    function resetState(){
        setAddSmartField(!INITIAL_SELECT.includes(type));
        setAddingSmartField(true);
    }
    function renderSelect(){
        const optionsArray = [<MenuItem value={1}><Translate id="general.yes" /></MenuItem>, <MenuItem value={0}><Translate id="general.no" /></MenuItem>]
        
        return(
            <FieldWrapper>
                <FormControl variant="outlined" fullWidth margin="dense" error={errorState}>
                    <InputLabel id="show_treatment">{label}</InputLabel>
                    <Select
                        labelId="show_treatment"
                        id="show_treatment"
                        label={label}
                        value={addSmartField}
                        onChange={(event) => selectChanged(event)}
                    >
                    { optionsArray }
                    </Select>
                </FormControl>
            </FieldWrapper>
        )
    }
    return [addSmartField, renderSelect, resetState]
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

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * Idea stolen from: https://stackoverflow.com/a/55075818/1526448
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
 export function useUpdateEffect(effect:() => void, dependencies:any = []) {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) effect();
        else didMount.current = true;
    }, dependencies);
  }

export function usePrevious(value:any){
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export function useOffline(){
    const [offline, setOffline] = React.useState(!navigator.onLine);

    function updateOffline(){
        if(offline === navigator.onLine){
            setOffline(!navigator.onLine);
        }
    }
    useEffect(() => {
        async function subscribeToDB(){
            // const db = await openStore("workbox-background-sync");
            // var tx = db.transaction("requests", "readwrite");

            // tx.objectStore("requests").openCursor(0).onsuccess = function (event:any) {
            //     var cursor, object;

            //     cursor = event.target.result;
            //     object = cursor.value;
            //     object.value = 43;
            //     cursor.update(object).onsuccess = function (event:any) {
            //         db.transaction("requests").objectStore("requests").get(0).onsuccess = function (event:any) {
            //             console.log("Cursor update onsuccess event:");
            //             console.log(event.target.result);
            //         };
            //     };

            // };
        }
        window.addEventListener('online',  updateOffline);
        window.addEventListener('offline', updateOffline);
       
        subscribeToDB();
        
    }, [offline]);


    return offline;
}

