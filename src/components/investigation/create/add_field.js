import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import { ButtonAdd } from '../../general/mini_components';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { FIELDS_FORM } from '../../../utils';
import { usePortal } from '../../../hooks';

function AddField(props) {
    const [addingField, setAddingField] = useState(false);
    

    function callBack(field){
        setAddingField(false)
        props.callBackForm(field);
    }
    if(!addingField){
        return (
            <React.Fragment>
                <ButtonAdd type="button" data-testid="add-field" onClick={() => setAddingField(!addingField)}
                    show={true}>
                </ButtonAdd>  
            </React.Fragment>
        );
    }
    else{
        return (
            <Modal id="modal"
                open={true}
                closeModal={() => setAddingField(false)}
                title={<Translate id="investigation.create.edc.add_field" />}>
                    <Form fields={props.fields} fullWidth callBackForm={(field) => callBack(field)} 
                        closeCallBack={() => setAddingField(false)} dataTestid="save-field" />
            </Modal>
        );
    }
}

export default AddField;