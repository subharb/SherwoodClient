import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { PERMISSION, PHARMACY_CENTRAL_PERMISSIONS, PHARMACY_RELATED_PERMISSIONS } from '../../../components/investigation/share/user_roles';
import Loader from '../../../components/Loader';

import { IDepartment, IUnit } from '../../../constants/types';
import { useDepartments, useProfileInfo, useSnackBarState } from '../../../hooks';
import { makePharmacyRequestAction, updatePharmacyRequestAction } from '../../../redux/actions/requestsActions';
import { HOSPITAL_PHARMACY_CENTRAL_ROUTE, HOSPITAL_PHARMACY_REQUEST, HOSPITAL_PHARMACY_REQUEST_INVENTORY, HOSPITAL_PHARMACY_REQUEST_NEW } from '../../../routes';
import { getDepartmentFromUnit, getUnitsResearcher } from '../../../utils/index.jsx';
import SectionHeader from '../../components/SectionHeader';
import RequestTable, { RequestTablePharmacy } from '../Service/RequestTable';
import { IRequest } from '../Service/types';
import Inventory from './Inventory';
import RequestForm from './RequestForm';
import RequestSingle from './RequestSingle';
import { IPharmacyItem, IPharmacyRequest } from './types';

interface PharmacyHomeProps {
    investigations:any
}

export enum PharmacyType{
    CENTRAL = 0,
    LOCAL = 1
}

const PharmacyHome: React.FC<PharmacyHomeProps> = ({ investigations }) => {
    const {departments, researchers} = useDepartments();
    const { profile, loadingProfile } = useProfileInfo();
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [showAddPharmacyItem, setShowAddPharmacyItem] = useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [edit, setEdit] = useState(false);
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[] | null>(null);
    const history = useHistory();
    const parameters:{[key:string] : string} = useParams();
    const idRequest = parseInt(parameters.idRequest);
    const location = useLocation();
    const requests = useSelector((state:any) => state.requests);
    const dispatch = useDispatch();

    const canViewPharmacyCentral = investigations.currentInvestigation ? investigations.currentInvestigation.permissions.some((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value)) : false;
    const canMakeRequests = investigations.currentInvestigation ? investigations.currentInvestigation.permissions.some((value:PERMISSION) => PERMISSION.MAKE_PHARMACY_REQUESTS === value) : false;
    const uuidInvestigation = investigations.currentInvestigation ? investigations.currentInvestigation.uuid : null;
    const idPharmacy = investigations.currentInvestigation ? investigations.currentInvestigation.pharmacy.id : null;
    useEffect(() => {
        if(uuidInvestigation && idPharmacy ){
            axios.get(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/items", { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    setPharmacyItems(response.data.pharmacyItems);

                }
            })
            .catch(err => { console.log('Catch', err); setPharmacyItems([]); });
        }
    }, [investigations.currentInvestigation]);

    useEffect(() => {

    }, [requests]);

    function navigateToRequest(request?:IRequest){
        let nextUrl;
        if(!idRequest){
            let goTorequest;
            if(showSnackbar.severity === "success" && !request){
                goTorequest = requests.data.requests[requests.data.requests.length - 1];
                
            }
            else if(request){
                goTorequest = request;
            }
            nextUrl = HOSPITAL_PHARMACY_REQUEST.replace(":idRequest", goTorequest.id);      
        }
        else{
            nextUrl = HOSPITAL_PHARMACY_CENTRAL_ROUTE;
            
        }
        
        history.push(nextUrl);

        setShowSnackbar({show:false});
    }

    async function makePharmacyRequest(request:IPharmacyRequest){
        await dispatch(
            makePharmacyRequestAction(uuidInvestigation, idPharmacy, request)
        ); 
        if(requests.error === null){
            setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
        }
        else{
            setShowSnackbar({show:true, message:"pages.hospital.pharmacy.error", severity:"error"});
        }
    }

    function toogleEditLab(){
        history.push(HOSPITAL_PHARMACY_REQUEST_INVENTORY)
    }
    
    async function saveRequest(request:IRequest, approved:boolean){
        console.log(request);
        await dispatch(
            updatePharmacyRequestAction(uuidInvestigation, idPharmacy, request, approved)
        );
        if(requests.error === null){
            setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
        }
        else{
            setShowSnackbar({show:true, message:"pages.hospital.pharmacy.error", severity:"error"});
        }
    }
    
    function navigateToAddRequest(){
        setShowRequestForm(true);
        history.push(HOSPITAL_PHARMACY_REQUEST_NEW);
    }

    function addCallback(){
        if(location.pathname === HOSPITAL_PHARMACY_REQUEST_INVENTORY){
            setShowAddPharmacyItem(true);
        }
        else{
            return canMakeRequests ? navigateToAddRequest() : undefined
        }
    }

    function renderCore(){
        if(canViewPharmacyCentral && pharmacyItems){
            if(location.pathname === HOSPITAL_PHARMACY_REQUEST_INVENTORY){
                return <Inventory uuidInvestigation={investigations.currentInvestigation.uuid} pharmacyItemsInit={pharmacyItems}
                            showAddPharmacyItem={showAddPharmacyItem} setShowAddPharmacyItem={setShowAddPharmacyItem}
                            typePharmacy={PharmacyType.CENTRAL} idPharmacy={investigations.currentInvestigation.pharmacy.id}
                            />
            }
            else if(location.pathname === HOSPITAL_PHARMACY_CENTRAL_ROUTE){
                return <RequestTablePharmacy serviceType={2} uuidInvestigation={uuidInvestigation} callBackRequestSelected={(request:IRequest) => navigateToRequest(request)}/>
            }
        }
        if(!isNaN(idRequest) && pharmacyItems){
            const pharmacyPermissions:PERMISSION[] = investigations.currentInvestigation.permissions.filter((permission:PERMISSION) => PHARMACY_RELATED_PERMISSIONS.includes(permission));
            return <RequestSingle pharmacyItems={pharmacyItems} userPermissions={pharmacyPermissions} 
                    idRequest={idRequest} saveRequestCallback={saveRequest} />
        }
        else if(departments && pharmacyItems){
            const units = getUnitsResearcher(profile.uuid, researchers);
            
            const departmentsResearcher:{[key:string]:IDepartment} = {};
            units.forEach((unit:IUnit) => {
                const department = unit.department as IDepartment;
                departmentsResearcher[department.uuid as string] = department;
            })

            if(location.pathname === HOSPITAL_PHARMACY_REQUEST_NEW){
                return(
                    <RequestForm uuidInvestigation={investigations.currentInvestigation.uuid} 
                        units={units} pharmacyItemsInit={pharmacyItems} makePharmacyRequestCallback={(request) => makePharmacyRequest(request)}/>
                )
            }
            else{
                return <RequestTablePharmacy serviceType={2} uuidInvestigation={uuidInvestigation} 
                            callBackRequestSelected={(request:IRequest) => navigateToRequest(request)}/>
            }
            
        } 
    }

    if(!investigations.currentInvestigation || !departments || pharmacyItems === null || requests.loading || loadingProfile){ 
        return <Loader />
    }
    return (
        <>  
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={4000}
                onClose={() => navigateToRequest()}>
                    <div>
                    {
                        showSnackbar.message && 
                        <>
                        {
                            (showSnackbar.message && showSnackbar.severity) &&
                            <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                        </>
                    }
                    </div>
                </Snackbar>
                <React.Fragment>
            <Grid container spacing={6} >
                <SectionHeader section="pharmacy" edit={edit} editCallback={canViewPharmacyCentral ? toogleEditLab : undefined} 
                    addCallback={addCallback} />
                <Grid item xs={12}>
                    {
                        renderCore()
                    }     
                </Grid>         
            </Grid>
        </React.Fragment>
            
        </>
    );
};

const mapStateToProps = (state:any) =>{
    return {
        investigations:state.investigations
    }
}


export default connect(mapStateToProps, null)(PharmacyHome)

