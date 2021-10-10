import { Avatar, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import HotelIcon from '@material-ui/icons/Hotel';
import { BoxBckgr, IconPatient } from '../../../../components/general/mini_components';
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
    editCallBack : () => void,
    deleteCallBack : () => void,
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
        validation : "textMin2",
        options:[
            {value:0, label:"general.male"},
            {value:1, label:"general.female"},
            {value:2, label:"general.any"},
        ]
    },
    "active":{
        required : true,
        name:"active",
        type:"radio",
        label:"hospital.ward.bed.active",
        shortLabel: "hospital.ward.bed.active",
        validation : "textMin2",
        options:[
            {value:true, label:"general.yes"},
            {value:false, label:"general.no"}
        ]
    },
}

const Ward:React.FC<Props> = ({loading, edit, ward, editCallBack, deleteCallBack}) => {
    const [showModal, setShowModal] = useState(false);
    const [bedToEdit, setBedToEdit] = useState<Bed | null>(null);
    function resetModal(){
        setShowModal(false);
    }
    
    function editBed(bed:Bed){
        setShowModal(true);
        setBedToEdit(bed);
    }
    if(loading){
        return <Loader />
    }
    else{
        return(
            <BoxBckgr color="text.primary">
                <Modal key="modal" open={showModal} closeModal={() => resetModal()}
                    title={<Translate id="hospital.ward.edit-bed" />}>
                        <Form fields={BED_FORM} fullWidth callBackForm={editCallBack}
                            initialData={bedToEdit} 
                            closeCallBack={() => resetModal()}/>
                </Modal>
                <Typography variant="h3" gutterBottom display="inline" style={{color:"white"}}>
                    <Translate id="hospital.ward.title" />: {ward.name}
                </Typography>
                <Grid container spacing={3}>
                <Row item container>
                    {
                        edit &&
                        ward.beds.sort((a, b) => a.order - b.order).map(bed => {
                            return <PatientButton name={bed.name} onClick={() => editBed(bed)}
                            type="edit" active={bed.active} gender={bed.gender === 0 ? "male" : bed.gender === 1 ? "female" : "any"}/>
                        })
                    }
                </Row>
            </Grid>
            </BoxBckgr>
            
            )
    }

}

export default Ward;