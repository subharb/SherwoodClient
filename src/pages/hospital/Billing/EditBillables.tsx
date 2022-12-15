import { Box, Card } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { TypographyThemed } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { BillItems } from './BillItems';
import { BillItem, BillItemModes, EditBillablesProps } from './types';



// Componente que edita, añade y borra billables
const EditBillables: React.FC<EditBillablesProps> = ({ billables, uuidInvestigation, withDiscount,  onBillablesCreated, billingInfo }) => {
    const [showModal, setShowModal] = useState(false);
    const [errorBillables, setErrorBillables] = useState<ReactElement | undefined>(undefined);
    
    function removeBillable(index:number){
        console.log(index);
        setShowModal(true);
    }
    
    function renderBillables(){
        return(
            <Card>
                <BillItems columns={[{name:"concept", type:"autocomplete", validation:""}, {name:"type", type:"type", validation:""}, {name:"amount", type:"amount", validation:""}]} 
                    currency={billingInfo.currency} print={false} mode = {BillItemModes.EDIT} withDiscount={withDiscount}
                    repeatBillItems={true} showTotal={false}
                    bill={null} billables={[]} initItems = {billables} uuidInvestigation={uuidInvestigation} updatingBill={false}
                    onBillItemsValidated={onBillablesCreated} error={errorBillables}
                    onCancelBill={() => console.log("Cancel")} />
            </Card>
        ) 
    }
    return (
        <>
            <Modal key="modal" medium 
                open={showModal} title={<Translate id="" />} 
                closeModal={() => setShowModal(false)}>
                        <Translate id="" />
            </Modal>
            <TypographyThemed variant='body2'>
            Billables are items that repeat on each bill. Add, edit or remove them here.
            If you delete a billable it will remain on past bills but it won't appear in new bills.
            </TypographyThemed>
            {
                renderBillables()
            }
        </>
    );
};
export default EditBillables;