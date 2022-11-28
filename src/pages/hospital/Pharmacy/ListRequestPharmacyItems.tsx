import React from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { RequestStatusToChip } from '../Service/RequestTable';
import { IRequestPharmacy, RequestStatus } from '../Service/types';
import { PHARMACY_ITEM_REQUEST_COLUMNS } from './RequestForm';
import { RequestPharmacyItem } from './types';

interface ListPharmacyItemsProps {
    requestsPharmacy:IRequestPharmacy[],
    statusRequest:RequestStatus
}

const ListPharmacyItems: React.FC<ListPharmacyItemsProps> = ({ statusRequest, requestsPharmacy }) => {
    const columns = ["nameDrug", "status", "amountApproved", "amountRequested"];
    if(statusRequest === RequestStatus.PENDING_APPROVAL){
        columns.splice(2, 1);
    }
    let  headCells = columns.map((col) => {
        return { id: col, alignment: "left", label: <Translate id={`pages.hospital.pharmacy.request.table.${col}`} />}
    }) 
    const rows = requestsPharmacy.map((item) => {
        return {
            id: item.id,
            nameDrug: item.pharmacyItem.name,
            status: <RequestStatusToChip status={item.status} />,
            amountRequested: item.amountRequested,
            amountApproved: item.amountApproved,
        }
    });
    return (
        <>
            <EnhancedTable noFooter noHeader noSelectable headCells={headCells} rows={rows} />
        </>
    );
};

export default ListPharmacyItems;
