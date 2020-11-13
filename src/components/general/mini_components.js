import React from 'react';
import styled from 'styled-components';
import { Button, SaveIcon, Icon } from '@material-ui/core';

export const DeleteHolder = styled.div`
    display: flex;
    color:#E16580;
    cursor:pointer;
`;

export const EditConsent = styled.i`
    display: inline;
    color:#E16580;
    cursor:pointer;
`;

export const ButtonCancel = styled.button`
    background-color:${props => props.theme.buttonCancel.background};
    color:${props => props.theme.buttonCancel.color};
`;
export const ButtonContinueStyles = styled(Button)`
    background-color:${props => props.theme.buttonContinue.background}!important;
    color:${props => props.theme.buttonContinue.color};
`;

export const ButtonContinue = (props) =>{
        return <ButtonContinueStyles
            variant="contained"
            color="primary"
            size="small"
            {...props}
            endIcon={<Icon>send</Icon>}
        >
            {props.children}
        </ButtonContinueStyles>
}

export const ButtonSave = (props) =>{
    return <ButtonContinueStyles
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
         >
            {props.children}
    </ButtonContinueStyles>
}
