import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import DateFnsUtils from "@date-io/date-fns";
import { useHistory, useLocation } from "react-router-dom";
import { fetchUser } from "../services/authService";
import { areArraysEqual, getCurrentResearcherUuid, researcherFullName } from '../utils/index.jsx';
import { SIGN_IN_ROUTE } from '../routes/urls';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { Translate } from 'react-localize-redux';
import { FieldWrapper } from '../components/general/mini_components';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendasInvestigationAction, getDepartmentsInvestigationAction } from '../redux/actions/hospitalActions';
import { Color } from '@mui/lab';
import { IAgenda, IDepartment, IInsurance, IResearcher, IUnit } from '../constants/types';
import { INITIAL_SELECT } from '../components/general/SmartFields';
import { IRequest, IService } from '../pages/hospital/Service/types';
import { fetchProfileInfoAction } from '../redux/actions/profileActions';
import Loader from '../components/Loader';
import SelectField from '../components/general/SelectField';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getServiceGeneralService } from '../services/agenda';
import { isArray, isObject, set } from 'lodash';
import { DocumentStatus } from '../pages/hospital/Billing/types';
import { ColourChip } from '../components/general/mini_components-ts';
import { documentStatusToColor } from '../utils/bill';
import { getInsurancesAction } from '../redux/actions/insuranceActions';
import { fetchSingleSubmissionsPatientInvestigationAction, fetchSubmissionsPatientInvestigationAction } from '../redux/actions/submissionsPatientActions';

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

export function usePatientSubmission(idSubmission:number, uuidPatient:string){
    const investigations = useSelector((state:any) => state.investigations);
    const submissions = useSelector((state:any) => state.patientsSubmissions.data);
    const loadingSubmissions = useSelector((state:any) => state.patientsSubmissions.loading);
    const [submission, setSubmission] = useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getSubmission() {
            await dispatch(
                fetchSingleSubmissionsPatientInvestigationAction(investigations.currentInvestigation.uuid, idSubmission, uuidPatient)
            );
        }
        if(investigations.data && investigations.currentInvestigation && idSubmission && !submission){
            const foundSubmission = findSubmission(idSubmission);
            if(foundSubmission === undefined){
                getSubmission();   
            }
            else{
                setSubmission(foundSubmission);
            }
        }    
    }, [idSubmission, submission]);   
    
    function findSubmission(idSubmission:number){
        if(submissions && idSubmission){
            const findSubmission = Object.values(submissions[uuidPatient]).flatMap((submissionsSurvey:any) => {
                return submissionsSurvey.submissions;
            }).find((subi:any) => subi.id === idSubmission);
        
            return findSubmission;
        }
    }

    useEffect(() => {
        const foundSubmission = findSubmission(idSubmission);
        if(foundSubmission !== undefined){
            setSubmission(foundSubmission);
        }
    }, [submissions])

    return [submission, loadingSubmissions];
}

export function useInsurances(patientInsuranceId:number){
    const investigations= useSelector((state:any) => state.investigations);
    const insurances = useSelector((state:{insurances : {data: IInsurance[]}}) => state.insurances.data ? state.insurances.data : null);
    const loadingInsurances = useSelector((state:any) => state.insurances.loading || state.investigations.loading);
    const [patientInsurance, setPatientInsurance] = useState<IInsurance | null>(null);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function getInsurances(uuidInvestigation:string){
            await dispatch(
                getInsurancesAction(uuidInvestigation)
            ); 
        }
        if(investigations.data && investigations.currentInvestigation && insurances === null){
            getInsurances(investigations.currentInvestigation.uuid)
        }
    }, [investigations])

    useEffect(() => {
        if(insurances && patientInsuranceId !== null){
            const insurance = insurances.find((insurance) => insurance.id === patientInsuranceId);
            if(insurance){
                setPatientInsurance(insurance)
            }
        }
    }, [insurances])

    return [insurances, loadingInsurances, patientInsurance ]
}

export function useDepartments(researchersDepartmentsOnly:string = ""){
    const investigations= useSelector((state:any) => state.investigations);
    const departments:IDepartment[] | null = useSelector((state:{hospital : {data: {departments : IDepartment[]}}}) => state.hospital.data.departments ? state.hospital.data.departments : null);
    const researchers:IResearcher[] = useSelector((state:any) => state.hospital.data.researchers ? state.hospital.data.researchers : []);
    const loadingDepartments:boolean = useSelector((state:any) => state.hospital.loading || state.investigations.loading);
    const [filteredDepartments, setFilteredDepartments] = useState<IDepartment[]>([]);

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

    useEffect(() => {
        if(departments !== null){
            let tempFiltered = [...departments];
            console.log("Departments", departments);
            if(researchersDepartmentsOnly !== ""){
            
                const currentResearcher = researchers.find((researcher:any) => researcher.uuid === researchersDepartmentsOnly);
                if(currentResearcher){
                    console.log(currentResearcher.units);
                    const tempDepartments:{[uuidDepartment :string]: IDepartment} = {};
                    currentResearcher.units.forEach((unit:IUnit) => {
                        tempDepartments[unit.department.uuid as string] = unit.department;
                    })
                    tempFiltered = Object.values(tempDepartments);
                }
                
            }
            console.log("Departments", tempFiltered);
            setFilteredDepartments(tempFiltered);
        }
    }, [researchersDepartmentsOnly, departments])

    return { departments: filteredDepartments, researchers, investigations, loadingDepartments}
}

export function useRequest(idRequest:number){
    const investigations = useSelector((state:any) => state.investigations);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [request, setRequest] = useState<IRequest | null>(null);

    useEffect(() => {
        const fetchRequest = async () => {
            setLoadingRequest(true);
            
            const response = await axios(`${import.meta.env.VITE_APP_API_URL}/hospital/${investigations.currentInvestigation.uuid}/request/${idRequest}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {
                        console.log('Catch', err); 
                        return err;
                    });
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

    function renderStatusDocument(){
        let renderStatusDocument = null;
        if(status === DocumentStatus.CLOSED){
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
        return renderStatusDocument;
    }
    
    return {statusDocument, renderStatusDocument}
}
interface OptionSelector{
    label:string,
    value:string
}
function useSelectLogic(optionsSelector:OptionSelector[], key:string, defaultValue?:string, canSelectNoOption:boolean = false, noReturnIfOnlyOne:boolean = false){
    const [optionSelected, setOptionSelected] = React.useState<string | null>(defaultValue ? defaultValue : "");
    const [error, setError] = React.useState(false);
    const [options, setOptions] = React.useState<OptionSelector[] | null>(null);

    useEffect(() => {
        if(options === null || !areArraysEqual(options, optionsSelector)){
            setOptions(optionsSelector);
        }
        
        if(optionsSelector && optionsSelector.length === 1){
            setOptionSelected(optionsSelector[0].value as string);
        }
    }, [optionsSelector])

    useEffect(() => {
        if(defaultValue && defaultValue !== ""){
            setOptionSelected(defaultValue);
        }
    }, [defaultValue])

    function markAsErrorCallback(){
        setError(true);
    }

    function renderSelector(){
        if(!options){
            return <Loader />
        }
        if(options.length === 0){
            if(canSelectNoOption){
                return null;
            }
            return <Typography variant="h4" gutterBottom><Translate id={`general.use_selector.missing_option.${key}`} /></Typography>
            
        }
        else if(options.length === 1){
            if(noReturnIfOnlyOne){
                return null;
            }
            return(
                <>
                    <Typography variant="h4" gutterBottom><Translate id={`general.use_selector.label.${key}`} />:</Typography>
                    <Typography variant="h4" gutterBottom >{options[0].label}</Typography>
                </>
            )
            //return null;
        }
        else{
            let optionsArray = options.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>
            })
            console.log(key)
            console.log("optionsArray", optionsArray);
            if(canSelectNoOption){
                optionsArray = [<MenuItem value={"all"}><Translate id={`general.use_selector.all.${key}`} /></MenuItem>, ...optionsArray]
            }
            return(
                <Grid item xs={12} style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                    <FormControl variant="outlined"  style={{minWidth: 220}} error={error} >
                    <InputLabel id={key}><Translate id={`general.use_selector.select.${key}`} /></InputLabel>
                        <Select 
                            labelId={key}
                            id={key}
                            label={key}
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

export function useDeparmentsSelectorBis(defaultValue?:string, selectNoDepartment:boolean = false, uuidResearcher:string = "", noReturnIfOnlyOne:boolean = false){
    const { departments, loadingDepartments } = useDepartments(uuidResearcher);
    const [departmentSelected, setDepartmentSelected] = useState<IDepartment | null>(null);

    console.log("uuidresearcher", uuidResearcher);
    console.log("Departments", departments);
    const departmentOptions = useMemo(() => {
        return departments ? departments.map((department) => {
            return {
                label:department.name,
                value: department!.uuid as string
            }
        }) : [];
    }, [departments]);

    const { optionSelected, renderSelector, markAsErrorCallback} = useSelectLogic(departmentOptions, "department", defaultValue, selectNoDepartment, noReturnIfOnlyOne)

    useEffect(() =>{
        if(optionSelected){
            const findDepartment = departments?.find((department) => department.uuid === optionSelected);
            if(findDepartment){
                setDepartmentSelected(findDepartment);
            }
        }
        
    }, [optionSelected, departments])
    
    return {uuidDepartmentSelected:optionSelected, departments, departmentSelected, loadingDepartments,
            renderDepartmentSelector:renderSelector, 
            markAsErrorDepartmentCallback: markAsErrorCallback }
}

export function useDeparmentsSelector(selectNoDepartment:boolean = false, researchersDepartmentsOnly:string = "", noReturnIfOnlyOne:boolean = false, defaultValue?:string){
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

export function useResearchersSelector(defaultValue?:string, selectNoDepartment:boolean = false, noReturnIfOnlyOne:boolean = false){
    const { researchers, loadingDepartments } = useDepartments();
    const [researcherSelected, setResearcherSelected] = useState<IResearcher | null>(null);

    const researcherOptions = researchers ? researchers.map((researcher) => {
        return {
            label:researcherFullName(researcher),
            value: researcher!.uuid as string
        }
    }) : [];
    const { optionSelected, renderSelector, markAsErrorCallback} = useSelectLogic(researcherOptions, "researcher", defaultValue, selectNoDepartment, noReturnIfOnlyOne)
    
    useEffect(() =>{
        if(optionSelected){
            const findResearcher = researchers?.find((researcher) => researcher.uuid === optionSelected);
            if(findResearcher){
                setResearcherSelected(findResearcher);
            }
        }
        
    }, [optionSelected, researchers])
    
    return {uuidResearcherSelected:optionSelected, researcherSelected, researchers, loadingResearchers:loadingDepartments,
            renderResearcherSelector:renderSelector, 
            markAsErrorReseacherCallback: markAsErrorCallback }
}

export function useResearcherDepartmentSelector(defaultValueResearcher?:string, defaultValueDepartment?:string){
    
    const { researchers, loadingResearchers, renderResearcherSelector, uuidResearcherSelected, researcherSelected, markAsErrorReseacherCallback  } = useResearchersSelector(defaultValueResearcher);
    const { departments, loadingDepartments, renderDepartmentSelector, uuidDepartmentSelected, departmentSelected, markAsErrorDepartmentCallback } = useDeparmentsSelectorBis(defaultValueDepartment, false, uuidResearcherSelected ? uuidResearcherSelected : "", false);
    console.log(departments);
    function renderResearcherDepartmentSelector(){
        let selects = [renderResearcherSelector()];
        if(researcherSelected){
            selects = [...selects, renderDepartmentSelector()]
        }

        return selects;
    }
    return {researchers, renderResearcherDepartmentSelector, uuidResearcherSelected,
            departments,
            loadingResearcherOrDepartments:(loadingDepartments || loadingResearchers), 
            researcherSelected, uuidDepartmentSelected, departmentSelected,  
            markAsErrorReseacherCallback, markAsErrorDepartmentCallback}
}

