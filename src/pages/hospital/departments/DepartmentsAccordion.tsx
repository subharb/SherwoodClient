import { Avatar, Grid, List, ListItem, FormControlLabel, Switch, Typography, Accordion, AccordionSummary, AccordionDetails, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IBed, IDepartment, IDepartmentServer, IResearcher, IWard } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import { WardFormEdit, WardFormModes, WardFormSelect } from './Ward/WardForm';
import { ButtonAdd } from '../../../components/general/mini_components';
import { useDepartments } from '../../../hooks';
import Loader from '../../../components/Loader';
import { useHistory } from 'react-router-dom';
import { HOSPITAL_WARD_ASSIGN_PATIENT_ROUTE } from '../../../routes';

export enum DepartmentAccordionModes {
    Researchers = "researchers",
    Wards = "wards",
    WardSelection = "ward-selection"
}

interface Props {
    departments:IDepartmentServer[],
    researchers:IResearcher[],
    mode : DepartmentAccordionModes,
    uuidDepartmentAddWard?:string,
    uuidPatient?:string,
    selectWardCallBack?: (ward:IWard) => void,
    viewWardCallBack?: (ward:IWard, uuidDepartment:string) => void,
    settingsWardCallBack?: (ward:IWard, uuidDepartment:string) => void,
    editWardCallBack?: (ward:IWard, uuidDepartment:string) => void,
    deleteWardConfirmCallBack?: (ward:IWard, uuidDepartment:string) => void,
    addWardCallBack?: (uuidDepartment:string) => void
}

type PropsRedux = Omit<Props, "deleteCallBack" | "uuidDepartmentAddWard" | "viewWardCallBack" | "settingsWardCallBack" | "editWardCallBack" | "addWardCallBack">;


export const DepartmentsAccordionRedux:React.FC<PropsRedux> = (props) =>{
    const {departments, researchers, loading} = useDepartments();
    const history = useHistory();

    function selectWardCallBack(ward:IWard){
        console.log("Nos vamos a ward", ward);
        if(ward.uuid && props.uuidPatient){
            const nextUrl = HOSPITAL_WARD_ASSIGN_PATIENT_ROUTE.replace(":uuidWard", ward.uuid).replace(":uuidPatient", props.uuidPatient)
            history.push(nextUrl);
        }
        
    }
    if(loading){
        return <Loader />
    }
    else{
        return(
            <DepartmentsAccordionWards departments={departments} researchers={researchers} 
                mode={DepartmentAccordionModes.WardSelection} selectWardCallBack={selectWardCallBack}
            />
        )
    }
}

const DepartmentsAccordionWards:React.FC<PropsRedux> = ({departments, researchers, mode, selectWardCallBack}) =>{
    return(
        <DepartmentsAccordion departments={departments} researchers={researchers} 
                mode={mode} selectWardCallBack={selectWardCallBack}
            />
    )
}

export const DepartmentsAccordion:React.FC<Props> = ({departments, uuidDepartmentAddWard, researchers, mode, selectWardCallBack, addWardCallBack, editWardCallBack, deleteWardConfirmCallBack, viewWardCallBack, settingsWardCallBack}) => {
    
    function renderDepartment(department:IDepartmentServer){
        if(mode === DepartmentAccordionModes.Researchers){
            const researchersDepartment = researchers.filter((res:IResearcher) => res.departments.find((dep:IDepartment) => dep.name === department.name));
            return (
                <List component="nav" aria-label="main mailbox folders">
                {
                    (researchersDepartment.length > 0)&& 
                    researchersDepartment.map((res:IResearcher) => {
                        return(
                            <ListItem button>
                                <ListItemText primary={`${res.name} ${res.surnames}`} />
                            </ListItem>
                        )
                    })
                }
                {
                    (researchersDepartment.length === 0)&& 
                    <ListItem button>
                        <ListItemText primary={<Translate id="hospital.departments.no-doctors"></Translate>} />
                    </ListItem>
                }
                </List>
                )
        }
        else{
            const AddWardButton = <ButtonAdd disabled={uuidDepartmentAddWard} 
                                type="button" data-testid="add_researcher" 
                                onClick={() => {
                                    if(addWardCallBack){
                                        addWardCallBack(department.uuid);
                                    }
                                }}></ButtonAdd>
            if(department.wards.length === 0){
                return [
                    AddWardButton,
                    <ListItemText primary={<Translate id="hospital.departments.no-wards"></Translate>} />
                ]
            }
            else{
                const wardsDepartment = department.wards.map((ward:IWard, index:number) => {
                    const bedsInfo = {
                        total:ward.beds.length,
                        male:ward.beds.filter((bed:IBed) => bed.gender === 0).length,
                        female:ward.beds.filter((bed:IBed) => bed.gender === 1).length
                    }
                    if(mode === DepartmentAccordionModes.WardSelection){
                        if(selectWardCallBack){
                            return (<WardFormSelect mode={ WardFormModes.Select } name={ward.name} beds={bedsInfo}                                                             
                                    selectWardCallBack = {() => selectWardCallBack(ward)}
                                />)
                        }
                        
                    }
                    else{
                        if(editWardCallBack && viewWardCallBack && settingsWardCallBack && deleteWardConfirmCallBack){
                            return (<WardFormEdit name={ward.name} beds={bedsInfo}                                                             
                                        editCallBack = {() => editWardCallBack(ward, department.uuid)}
                                        viewCallBack = {() => viewWardCallBack(ward, department.uuid)}
                                        settingsCallBack = {() => settingsWardCallBack(ward, department.uuid)}
                                        deleteCallBack = {() => deleteWardConfirmCallBack(ward, department.uuid)}
                                    />)
                        }
                        
                    }
                    
                    
                })
                if(mode === DepartmentAccordionModes.WardSelection){
                    return wardsDepartment
                }
                else{
                    return [
                        AddWardButton,
                        wardsDepartment
                    ]
                }
            }
        }   
        
    }
    return(
        <div style={{width:'100%'}}>
            
            {
                departments.length > 0 &&
                departments.sort((a,b) => a.name.localeCompare(b.name)).map(department => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >{ department.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                    {
                                        renderDepartment(department)
                                    }
                                
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
            {
                departments.length === 0 &&
                <Translate id="hospital.departments.no-departments" />
            }
            
        </div>
            
        
    );
}