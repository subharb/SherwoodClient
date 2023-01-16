import { Grid, TextField } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { CheckCircle } from '@material-ui/icons';
import Edit from '@material-ui/icons/Edit';
import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonCheck2, ButtonContinue } from '../../../components/general/mini_components';
import { PERMISSION } from '../../../components/investigation/share/user_roles';

import { RequestStatusToChip } from '../Service/RequestTable';
import { IRequestPharmacy, RequestStatus } from '../Service/types';
import { PHARMACY_ITEM_REQUEST_COLUMNS } from './RequestForm';
import { RequestAction } from './RequestSingle';
import { IPharmacyItem, RequestPharmacyItem } from './types';


const SpanAmountApproved = styled.span<{approved:boolean, error:boolean}>`
    color: ${props => props.approved ? 'green' : props.error ? 'red' : 'black'};
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
    pharmacyItems:IPharmacyItem[],
    completed:boolean,
    action:RequestAction, 
    saveRequestCallback:(requestsPharmacy:IRequestPharmacy[], approve:boolean) => void
}

interface IRequestPharmacyState extends IRequestPharmacy{
    edit:boolean, 
    error:number,
    approved:boolean,
}



const ListPharmacyItems: React.FC<ListPharmacyItemsProps> = ({ action, userPermissions, pharmacyItems, completed, statusRequest, requestsPharmacy, saveRequestCallback }) => {
    const [requestsPharmacyState, setRequestsPharmacyState] = React.useState<IRequestPharmacyState[]>(requestsPharmacy.map((req) => {
        return {...req, amountApproved: req.amountApproved !== 0 ? req.amountApproved : req.amountRequested, 
                edit:false, error:0, approved:false
            }
    }));


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
    function validateRequest(approve:boolean){
        let error = false;
        setRequestsPharmacyState(requestsPharmacyState.map((item) => {
            if(item.amountApproved < 0 || !item.approved){
                error = true;
                return {...item, error:1}
            }
            const pharmacyItem = pharmacyItems.find((pharItem) => pharItem.id === item.pharmacyItem.id)
            if(!pharmacyItem || item.amountApproved > pharmacyItem?.amount){
                error = true;
                return {...item, error:2, edit:true}
            }
            return {...item, error:0}
        }))
        if(!error){
            const requests:IRequestPharmacy[] = requestsPharmacyState.map((item) => {
                return {
                    id:item.id,
                    status: item.status,
                    amountApproved:item.amountApproved,
                    amountRequested:item.amountRequested,
                    pharmacyItem:item.pharmacyItem
                }})
            ;
            saveRequestCallback(requests, approve);
        }
        
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
    function showErrorType(error:number, idItem:number){
        if(error === 1){
            return <Translate id="pharmacy.error.amount"/>
        }
        const pharmacyItem = pharmacyItems.find((pharItem) => pharItem.id === idItem)
        return "MAX: " + pharmacyItem?.amount;
    }
    const canApproveRequests = userPermissions.filter((perm) => perm === PERMISSION.MANAGE_PHARMACY_CENTRAL).length > 0;
    const canUpdateRequests = userPermissions.filter((perm) => perm === PERMISSION.MANAGE_PHARMACY_CENTRAL || perm === PERMISSION.UPDATE_PHARMACY_CENTRAL).length > 0;
    const columns = ["nameDrug", "amountRequested", "amountApproved", "actions"];
    
    if(action === RequestAction.MAKE && !completed){
        columns.splice(2, 1);
        var index = columns.indexOf("actions");
        if (index !== -1) {
            columns.splice(index, 1);
        }
    }
    if(completed){
        var index = columns.indexOf("actions");
        if (index !== -1) {
            columns.splice(index, 1);
        }
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
                    helperText={showErrorType(item.error, item.pharmacyItem.id as number)}
                    error={item.error !== 0} type="text" 
                    onChange={(event) => changeField(event.target.value, item.id)} /> 
             : <SpanAmountApproved error={item.error !== 0} approved={item.approved}>{item.amountApproved}</SpanAmountApproved>,
            actions:  item.edit ? <ButtonCheck2 onClick={() => approveAmount(item.id)} checked={item.approved} />: <><ButtonCheck2 checked={item.approved} onClick={() => approveAmount(item.id)}/><ButtonAction onClick={() => editAmount(item.id)}><Edit  /></ButtonAction></>
        }
    });
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <EnhancedTable noFooter noHeader noSelectable headCells={headCells} rows={rows} />
            </Grid>
            <Grid item xs={12}>
            {
                !completed && action === RequestAction.APPROVE && canApproveRequests &&
                <ButtonContinue onClick={(() => validateRequest(true))} >
                    <Translate id="pages.hospital.services.save_changes" />
                </ButtonContinue>
            }
            {
                !completed && action === RequestAction.APPROVE && canUpdateRequests &&
                <ButtonContinue style ={{marginLeft:'1rem'}}color={blue[700]} onClick={(() => validateRequest(false))}  >
                    <Translate id="pages.hospital.services.save_and_complete" />
                </ButtonContinue>
            }
            </Grid>
        </Grid>
    );
};

export default ListPharmacyItems;
