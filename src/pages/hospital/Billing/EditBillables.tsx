import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Modal from '../../../components/general/modal';
import { EditBillablesProps } from './types';



// Componente que edita, añade y borra billables
const EditBillables: React.FC<EditBillablesProps> = ({ billables, billingInfo }) => {
    const [showModal, setShowModal] = useState(false);

    
    function removeBillable(index:number){
        console.log(index);
        setShowModal(true);
    }
    function renderBillables(){
        const headCells = [
            { id: "id", alignment: "left", label: "ID" },
            { id: "concept", alignment: "left", label: <Translate id={`hospital.billing.item`} /> },
            { id: "amount", alignment: "left", label: [<Translate id={`hospital.billing.amount`} />,"("+billingInfo.currency+")"] },
            { id: "insurance", alignment: "left", label: [<Translate id={`hospital.billing.item.insurance`} />]},
        ]
        const rows = billables.map(billable => {
            return {
                id : billable.id,
                concept : billable.concept,
                amount : billable.amount,
                insurance : billable.insurance
            }
        });
    return <EnhancedTable noHeader headCells={headCells} rows={rows}  noSelectable
            actions={[{"type" : "delete", "func" : (index:number) => removeBillable(index)}]} />
    }
    return (
        <>
            <Modal key="modal" medium 
                open={showModal} title={<Translate id="" />} 
                closeModal={() => setShowModal(false)}>
                        <Translate id="" />
            </Modal>
            Billables are items that repeat on each bill. Add, edit or remove them here.
            If you delete a billable it will remain on past bills but it won't appear in new bills.
            {
                renderBillables()
            }
        </>
    );
};
export default EditBillables;