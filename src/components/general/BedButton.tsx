import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { ButtonDelete, IconPatient } from './mini_components'
import styled, { css } from 'styled-components';
import { WardModes } from '../../pages/hospital/departments/Ward';


export const Container = styled("div")<{active?:boolean}>`
    width:7rem;
    height:7rem;
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
    padding:1rem;
    opacity:${props => props.active ? '1.0' : '0.7'};
`;


export const TypographyColorGender = styled(Typography)<{gender:string}>`
    color:${props => props.gender === "female" ? "#EE6658" : "#008187"}
`;

export const GridHeaderPatient = styled(Grid)<{type:string}>`
    text-align:left;
    height:2rem;
    
    ${props => props.type === 'edit' && css`
        display:flex; 
        justify-content:space-between;
    `}
`;


export const TypographyFree = styled(Typography)`
    color:green;
`;

interface Props {
    mode:WardModes,
    empty?:boolean,
    active:boolean,
    name:string,
    gender:string,
    onClickCallBack?:() => void,
    deleteCallBack?:() => void,
}

type PropsEdit = Omit<Props, "mode">;

type PropsAssign = Omit<Props, "deleteCallBack" | "mode">;

export const BedButtonEdit:React.FC<PropsEdit> = (props) => <BedButton {...props} mode={WardModes.Edit} />
export const BedButtonAssignBed:React.FC<PropsAssign> = (props) => <BedButton {...props} mode={WardModes.AssignPatient} />

const BedButton:React.FC<Props> = (props) => {
    
    function onClick(){
        if(!props.onClickCallBack){
            return 
        }
        if(props.mode === WardModes.AssignPatient && props.empty){
            props.onClickCallBack()
            
        }
        else{
            props.onClickCallBack();
        }
        
    }
    function deleteAction(e:Event){
        e.stopPropagation();
        if(props.deleteCallBack){
            props.deleteCallBack();
        }
    }
    
    const active = !props.active ? false : (props.mode === WardModes.AssignPatient && props.empty) ? true : (props.mode === WardModes.Edit);
    return (
        <Container active={active} onClick={onClick} >
            <Grid container xs={12}>
                <GridHeaderPatient xs={12} type={props.mode} >
                    <Typography variant="body2" component="span" gutterBottom >
                        {props.name}
                    </Typography>
                    {
                        props.mode === "edit" &&
                        <ButtonDelete onClick={(e:Event) => deleteAction(e)}  />
                    }
                    
                </GridHeaderPatient>
                <Grid xs={12} style={{textAlign:"center"}}>
                    <IconPatient width="30" gender={props.gender} />
                </Grid>
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
