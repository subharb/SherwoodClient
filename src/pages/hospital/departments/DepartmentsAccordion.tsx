import { Avatar, Grid, List, ListItem, FormControlLabel, Switch, Typography, Accordion, AccordionSummary, AccordionDetails, ListItemText, IconButton } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IBed, IDepartment, IDepartmentServer, IResearcher, IUnit, IWard } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import { WardFormEdit, WardFormModes, WardFormSelect } from './Ward/WardForm';
import { ButtonAdd, IconGenerator } from '../../../components/general/mini_components';
import { useDepartments } from '../../../hooks';
import Loader from '../../../components/Loader';
import { useHistory } from 'react-router-dom';
import { HOSPITAL_WARD_ASSIGN_PATIENT_ROUTE } from '../../../routes/urls';
import { PERMISSION } from '../../../components/investigation/share/user_roles';

export enum DepartmentAccordionModes {
    Researchers = "researchers",
    Wards = "wards",
    WardSelection = "ward-selection"
}

interface Props {
    departments:IDepartment[],
    researchers:IResearcher[],
    mode : DepartmentAccordionModes,
    uuidDepartmentAddWard?:string,
    uuidPatient?:string,
    permissions:PERMISSION[],
    currentInvestigation?:any,
    selectWardCallBack?: (ward:IWard) => void,
    viewWardCallBack?: (ward:IWard, uuidDepartment:string) => void,
    settingsWardCallBack?: (ward:IWard, uuidDepartment:string) => void,
    editWardCallBack?: (ward:IWard, uuidDepartment:string, busyBeds:number) => void,
    deleteWardConfirmCallBack?: (ward:IWard, uuidDepartment:string) => void,
    addUnitCallBack?:(uuidDepartment:string)=> void,
    addWardCallBack?: (uuidDepartment:string) => void,
    editDepartmentCallBack?: (department:IDepartment) => void
    deleteDepartmentCallBack?: (department:IDepartment) => void,
    deleteUnitCallBack?: (unit:IUnit, hasResearchers:boolean) => void,
    editUnitCallBack?: (unit:IUnit) => void,
}

type PropsRedux = Omit<Props, "deleteCallBack" | "uuidDepartmentAddWard" | "viewWardCallBack" | "settingsWardCallBack" | "editWardCallBack" | "addWardCallBack">;


export const DepartmentsAccordionRedux:React.FC<PropsRedux> = (props) =>{
    const {departments, researchers, loadingDepartments} = useDepartments();
    const history = useHistory();

    function selectWardCallBack(ward:IWard){
        console.log("Nos vamos a ward", ward);
        if(ward.uuid && props.uuidPatient){
            const nextUrl = HOSPITAL_WARD_ASSIGN_PATIENT_ROUTE.replace(":uuidWard", ward.uuid).replace(":uuidPatient", props.uuidPatient)
            history.push(nextUrl);
        }
        
    }
    if(loadingDepartments || !departments){
        return <Loader />
    }
    else{
        return(
            <DepartmentsAccordionWards departments={departments} researchers={researchers} 
                permissions={props.currentInvestigation.permissions} addUnitCallBack={props.addUnitCallBack}
                editDepartmentCallBack = {props.editDepartmentCallBack} deleteDepartmentCallBack={props.deleteDepartmentCallBack}
                mode={DepartmentAccordionModes.WardSelection} selectWardCallBack={selectWardCallBack}
            />
        )
    }
}

const DepartmentsAccordionWards:React.FC<PropsRedux> = ({departments, permissions, researchers, mode, selectWardCallBack}) =>{
    return(
        <DepartmentsAccordion departments={departments} researchers={researchers} 
            permissions={permissions}
            mode={mode} selectWardCallBack={selectWardCallBack}
            />
    )
}

export const DepartmentsAccordion:React.FC<Props> = ({departments, permissions, uuidDepartmentAddWard, researchers, mode, 
                                                        selectWardCallBack, addWardCallBack, addUnitCallBack, editWardCallBack, 
                                                        deleteWardConfirmCallBack, viewWardCallBack, settingsWardCallBack, editDepartmentCallBack,
                                                        deleteDepartmentCallBack, deleteUnitCallBack, editUnitCallBack}) => {
    
    function renderDepartment(department:IDepartment){
        if(mode === DepartmentAccordionModes.Researchers){
            return (
                <List component="nav" aria-label="main mailbox folders">
                    {
                        department.units.map((unit) => {
                            const researchersUnit = researchers.filter((res:IResearcher) => res.units.find((unitRes:IUnit) => unit.uuid === unitRes.uuid));
                            return (
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                    <Typography >{ unit.name}  {
                                    editUnitCallBack &&
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            editUnitCallBack(unit);
                                            }}
                                        size="large">
                                        <IconGenerator type="edit" />
                                    </IconButton>
                                }
                            {
                                deleteUnitCallBack &&
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteUnitCallBack(unit, researchersUnit.length > 0);
                                        }}
                                    size="large">
                                    <IconGenerator type="delete" />
                                </IconButton>
                            }</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{"flexDirection": "column"}} className="accordion_details">
                                        <List component="nav" aria-label="main mailbox folders">
                                            {
                                                (researchersUnit.length > 0)&& 
                                                researchersUnit.map((res:IResearcher) => {
                                                    return(
                                                        <ListItem button>
                                                            <ListItemText primary={`${res.name} ${res.surnames}`} />
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                            {
                                                (researchersUnit.length === 0)&& 
                                                <ListItem button>
                                                    <ListItemText primary={<Translate id="hospital.departments.no-doctors"></Translate>} />
                                                </ListItem>
                                            }
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            );
                            
                        })
                    }
                </List>
            );
        }
        else{
            const AddWardButton = (addWardCallBack) ? <ButtonAdd disabled={uuidDepartmentAddWard} 
                                type="button" data-testid="add_researcher" 
                                onClick={() => {
                                    addWardCallBack(department.uuid as string);
                                }}></ButtonAdd> : null;
    
            const wardsDepartment = department.wards.length === 0 ? <ListItemText primary={<Translate id="hospital.departments.no-wards"></Translate>} /> : department.wards.sort((aWard, bWard) => aWard.name.localeCompare(bWard.name)).map((ward:IWard, index:number) => {
                    const bedsInfo = {
                        total:ward.beds.length,
                        male:ward.beds.filter((bed:IBed) => bed.gender === 0).length,
                        female:ward.beds.filter((bed:IBed) => bed.gender === 1).length,
                        undefined:ward.beds.filter((bed:IBed) => bed.gender === 2).length,
                        busyTotal : ward.beds.filter((bed:IBed) => bed.stays.filter((stay:any) => stay.dateOut === null).length > 0).length,
                        busyMale : ward.beds.filter((bed:IBed) => (bed.gender === 0 && bed.stays.length > 0)).length,
                        busyFemale : ward.beds.filter((bed:IBed) => (bed.gender === 1 && bed.stays.length > 0)).length,
                        busyUndefined : ward.beds.filter((bed:IBed) => (bed.gender === 2 && bed.stays.length > 0)).length,
                    }
     
                    if(mode === DepartmentAccordionModes.WardSelection){
                        if(selectWardCallBack){
                            return (<WardFormSelect mode={ WardFormModes.Select } name={ward.name} beds={bedsInfo}                                                             
                                    permissions={permissions} selectWardCallBack = {() => selectWardCallBack(ward)}
                                />)
                        }
                    }
                    else{
                        const uuidDepartment:string = department.uuid as string;
                        if(editWardCallBack && viewWardCallBack && settingsWardCallBack && deleteWardConfirmCallBack){
                            return (<WardFormEdit name={ward.name} beds={bedsInfo}     
                                        permissions={permissions}                                                         
                                        editCallBack = {() => editWardCallBack(ward, uuidDepartment, bedsInfo.busyTotal)}
                                        viewCallBack = {() => viewWardCallBack(ward, uuidDepartment)}
                                        settingsCallBack = {() => settingsWardCallBack(ward, uuidDepartment)}
                                        deleteCallBack = {() => deleteWardConfirmCallBack(ward, uuidDepartment)}
                                    />)
                        }
                        
                    }
                
                
            })
            if(mode === DepartmentAccordionModes.WardSelection){
                return(
                    <Grid container>
                        <Grid xs={12} item style={{marginBottom:'1rem'}}>
                            { AddWardButton }
                        </Grid>
                        <Grid xs={12} container>
                            {wardsDepartment}
                        </Grid>
                    </Grid>
                )
            }
            else{
                return(
                <Grid container>
                    <Grid xs={12} item style={{marginBottom:'1rem'}}>
                        { AddWardButton }
                    </Grid>
                    <Grid xs={12} container>
                        {wardsDepartment}
                    </Grid>
                </Grid>)
            }
            
        }   
        
    }
    function renderAccordion(){
        let unitOrDeparments:IDepartment[] = [];
        unitOrDeparments = departments.sort((a,b) => a.name.localeCompare(b.name));
        return unitOrDeparments.length > 0 &&
        unitOrDeparments.map(department => {
            return (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography >{ department.name}
                        {
                            addUnitCallBack &&
                            <ButtonAdd 
                                type="button" data-testid="add_researcher" 
                                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.stopPropagation();addUnitCallBack(department.uuid as string) }} />
                        }
                        </Typography>
                        {
                            editDepartmentCallBack &&
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editDepartmentCallBack(department);
                                    }}
                                size="large">
                                <IconGenerator type="edit" />
                            </IconButton>
                        }
                        {
                            deleteDepartmentCallBack &&
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDepartmentCallBack(department);
                                    }}
                                size="large">
                                <IconGenerator type="delete" />
                            </IconButton>
                        }
                            
                    </AccordionSummary>
                    <AccordionDetails style={{"flexDirection": "column"}} className="accordion_details">
                            {
                                renderDepartment(department)
                            }
                        
                    </AccordionDetails>
                </Accordion>
            );
        });
    }
    return(
        <div style={{width:'100%'}}>
            
            {
                renderAccordion()
            }
            {
                departments.length === 0 &&
                <Translate id="hospital.departments.no-departments" />
            }
            
        </div>
            
        
    );
}