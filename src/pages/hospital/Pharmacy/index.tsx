import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { PHARMACY_CENTRAL_PERMISSIONS } from '../../../constants';
import { IUnit, PERMISSION } from '../../../constants/types';
import { useDepartments, useProfileInfo, useSnackBarState } from '../../../hooks';
import { makePharmacyRequestAction } from '../../../redux/actions/requestsActions';
import { HOSPITAL_PHARMACY_REQUEST } from '../../../routes';
import { getDepartmentFromUnit, getUnitsResearcher } from '../../../utils';
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

    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [edit, setEdit] = useState(false);
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[] | null>(null);
    const history = useHistory();
    const parameters = useParams();
    const idRequest = parameters.idRequest;
    const requests = useSelector((state:any) => state.requests);
    const dispatch = useDispatch();

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
        let goTorequest;
        if(showSnackbar.severity === "success" && !request){
            goTorequest = requests.data.requests[requests.data.requests.length - 1];
            
        }
        else if(request){
            goTorequest = request;
        }
        const nextUrl = HOSPITAL_PHARMACY_REQUEST.replace(":idRequest", goTorequest.id)   
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
        setEdit(!edit);
    }
   
    function renderCore(){
        if(idRequest){
            return <RequestSingle idRequest={idRequest}  />
        }
        const canViewPharmacyCentral = investigations.currentInvestigation.permissions.some((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value)) > 0;
        if(canViewPharmacyCentral && pharmacyItems){
            return <RequestTablePharmacy serviceType={2} uuidInvestigation={uuidInvestigation} callBackRequestSelected={(request:IRequest) => navigateToRequest(request)}/>
            return <Inventory uuidInvestigation={investigations.currentInvestigation.uuid} pharmacyItemsInit={pharmacyItems}
                        typePharmacy={PharmacyType.CENTRAL} idPharmacy={investigations.currentInvestigation.pharmacy.id}
                         />
        }
        else if(departments && pharmacyItems){
            const units = getUnitsResearcher(profile.uuid, researchers);
            
            const departmentsResearcher = units.map((unit:IUnit) => {
                return getDepartmentFromUnit(unit.uuid, departments);
            })
            return(
                <RequestForm uuidInvestigation={investigations.currentInvestigation.uuid} 
                    departments={departmentsResearcher} pharmacyItemsInit={pharmacyItems} makePharmacyRequestCallback={(request) => makePharmacyRequest(request)}/>
            )
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
                onClose={navigateToRequest}>
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
                <SectionHeader section="pharmacy" edit={edit} editCallback={toogleEditLab} />
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

