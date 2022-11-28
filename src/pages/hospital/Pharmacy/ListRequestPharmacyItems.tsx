import { TextField } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import Edit from '@material-ui/icons/Edit';
import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonCheck2 } from '../../../components/general/mini_components';
import { PERMISSION } from '../../../constants/types';
import { RequestStatusToChip } from '../Service/RequestTable';
import { IRequestPharmacy, RequestStatus } from '../Service/types';
import { PHARMACY_ITEM_REQUEST_COLUMNS } from './RequestForm';
import { RequestAction } from './RequestSingle';
import { RequestPharmacyItem } from './types';


const SpanAmountApproved = styled.span<{approved:boolean}>`
    color: ${props => props.approved ? 'green' : 'red'};
    font-weight: bold;
`;

const ButtonAction = styled.button`
    background:transparent;
    border:none;
`;

interface ListPharmacyItemsProps {
    requestsPharmacy:IRequestPharmacy[],
    statusRequest:RequestStatus,
    userPermissions:PERMISSION[], 
    action:RequestAction
}

interface IRequestPharmacyState extends IRequestPharmacy{
    edit:boolean, 
    error:boolean,
    approved:boolean,
}



const ListPharmacyItems: React.FC<ListPharmacyItemsProps> = ({ action, userPermissions, statusRequest, requestsPharmacy }) => {
    const [requestsPharmacyState, setRequestsPharmacyState] = React.useState<IRequestPharmacyState[]>(requestsPharmacy.map((req) => {
        return {...req, amountApproved:req.amountRequested, edit:false, error:false, approved:false}
    }));


    const columns = ["nameDrug", "status", "amountRequested", "amountApproved", "actions"];
    
    if(action === RequestAction.MAKE){
        columns.splice(2, 1);
        columns.splice(5, 1);
    }
    let  headCells = columns.map((col) => {
        return { id: col, alignment: "left", label: <Translate id={`pages.hospital.pharmacy.request.table.${col}`} />}
    }) 
    const rows = requestsPharmacyState.map((item) => {
        return {
            id: item.id,
            nameDrug: item.pharmacyItem.name,
            status: <RequestStatusToChip status={item.status} />,
            amountRequested: item.amountRequested,
            amountApproved: item.edit ? <TextField label="Amount" variant="outlined" 
                    helperText={""}
                    error={item.error} type="text" 
                    onChange={(event) => changeField(event.target.value, item.id)} /> 
             : <SpanAmountApproved approved={item.approved}>{item.amountApproved}</SpanAmountApproved>,
            actions:  item.edit ? <ButtonCheck2 onClick={() => approveAmount(item.id)} checked={item.approved} />: <><ButtonCheck2 checked={item.approved} onClick={() => approveAmount(item.id)}/><ButtonAction onClick={() => editAmount(item.id)}><Edit  /></ButtonAction></>
        }
    });

    function changeField(value:string, idItem:number){
        setRequestsPharmacyState(requestsPharmacyState.map((item) => {
            if(item.id === idItem){
                return {...item, amountApproved:parseInt(value)}
            }
            return item;
        }))
    }
    function approveAmount(id:number){
        setRequestsPharmacyState(requestsPharmacyState.map((item) => {
            if(item.id === id){
                return {...item, edit:false, approved:true}
            }
            return item;
        }))
    }
    function editAmount(id:number){
        setRequestsPharmacyState((prev) => {
            return prev.map((item) => {
                if(item.id === id){
                    return {...item, edit:true, approved:false}
                }
                return item;
            })
        })
    }
    return (
        <>
            <EnhancedTable noFooter noHeader noSelectable headCells={headCells} rows={rows} />
        </>
    );
};

export default ListPharmacyItems;
