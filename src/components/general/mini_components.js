import React from 'react';
import styled from 'styled-components';
import { Button, Icon, IconButton } from '@material-ui/core';

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
        startIcon={<Icon>arrow_back_ios</Icon>}
        {...props}
    >
        {props.children}
    </ButtonOtherStyles>
}

export const ButtonContinue = (props) =>{
        return <ButtonContinueStyles
            variant="contained"
            color="primary"
            size="small"
            endIcon={<Icon>send</Icon>}
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
        endIcon={<Icon>clear</Icon>}
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
        startIcon={<Icon>save</Icon>}
        {...props}
         >
            {props.children}
    </ButtonContinueStyles>
}

export const ButtonCheck = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        size="small"
        startIcon={<Icon>check_circle_outline</Icon>}
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
        startIcon={<Icon>panorama_fish_eye</Icon>}
        {...props}
         >
            {props.children}
    </BasicButtonStyles>
}

export const ButtonAdd = (props) =>{
    return <ButtonIcon aria-label="add element" {...props}>
            {props.children}<Icon>add</Icon>
        </ButtonIcon>
    // return <ButtonContinueStyles
    //     variant="contained"
    //     color="primary"
    //     size="small"
    //     startIcon={<SaveIcon />}
    //      >
    //         {props.children}
    // </ButtonContinueStyles>
}
