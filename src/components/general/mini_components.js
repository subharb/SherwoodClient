import React from 'react';
import styled from 'styled-components';
import { Button, Icon, IconButton } from '@material-ui/core';
import {
    Add as AddIcon,
    RemoveRedEye as RemoveRedEyeIcon,
    PanoramaFishEye as PanoramaFishEyeIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    Save as SaveIcon,
    Clear as ClearIcon,
    Send as SendIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    ArrowBackIos as ArrowBackIosIcon
  } from "@material-ui/icons";
  import {
    CardContent,
    Grid,
    Link,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Fab as MuiFab,
    IconButton as MuiIconButton,
    Typography,
  } from "@material-ui/core";  

import { spacing } from "@material-ui/system";
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

    ${({ spaceRight }) => spaceRight && `
        margin-right:1rem!important;
    `}
    
`

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
