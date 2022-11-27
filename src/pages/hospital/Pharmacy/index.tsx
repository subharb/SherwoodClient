import axios from 'axios';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { PHARMACY_CENTRAL_PERMISSIONS } from '../../../constants';
import { PERMISSION } from '../../../constants/types';
import { useDepartments } from '../../../hooks';
import { makePharmacyRequestAction } from '../../../redux/actions/requestsActions';
import Inventory from './Inventory';
import RequestForm from './RequestForm';
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
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[] | null>(null);
    const requests = useSelector((state:any) => state.requests);
    const dispatch = useDispatch();

    const uuidInvestigation = investigations.currentInvestigation.uuid;
    const idPharmacy = investigations.currentInvestigation.pharmacy.id;
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/items", { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    setPharmacyItems(response.data.pharmacyItems);

                }
            })
            .catch(err => { console.log('Catch', err); setPharmacyItems([]); });
    }, []);

    async function makePharmacyRequest(request:IPharmacyRequest){
        await dispatch(
            makePharmacyRequestAction(uuidInvestigation, idPharmacy, request)
        ); 
    }

    if(!investigations.currentInvestigation || !departments || pharmacyItems === null || requests.loading){ 
        return <Loader />
    }
    const canViewPharmacyCentral = investigations.currentInvestigation.permissions.filter((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value)) > 0;
    if(canViewPharmacyCentral){
        return <Inventory uuidInvestigation={investigations.currentInvestigation.uuid} pharmacyItemsInit={pharmacyItems}
                    typePharmacy={PharmacyType.CENTRAL} idPharmacy={investigations.currentInvestigation.pharmacy.id}
                     />
    }
    return (
        <>
            <RequestForm uuidInvestigation={investigations.currentInvestigation.uuid} 
                departments={departments} pharmacyItemsInit={pharmacyItems} makePharmacyRequestCallback={(request) => makePharmacyRequest(request)}/>
        </>
    );
};

const mapStateToProps = (state:any) =>{
    return {
        investigations:state.investigations
    }
}


export default connect(mapStateToProps, null)(PharmacyHome)

