import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { PHARMACY_CENTRAL_PERMISSIONS } from '../../../constants';
import { PERMISSION } from '../../../constants/types';
import Inventory from './Inventory';

interface PharmacyHomeProps {
    investigations:any
}

export enum PharmacyType{
    CENTRAL = 0,
    LOCAL = 1
}

const PharmacyHome: React.FC<PharmacyHomeProps> = ({ investigations }) => {
    if(!investigations.currentInvestigation){
        return <Loader />
    }
    if(investigations.currentInvestigation.permissions.filter((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value))){
        return <Inventory uuidInvestigation={investigations.currentInvestigation.uuid} 
                    typePharmacy={PharmacyType.CENTRAL} idPharmacy={investigations.currentInvestigation.pharmacy.id}
                     />
    }
    return (
        <>
            {
                investigations.currentInvestigation.permissions.map((perm:string) =>{
                    return <div>{perm}</div>
                })
            }
        </>
    );
};

const mapStateToProps = (state:any) =>{
    return {
        investigations:state.investigations
    }
}


export default connect(mapStateToProps, null)(PharmacyHome)

