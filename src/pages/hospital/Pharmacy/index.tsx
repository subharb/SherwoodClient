import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { PHARMACY_CENTRAL_PERMISSIONS } from '../../../constants';
import { PERMISSION } from '../../../constants/types';
import { useDepartments, useSnackBarState } from '../../../hooks';
import { makePharmacyRequestAction } from '../../../redux/actions/requestsActions';
import { HOSPITAL_PHARMACY_REQUEST } from '../../../routes';
import SectionHeader from '../../components/SectionHeader';
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

    function navigateToRequest(){
        if(showSnackbar.severity === "success"){
            const lastRequest = requests.data.requests[requests.data.requests.length - 1];
            const nextUrl = HOSPITAL_PHARMACY_REQUEST.replace(":idRequest", lastRequest.id)   
            history.push(nextUrl);
        }
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
        const canViewPharmacyCentral = investigations.currentInvestigation.permissions.filter((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value)) > 0;
        if(canViewPharmacyCentral && pharmacyItems){
            return <Inventory uuidInvestigation={investigations.currentInvestigation.uuid} pharmacyItemsInit={pharmacyItems}
                        typePharmacy={PharmacyType.CENTRAL} idPharmacy={investigations.currentInvestigation.pharmacy.id}
                         />
        }
        else if(departments && pharmacyItems){
            return(
                <RequestForm uuidInvestigation={investigations.currentInvestigation.uuid} 
                    departments={departments} pharmacyItemsInit={pharmacyItems} makePharmacyRequestCallback={(request) => makePharmacyRequest(request)}/>
            )
        } 
    }

    if(!investigations.currentInvestigation || !departments || pharmacyItems === null || requests.loading){ 
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

