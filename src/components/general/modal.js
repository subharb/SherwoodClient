import React, {Component} from 'react';
import styled from 'styled-components';

import { Dialog,
    Typography,
    DialogTitle, 
    DialogContent,
    DialogContentText,
    Button, TextField,DialogActions, Card, CardContent
} from "@material-ui/core";
import PropTypes from 'prop-types'; 

export default function Modal(props){

    return(
        <Dialog style={{backgroundColor:"transparent"}}
            PaperProps={props.isTransparent &&
                {
                    style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    },
                }}
            open={props.open}
            onClose={props.closeModal}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            
            {
                props.confirmAction &&
                <DialogActions>
                    {props.closeModal &&
                        <Button onClick={props.closeModal} data-testid="cancel-modal" color="primary">
                            Cancel
                        </Button>
                    }
                    <Button onClick={props.confirmAction} data-testid="continue-modal" color="primary">
                        Continue
                    </Button>
                </DialogActions> 
            }
        </Dialog>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    isTransparent:PropTypes.bool,
    children:PropTypes.element,
    title: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ]),
    closeModal:PropTypes.func
}
