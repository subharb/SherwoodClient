import React, {Component} from 'react';
import { Dialog,
    Typography,
    DialogTitle, 
    DialogContent,
    DialogContentText,
    Button, TextField,DialogActions, Card, CardContent, IconButton
} from "@mui/material";
import PropTypes from 'prop-types'; 
import { Translate } from 'react-localize-redux';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';

export default function Modal(props){
    let paperStyles = props.medium ? {
        [`@media (min-width: 1024px)`]: {
            display:'none',
            minWidth: "800px"
        }
          
    } : {};
    paperStyles = props.isTransparent ? {...paperStyles, 
        backgroundColor: 'transparent',
        boxShadow: 'none',
        } : paperStyles;
    
    return (
        <Dialog className='modal' maxWidth="lg" fullWidth={props.fullWidth} disableEscapeKeyDown 
            PaperProps={{style : paperStyles}}
            open={props.open}
            disablePortal={false}
            onClose={props.closeModal}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            {props.closeModal &&
                    <IconButton id="close-modal"
                        style={{position:"absolute",right:"0px"}}
                        onClick={props.closeModal}
                        size="large">
                        <CloseIcon />
                    </IconButton>
                }
            
            <DialogContent style={{display:"flex",justifyContent:"center"}} >
                {props.children}
            </DialogContent>
            
            {
                props.confirmAction &&
                <DialogActions>
                    {props.closeModal &&
                        <Button onClick={props.closeModal} data-testid="cancel-modal" style={{color:red[500]}}>
                            <Translate id="general.cancel" />
                        </Button>
                    }
                    <Button onClick={props.confirmAction} data-testid="continue-modal" color="green">
                        <Translate id={props.confirmButtonLabel || "general.continue"} />
                    </Button>
                </DialogActions> 
            }
        </Dialog>
    );
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    isTransparent:PropTypes.bool,
    medium:PropTypes.bool,
    size:PropTypes.string,
    fullWidth:PropTypes.bool,
    children:PropTypes.element,
    title: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ]),
    closeModal:PropTypes.func,
    confirmAction:PropTypes.func,
    confirmButtonLabel:PropTypes.string
}
