import React from 'react';
import styled from 'styled-components';
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
    Send as SendIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    ArrowBackIos as ArrowBackIosIcon,
    LocalHospital as HospitalIcon
  } from "@material-ui/icons";
  import {
    Button, Icon, IconButton,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Fab as MuiFab,
    IconButton as MuiIconButton,
    Typography, Box
  } from "@material-ui/core";  

import { spacing } from "@material-ui/system";


export const BoxBckgr = styled(Box)`
    background-color:#49CEBF; 
    height:100vh;
`

export const Divider = styled(MuiDivider)(spacing);

const Fab = styled(MuiFab)(spacing);

export const DeleteHolder = styled.div`
    display: inline-block;
    color:#E16580;
    cursor:pointer;
    align-items: center;
    justify-content: center;
`;

export const EditConsent = styled.i`
    display: inline;
    color:#E16580;
    cursor:pointer;
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
    if(props.gender === "male"){
        return <img src={icon_male} alt="male" />
    }
    else if(props.gender === "female"){
        return <img src={icon_female} alt="female" />
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
    background-color:${props => props.theme.buttonContinue.background}!important;
    color:${props => props.theme.buttonContinue.color};
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

export const ButtonGreyBorderGrey = styled(ButtonGrey)`
    &&&{
        background: #E5E5E5;
        border: 3px solid #6F6C6D;
`;

export const ButtonEdit = (props) =>{
    return <DeleteHolder {...props}>
        <i className="material-icons">edit</i>
    </DeleteHolder>
}

export const ButtonDelete = (props) =>{
    return <DeleteHolder {...props}>
        <i className="material-icons">delete</i>
    </DeleteHolder>
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
            color="primary"
            size="small"
            endIcon={<SendIcon />}
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
