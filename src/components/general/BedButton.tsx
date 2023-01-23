import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { ButtonDelete, IconPatient } from './mini_components'
import styled, { css } from 'styled-components';
import { BedButtonModes, WardModes } from '../../pages/hospital/departments/Ward';
import { IPatient, PersonalData } from '../../constants/types';
import { daysFromDate, sexStringToColor } from '../../utils';
import { Translate } from 'react-localize-redux';
import { CheckCircleIcon } from '@material-ui/data-grid';
import { MonetizationOn } from '@material-ui/icons';


export const Container = styled("div")<{active?:boolean, genderBorder:boolean, genderColor:string}>`
    width:8rem;
    height:8rem;
    background: #FFFFFF;
    border: 2px solid #6F6C6D;
    box-sizing: border-box;
    border-radius: 15px;
    cursor:${props => props.active ? 'pointer' : 'auto'};
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    margin-left:1rem;
    margin-top:1rem;
    padding:0.5rem;
    opacity:${props => props.active ? '1.0' : '0.7'};
    box-shadow:${props => props.genderBorder ? props.genderColor+'  0px -0.55rem 0px inset' : 'none'};
`;


export const TypographyColorGender = styled(Typography)<{gender:string}>`
    color:${props => props.gender === "female" ? "#EE6658" : "#008187"}
`;

export const GridHeaderPatient = styled(Grid)<{type:string}>`
    text-align:left;
    height:2rem;
    color:#000;
    
    ${props => props.type === 'edit' && css`
        display:flex; 
        justify-content:space-between;
    `}
`;


export const TypographyFree = styled(Typography)`
    color:green;
`;



type BedButtonModeTypes = typeof BedButtonModes.AssignPatient | typeof BedButtonModes.Edit | typeof BedButtonModes.View | typeof BedButtonModes.Consult

interface Props {
    mode:BedButtonModeTypes,
    active:boolean,    
    gender:string,
    stayDays?:number,
    showPersonalData?:boolean,
    name?:string,   
    checkMark?:boolean,
    moneyIcon?:boolean,
    patientName?:string,
    age?:number | null,
    patient?:PersonalData | null
    deleteCallBack?:() => void,
    onClickCallBack?:(patient?:PersonalData) => void,
    onSelectPatient?:() => void,
}
interface PropsEdit extends Omit<Props, "mode" | "age" | "patientName" >{
    name:string,    
    deleteCallBack:() => void,
}

interface PropsView extends Omit<Props, "mode" | "deleteCallBack">{
    patient:PersonalData | null,
    age:number | null,
    showPersonalData:boolean,
}

interface PropsConsultation extends Omit<Props, "mode" | "deleteCallBack" | "onClickCallBack" | "name" >{
    patient:PersonalData,
    age:number,
    showPersonalData:boolean,
    checkMark:boolean,
    moneyIcon:boolean,
    onSelectPatient:() => void,
}

interface PropsAssign extends Omit<Props, "mode" | "age" | "deleteCallBack" >{
    showPersonalData:boolean,
}


export const BedButtonEdit:React.FC<PropsEdit> = (props) => <BedButton {...props} mode={WardModes.Edit} />
export const BedButtonViewPatient:React.FC<PropsView> = (props) => <BedButton {...props} mode={WardModes.View} />
export const ButtonPatient:React.FC<PropsConsultation> = (props) => <BedButton {...props} mode={BedButtonModes.Consult} />
export const BedButtonAssignBed:React.FC<PropsAssign> = (props) => <BedButton {...props} mode={WardModes.AssignPatient} />

const BedButton:React.FC<Props> = (props) => {
    
    function onClick(){
        if(!props.onClickCallBack){
            if(props.mode ===  BedButtonModes.Consult && props.patient && props.onSelectPatient){
                props.onSelectPatient();
            }
            return 
        }
        if(props.mode === BedButtonModes.AssignPatient && !props.showPersonalData){
            props.onClickCallBack()
            
        }
        else if(props.mode !== WardModes.AssignPatient){
            props.onClickCallBack(props.patient as PersonalData);
        }
        
    }
    function deleteAction(e:Event){
        e.stopPropagation();
        if(props.deleteCallBack){
            props.deleteCallBack();
        }
    }
    
    const active = !props.active ? false : (props.mode === WardModes.AssignPatient && props.showPersonalData) ? true : (props.mode === WardModes.View && !props.showPersonalData) ? false : props.active;
    const patientName = props.patient ? props.patient.name+" "+props.patient.surnames : "" ;
    //const name = props.mode === WardModes.View && props.patient ? props.patient.name+" "+props.patient.surnames : props.name;  
    const showIcon = !(props.patient)
    return (
        <Container active={active} onClick={onClick} genderBorder={!showIcon} genderColor={sexStringToColor(props.gender)} >
            <Grid container xs={12}>
                <GridHeaderPatient xs={12} type={props.mode} >
                    <Typography variant="body2" style={{lineHeight:1}} component="div" gutterBottom>
                        {props.name}
                    </Typography>
                    <Typography variant="body2" style={{lineHeight:1}} component="div" gutterBottom>
                        {patientName}
                    </Typography>
                    
                    {
                        props.mode === "edit" &&
                        <ButtonDelete onClick={(e:Event) => deleteAction(e)}  />
                    }
                    
                </GridHeaderPatient>
                {
                    (showIcon) &&
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <IconPatient width="30" gender={props.gender} />
                    </Grid>
                }
                {
                    props.showPersonalData &&
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="div" gutterBottom style={{height:'1px', color:"darkblue"}} >
                                {props.age} years
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="div" gutterBottom style={{height:'1px', color:"green"}} >
                                {props.stayDays} <Translate id="hospital.time-unit-options.days" />
                            </Typography>
                        </Grid>
                        {
                            props.checkMark &&
                            <Grid item xs={12}>
                                <Typography variant="body2" component="div" gutterBottom style={{height:'1px', color:"green"}} >
                                    <CheckCircleIcon style={{fontSize:"1.2rem"}} /> 
                                </Typography>
                            </Grid>
                        }
                        {
                            props.moneyIcon &&
                            <Grid item xs={12}>
                                <Typography variant="body2" component="div" gutterBottom style={{height:'1px', color:"red"}} >
                                    <MonetizationOn style={{fontSize:"1.2rem"}} />
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }
                {/* <Grid item xs={8} >
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.name} {props.surnames}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.id}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <TypographyColorGender variant="body2" gutterBottom gender={props.gender}>
                            {props.age}
                        </TypographyColorGender>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center", color:"green"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.stay}
                        </Typography>
                    </Grid>
                </Grid> */}
            </Grid>
        </Container>
    )
}
