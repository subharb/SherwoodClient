import React from 'react';
import styled, { css } from 'styled-components';
import icon_male from "../../img/icons/icon_male.svg";
import { Link } from 'react-router-dom'
import icon_female from "../../img/icons/icon_female.svg";
import {
    Add as AddIcon,
    HighlightOff as CloseIcon,
    RemoveRedEye as RemoveRedEyeIcon,
    PanoramaFishEye as PanoramaFishEyeIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    Save as SaveIcon,
    Clear as ClearIcon,
    Delete as DeleteIcon,
    Send as SendIcon,
    Edit as EditIcon,
    AddCircle as PlusIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    ArrowBackIos as ArrowBackIosIcon,
    LocalHospital as HospitalIcon,
    Hotel as HotelIcon,
  } from "@material-ui/icons";
  import {
    Button, Icon, IconButton,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Fab as MuiFab,
    IconButton as MuiIconButton,
    Typography, Box, Grid
  } from "@material-ui/core";  

import { spacing } from "@material-ui/system";

export const IconGenerator = (props) => {
    switch(props.type){
        case "add":
            return <AddIcon style={{color:props.theme.buttonContinue.secondary.background }} />
        case "view":
            return <RemoveRedEyeIcon style={{color:"#000"}} fontSize={props.size ? props.size : "small"}/>
        case "delete":
            return <DeleteIcon style={{color:"red"}} fontSize={props.size ? props.size : "small"}/>
        case "edit":
            return <EditIcon  style={{color:"yellow"}} fontSize={props.size ? props.size : "small"}/>
        case "hospital":
            return <HotelIcon style={{color:"#000"}} fontSize={props.size ? props.size : "small"}  />
        default:
            return <AddIcon />
    }
}

export const FieldWrapper = (props) => {
    if(props.noWrap){
        return props.children
    }
    else{
        return (
            <Grid item xs={12} sm={7} lg={4}>
                {props.children}
            </Grid>
        )
    }
}

export const BoxBckgr = styled(Box)`
    background-color:#49CEBF; 
    min-height:100vh;
`

export const Divider = styled(MuiDivider)(spacing);

const Fab = styled(MuiFab)(spacing);

export const DeleteHolder = styled.div`
    display: flex;
    color:#E16580;
    cursor:pointer;
    align-items: center;
    justify-content: center;
`;

export const BasicButtonStyles = styled(Button)`
    ${props => !props.show} {
        display: none!important;
    }

    ${({ spaceright }) => spaceright && `
        margin-right:1rem!important;
    `}
    
`

export const IconPatient = (props) =>{

    const iconSex = props.gender.toLowerCase() === "male" ? icon_male : props.gender.toLowerCase() === "female" ? icon_female : null;
    if(iconSex){
        return <img src={iconSex} alt={iconSex} width={props.width ? props.width : "40"} {...props} />
    }
    
    return null;
}
const GreyButtonStyles = styled(Button)`
    &&&{
        background: #E5E5E5;
        border: 3px solid #0F8678;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        text-decoration:none;
        text-align: center;
        font-weight: bold;
        color: rgba(39, 44, 42, 0.97);
        width:80%;
        @media (min-width: 768px) {
            width:20rem;
        }
    }
`;


export const ButtonOtherStyles = styled(BasicButtonStyles)`
    background-color:${props => props.theme.buttonOther.background}!important;
    color:${props => props.theme.buttonOther.color};
`;

export const ButtonCancelStyles = styled(BasicButtonStyles)`
    background-color:${props => props.theme.buttonCancel.background}!important;
    color:${props => props.theme.buttonCancel.color};
`;
export const ButtonContinueStyles = styled(BasicButtonStyles)`
    background-color:${props => props.color === "secondary" ? props.theme.buttonContinue.secondary.background : props.theme.buttonContinue.primary.background}!important;
    color:${props => props.color === "secondary" ? props.theme.buttonContinue.secondary.color : props.theme.buttonContinue.primary.color};
`;
export const ButtonIcon = styled(IconButton)`
    background-color:${props => props.theme.buttonContinue.background}!important;
    color:${props => props.theme.buttonContinue.color}!important;
`
export const LinkPlain = styled(Link)`
    text-decoration:none;
`


export const ButtonGrey = (props) => {
    return(
        <GreyButtonStyles {...props}>
            {props.children}
        </GreyButtonStyles>)
}


export const ButtonEdit = (props) =>{
    return(
        <Button {...props}>
            <EditIcon />
        </Button>)
}

export const ButtonPlus = (props) =>{
    return(
        <Button {...props}>
            <PlusIcon />
        </Button>)
}

export const ButtonDelete = (props) =>{
    return(
        <DeleteHolder {...props}>
            <DeleteIcon />
        </DeleteHolder>
    )
}

export const ButtonBack = (props) =>{
    return <ButtonOtherStyles 
        variant="contained"
        color="primary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        {...props}
    >
        {props.children}
    </ButtonOtherStyles>
}

export const ButtonForward = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        color="primary"
        size="small"
        startIcon={<ArrowForwardIosIcon />}
        {...props}
    >
        {props.children}
    </ButtonContinueStyles>
}

export const ButtonContinue = (props) =>{
        return <ButtonContinueStyles
            variant="contained"
            color={props.color ? props.color : "primary"}
            size="small"
            endIcon={<SendIcon />}
            {...props}
            data-testid={props['data-testid'] ? props['data-testid'] : "continue"}
        >
            {props.children}
        </ButtonContinueStyles>
}

export const ButtonAccept = (props) =>{
    return <ButtonContinueStyles
        variant="contained"
        color={props.color ? props.color : "primary"}
        size="small"
        {...props}
        data-testid={props['data-testid'] ? props['data-testid'] : "continue"}
    >
        {props.children}
    </ButtonContinueStyles>
}

export const ButtonCancel = (props) =>{
    return <ButtonCancelStyles
        variant="contained"
        color="primary"
        size="small"
        endIcon={<ClearIcon />}
        {...props}
    >
        {props.children}
    </ButtonCancelStyles>
}


export const ButtonSave = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        color="primary" 
        size="small"
        startIcon={<SaveIcon />}
        {...props}
         >
            {props.children}
    </ButtonContinueStyles>
}

export const ButtonCheck = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        size="small"
        startIcon={<CheckCircleOutlineIcon />}
        {...props}
         >
            {props.children}
    </ButtonContinueStyles>
}

export const CheckCircleOutlineSvg = (props) => {
    return <CheckCircleOutlineIcon {...props} />
}
export const ButtonEmptyCheck = (props) =>{
    return <BasicButtonStyles 
        variant="contained"
        color="primary" 
        size="small"
        startIcon={<PanoramaFishEyeIcon />}
        {...props}
         >
            {props.children}
    </BasicButtonStyles>
}

export const ButtonAdd = (props) =>{
    return  <Fab mx={2} size="small" color="secondary" aria-label="Add" {...props} >
                <AddIcon />
            </Fab>
    // return <ButtonContinueStyles
    //     variant="contained"
    //     color="primary"
    //     size="small"
    //     startIcon={<SaveIcon />}
    //      >
    //         {props.children}
    // </ButtonContinueStyles>
}

export const CloseButton = (props) =>{
    return  <Button mx={2} size="small" color="secondary" aria-label="View" {...props} >
                <CloseIcon />
            </Button>
}

export const ButtonView = (props) =>{
    return  <Fab mx={2} size="small" color="secondary" aria-label="View" {...props} >
                <RemoveRedEyeIcon />
            </Fab>
    // return <ButtonContinueStyles
    //     variant="contained"
    //     color="primary"
    //     size="small"
    //     startIcon={<SaveIcon />}
    //      >
    //         {props.children}
    // </ButtonContinueStyles>
}
export const ButtonGreyBorderGrey = styled(ButtonGrey)`
    &&&{
        background: #E5E5E5;
        border: 5px solid #6F6C6D;
`;