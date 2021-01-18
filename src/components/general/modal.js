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

const ModalContent = styled.div`
    
`;

export default function Modal(props){

    return(
        <Dialog
            open={props.open}
            onClose={props.closeModal}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={this.closeModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => this.handleAddField} color="primary">
                    Save
                </Button>
            </DialogActions> */}
        </Dialog>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ]),
    closeModal:PropTypes.func
}
