import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DateFnsUtils from "@date-io/date-fns";
import { useHistory, useLocation } from "react-router-dom";
import { fetchUser } from "../services/authService";
import { getCurrentResearcherUuid } from '../utils/index.jsx';
import { SIGN_IN_ROUTE } from '../routes/urls';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { Translate } from 'react-localize-redux';
import { FieldWrapper } from '../components/general/mini_components';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendasInvestigationAction, getDepartmentsInvestigationAction } from '../redux/actions/hospitalActions';
import { Color } from '@mui/lab';
import { IAgenda, IDepartment, IUnit } from '../constants/types';
import { INITIAL_SELECT } from '../components/general/SmartFields';
import { IRequest, IService } from '../pages/hospital/Service/types';
import { fetchProfileInfoAction } from '../redux/actions/profileActions';
import Loader from '../components/Loader';
import SelectField from '../components/general/SelectField';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getServiceGeneralService } from '../services/agenda';
import { isArray, isObject } from 'lodash';
import { DocumentStatus } from '../pages/hospital/Billing/types';
import { ColourChip } from '../components/general/mini_components-ts';
import { documentStatusToColor } from '../utils/bill';

export interface SnackbarType{
    show: boolean;
    message?: string | undefined;
    severity?: Color | undefined;
    
}

export function useSnackBarState(){
    const [showSnackbar, setShowSnackbar] = useState<SnackbarType>({show : false});

    function handleCloseSnackbar(){
        setShowSnackbar({show:false});
    }

    return [showSnackbar, setShowSnackbar, handleCloseSnackbar] as const;
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
            if(!profile && !loadingProfile){
                dispatch(fetchProfileInfoAction(investigations.currentInvestigation.uuid));
            }
        }
    }, [ investigations]);

    return { profile, loadingProfile }
}


export function useAgendas(){
    const investigations= useSelector((state:any) => state.investigations);
    const agendas = useSelector((state:{hospital : {data: {agendas : IAgenda[]}}}) => state.hospital.data.agendas ? state.hospital.data.agendas : null);
    const loadingAgendas = useSelector((state:any) => state.hospital.loading || state.investigations.loading);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        async function getAgendas(uuidInvestigation:string){
            await dispatch(
                getAgendasInvestigationAction(uuidInvestigation)
            ); 
        }
        if(investigations.data && investigations.currentInvestigation && !agendas){
            getAgendas(investigations.currentInvestigation.uuid)
        }
    }, [investigations])

    return { agendas, loadingAgendas}
}

export function useServiceGeneral(serviceType:number){
    const [servicesGeneral, setServicesGeneral] = useState<null | IService[]>(null);
    const [loadingServicesGeneral, setLoadingServicesGeneral] = useState(false);
    useEffect(() => {
        
            if (!servicesGeneral) {
                setLoadingServicesGeneral(true);
                getServiceGeneralService(2)
                    .then(response => {
                        setServicesGeneral(response.services);
                        setLoadingServicesGeneral(true);
                    })
                    .catch(err => {
                        setLoadingServicesGeneral(true);
                    })
            } 
    }, []);

    return { servicesGeneral, loadingServicesGeneral }
}

export function useDepartments(researchersDepartmentsOnly:boolean = false){
    const investigations= useSelector((state:any) => state.investigations);
    const departments = useSelector((state:{hospital : {data: {departments : IDepartment[]}}}) => state.hospital.data.departments ? state.hospital.data.departments : null);
    const researchers = useSelector((state:any) => state.hospital.data.researchers ? state.hospital.data.researchers : []);
    const loadingDepartments = useSelector((state:any) => state.hospital.loading || state.investigations.loading);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function getDepartments(uuidInvestigation:string){
            await dispatch(
                getDepartmentsInvestigationAction(uuidInvestigation)
            ); 
        }
        if(investigations.data && investigations.currentInvestigation && departments === null){
            getDepartments(investigations.currentInvestigation.uuid)
        }
    }, [investigations])

    let filteredDepartments = departments;
    if(researchersDepartmentsOnly){
        
        const currentResearcherUuid = getCurrentResearcherUuid();
        const currentResearcher = researchers.find((researcher:any) => researcher.uuid === currentResearcherUuid);
        if(currentResearcher){
            console.log(currentResearcher.units);
            const tempDepartments:{[uuidDepartment :string]: IDepartment} = {};
            currentResearcher.units.forEach((unit:IUnit) => {
                tempDepartments[unit.department.uuid as string] = unit.department;
            })
            filteredDepartments = Object.values(tempDepartments);
        }
        
    }

    return { departments: filteredDepartments, researchers, investigations, loadingDepartments}
}

export function useRequest(idRequest:number){
    const investigations= useSelector((state:any) => state.investigations);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [request, setRequest] = useState<IRequest | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRequest = async () => {
            setLoadingRequest(true);
            
            const response = await axios(`${import.meta.env.VITE_APP_API_URL}/hospital/${investigations.currentInvestigation.uuid}/request/${idRequest}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function usePrevious(value:any, withInitial?:boolean){
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    if(ref.current === undefined && withInitial){
        if(isArray(value)){
            return [...value];
        }
        else if(isObject(value)){
            return {...value};
        }
        return value;
        
    }
    return ref.current as any;
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

export function useUnitSelector(units:IUnit[]){
    const [unitSelected, setUnitSelected] = React.useState<string | null>(null);
    const [errorUnit, setErrorUnit] = React.useState(false);

    useEffect(() => {
        if(units.length === 1){
            setUnitSelected(units[0].uuid as string);
        }
    }, [units])

    function markAsErrorUnit(){
        setErrorUnit(true);
    }

    function renderUnitSelector(){
        if(units.length === 1){
            return null;
        }
        else{
            const optionsArray = units.map((unit) => {
                return <MenuItem value={unit.uuid}>{unit.department.name} - {unit.name}</MenuItem>
            })
            return(
                <Grid item xs={12} style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                    <FormControl variant="outlined"  style={{minWidth: 220}} error={errorUnit} >
                    <InputLabel id="unit"><Translate id="pages.hospital.pharmacy.request.select_unit" /></InputLabel>
                        <Select 
                            labelId="unit"
                            id="unit"
                            label="unit"
                            value={unitSelected}
                            onChange={(event) => {
                                setErrorUnit(false);
                                setUnitSelected(event.target.value as string)}}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            )
        }
        
    }
    return {unitSelected, renderUnitSelector, markAsErrorUnit}
}

export function useStatusDocument(status:DocumentStatus, editable:boolean = true){
    const [statusDocument, setStatusDocument] = React.useState<DocumentStatus>(status);

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusDocument(Number((event.target as HTMLInputElement).value));
    };

    let renderStatusDocument = null;
    if(status === DocumentStatus.CLOSED && !editable){
        renderStatusDocument = <><Typography variant="body2" component='span' fontWeight='bold'><Translate id="hospital.billing.bill.status" /> : </Typography><ColourChip rgbcolor={documentStatusToColor(DocumentStatus.CLOSED)} label={<Translate id="hospital.billing.bill.closed" />}/></>
    }
    else{
        renderStatusDocument =  (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                    <Typography variant="body2" component='span' fontWeight='bold'><Translate id="hospital.billing.bill.status" /></Typography></FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={statusDocument}
                onChange={handleChangeStatus}
              >
                <FormControlLabel value={DocumentStatus.DRAFT} control={<Radio />} label={<Typography variant="body2" component='span'><Translate id="hospital.billing.bill.draft" /></Typography>} />
                <FormControlLabel value={DocumentStatus.CLOSED} control={<Radio />} label={<Typography variant="body2" component='span' ><Translate id="hospital.billing.bill.closed" /></Typography>} />
              </RadioGroup>
            </FormControl>
          );
    }
    return {statusDocument, renderStatusDocument}
}
interface OptionSelector{
    label:string,
    value:string
}
function useSelectLogic(optionsSelector:OptionSelector[], canSelectNoOption:boolean = false, noReturnIfOnlyOne:boolean = false, defaultValue?:string){
    const [optionSelected, setOptionSelected] = React.useState<string | null>(defaultValue ? defaultValue : null);
    const [error, setError] = React.useState(false);
    const [options, setOptions] = React.useState<OptionSelector[] | null>(null);

    useEffect(() => {
        if(options === null){
            setOptions(optionsSelector);
        }
        if(optionsSelector && optionsSelector.length === 1){
            setOptionSelected(optionsSelector[0].value as string);
        }
    }, [optionsSelector])

    useEffect(() => {
        if(optionSelected === ""){
            setOptionSelected(null);
        }
    }, [optionSelected])

    function markAsErrorCallback(){
        setError(true);
    }

    function renderSelector(){
        if(!options){
            return <Loader />
        }
        if(options.length === 0){
            return null;
        }
        else if(options.length === 1){
            if(noReturnIfOnlyOne){
                return null;
            }
            return(
                <>
                    <Typography variant="h4" gutterBottom>Department:</Typography>
                    <Typography variant="h4" gutterBottom >{options[0].label}</Typography>
                </>
            )
            //return null;
        }
        else{
            let optionsArray = options.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>
            })
            if(canSelectNoOption){
                optionsArray = [<MenuItem value={"all"}><Translate id="hospital.departments.all_departments" /></MenuItem>, ...optionsArray]
            }
            return(
                <Grid item xs={12} style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                    <FormControl variant="outlined"  style={{minWidth: 220}} error={error} >
                    <InputLabel id="department"><Translate id="pages.hospital.pharmacy.request.select_department" /></InputLabel>
                        <Select 
                            labelId="department"
                            id="department"
                            label="department"
                            value={optionSelected}
                            onChange={(event) => {
                                setError(false);
                                setOptionSelected(event.target.value as string)}}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            )
        }
        
    }
    return { optionSelected, renderSelector, markAsErrorCallback}
}

export function useDeparmentsSelectorBis(selectNoDepartment:boolean = false, researchersDepartmentsOnly:boolean = false, noReturnIfOnlyOne:boolean = false, defaultValue?:string){
    const { departments } = useDepartments(researchersDepartmentsOnly);
    const departmentOptions = departments ? departments.map((department) => {
        return {
            label:department.name,
            value: department!.uuid as string
        }
    }) : [];
    const { optionSelected, renderSelector, markAsErrorCallback} = useSelectLogic(departmentOptions, selectNoDepartment, noReturnIfOnlyOne)
    
    return {departmentSelected:optionSelected, departments, 
            renderDepartmentSelector:renderSelector, 
            markAsErrorDepartmentCallback: markAsErrorCallback }
}

export function useDeparmentsSelector(selectNoDepartment:boolean = false, researchersDepartmentsOnly:boolean = false, noReturnIfOnlyOne:boolean = false, defaultValue?:string){
    const { departments } = useDepartments(researchersDepartmentsOnly);
    const [departmentSelected, setDepartmentSelected] = React.useState<string | null>(defaultValue ? defaultValue : null);
    const [errorDepartment, setErrorDepartment] = React.useState(false);

    useEffect(() => {
        if(departments && departments.length === 1){
            setDepartmentSelected(departments[0].uuid as string);
        }
    }, [departments])

    useEffect(() => {
        if(departmentSelected === ""){
            setDepartmentSelected(null);
        }
    }, [departmentSelected])

    function markAsErrorDepartmentCallback(){
        setErrorDepartment(true);
    }

    function renderDepartmentSelector(){
        if(!departments){
            return <Loader />
        }
        if(departments.length === 0){
            return null;
        }
        else if(departments.length === 1){
            if(noReturnIfOnlyOne){
                return null;
            }
            return(
                <>
                    <Typography variant="h4" gutterBottom>Department:</Typography>
                    <Typography variant="h4" gutterBottom >{departments[0].name}</Typography>
                </>
            )
            //return null;
        }
        else{
            let optionsArray = departments.map((department) => {
                return <MenuItem value={department.uuid}>{department.name}</MenuItem>
            })
            if(selectNoDepartment){
                optionsArray = [<MenuItem value={"all"}><Translate id="hospital.departments.all_departments" /></MenuItem>, ...optionsArray]
            }
            return(
                <Grid item xs={12} style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                    <FormControl variant="outlined"  style={{minWidth: 220}} error={errorDepartment} >
                    <InputLabel id="department"><Translate id="pages.hospital.pharmacy.request.select_department" /></InputLabel>
                        <Select 
                            labelId="department"
                            id="department"
                            label="department"
                            value={departmentSelected}
                            onChange={(event) => {
                                setErrorDepartment(false);
                                setDepartmentSelected(event.target.value as string)}}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            )
        }
        
    }
    return { departmentSelected, renderDepartmentSelector, markAsErrorDepartmentCallback, departments}
}

export function useResearchersSelector(selectNoDepartment:boolean = false, researchersFromDepartmentsOnly:string = false, noReturnIfOnlyOne:boolean = false, defaultValue?:string){
    const { departments } = useDepartments(researchersDepartmentsOnly);
    const [departmentSelected, setDepartmentSelected] = React.useState<string | null>(defaultValue ? defaultValue : null);
    const [errorDepartment, setErrorDepartment] = React.useState(false);

    useEffect(() => {
        if(departments && departments.length === 1){
            setDepartmentSelected(departments[0].uuid as string);
        }
    }, [departments])

    useEffect(() => {
        if(departmentSelected === ""){
            setDepartmentSelected(null);
        }
    }, [departmentSelected])

    function markAsErrorDepartmentCallback(){
        setErrorDepartment(true);
    }

    function renderDepartmentSelector(){
        if(!departments){
            return <Loader />
        }
        if(departments.length === 0){
            return null;
        }
        else if(departments.length === 1){
            if(noReturnIfOnlyOne){
                return null;
            }
            return(
                <>
                    <Typography variant="h4" gutterBottom>Department:</Typography>
                    <Typography variant="h4" gutterBottom >{departments[0].name}</Typography>
                </>
            )
            //return null;
        }
        else{
            let optionsArray = departments.map((department) => {
                return <MenuItem value={department.uuid}>{department.name}</MenuItem>
            })
            if(selectNoDepartment){
                optionsArray = [<MenuItem value={"all"}><Translate id="hospital.departments.all_departments" /></MenuItem>, ...optionsArray]
            }
            return(
                <Grid item xs={12} style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                    <FormControl variant="outlined"  style={{minWidth: 220}} error={errorDepartment} >
                    <InputLabel id="department"><Translate id="pages.hospital.pharmacy.request.select_department" /></InputLabel>
                        <Select 
                            labelId="department"
                            id="department"
                            label="department"
                            value={departmentSelected}
                            onChange={(event) => {
                                setErrorDepartment(false);
                                setDepartmentSelected(event.target.value as string)}}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            )
        }
        
    }
    return { departmentSelected, renderDepartmentSelector, markAsErrorDepartmentCallback, departments}
}