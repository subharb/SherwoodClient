import { Avatar, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import HotelIcon from '@material-ui/icons/Hotel';
import { BoxBckgr, ButtonCancel, ButtonContinue, IconPatient } from '../../../../components/general/mini_components';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import PatientButton from '../../../../components/general/PatientButton';
import { Translate } from 'react-localize-redux';
import Modal from '../../../../components/general/modal';
import Form from '../../../../components/general/form';

interface Bed{
    id:number,
    gender:number,
    name:string,
    active:boolean,
    order:number
}
interface Props {
    loading:boolean,
    ward:{
        name:string,
        beds:Bed[]
    },
    uuid:string,
    edit:boolean,
    editCallBack : (bed:Bed) => void,
    deleteCallBack : (bed:Bed) => void,
}

const Row = styled(Grid)`
    display:flex;
    border-bottom:2px #ccc solid;
`;

const BED_FORM = {
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"hospital.ward.bed.name",
        shortLabel: "hospital.ward.bed.name",
        validation : "textMin2"
    },
    "gender":{
        required : true,
        name:"gender",
        type:"select",
        label:"hospital.ward.bed.genre",
        shortLabel: "hospital.ward.bed.genre",
        validation : "number",
        options:[
            {value:0, label:"general.male"},
            {value:1, label:"general.female"},
            {value:2, label:"general.any"},
        ]
    },
    "active":{
        required : false,
        name:"active",
        type:"checkbox",
        label:"hospital.ward.bed.active",
        shortLabel: "hospital.ward.bed.active",
        validation : "textMin2"
    },
}

const Ward:React.FC<Props> = ({loading, edit, ward, editCallBack, deleteCallBack}) => {
    const [showModal, setShowModal] = useState(false);
    const [bedToEdit, setBedToEdit] = useState<Bed | null>(null);
    const [bedToDelete, setBedToDelete] = useState<Bed | null>(null);

    function editCallBackForm(bed:Bed){
        editCallBack(bed);
        resetModal()
    }
    function resetModal(){
        setShowModal(false);
        setBedToEdit(null);
        setBedToDelete(null);
    }
    function editBed(bed:Bed){
        setShowModal(true);
        setBedToEdit(bed);
    }
    function deleteBed(e:any, bed:Bed){
        e.stopPropagation();
        setBedToDelete(bed);
        setShowModal(true);
    }
    function deleteCallBackForm(bed:Bed){
        deleteCallBack(bed);
        resetModal();
    }

    if(loading){
        return <Loader />
    }
    else{
        return(
            <BoxBckgr color="text.primary" style={{padding:'1rem'}}>
                <Modal key="modal" open={showModal} closeModal={() => resetModal()}
                    title={<Translate id="hospital.ward.edit-bed" />}>
                        <div>
                        {
                            bedToEdit &&
                            <Form fields={BED_FORM} fullWidth callBackForm={editCallBackForm}
                                initialData={bedToEdit} 
                                closeCallBack={() => resetModal()}/>
                        }
                        {
                            bedToDelete &&
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        <Translate id="hospital.departments.delete-ward-prompt" />
                                    </Typography>
                                    <Typography variant="body2">
                                        {bedToDelete.name}
                                    </Typography> 
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    <ButtonContinue onClick={deleteCallBackForm} data-testid="continue-modal" color="primary">
                                        <Translate id="general.continue" />
                                    </ButtonContinue>
                                </Grid>
                            </Grid>
                        }
                        </div>
                </Modal>
                <Typography variant="h3" gutterBottom display="inline" style={{color:"white"}}>
                    <Translate id="hospital.ward.title" />: {ward.name}
                </Typography>
                <Grid container spacing={3}>
                <Row item container>
                    {
                        edit &&
                        ward.beds.sort((a, b) => a.order - b.order).map(bed => {
                            return(
                                <PatientButton name={bed.name} onClick={() => editBed(bed)}
                                    type="edit" active={bed.active} deleteCallBack={(e) => deleteBed(e, bed)}
                                    gender={bed.gender === 0 ? "male" : bed.gender === 1 ? "female" : "any"}/>
                            )
                        })
                    }
                </Row>
            </Grid>
            </BoxBckgr>
            
            )
    }

}

export default Ward;