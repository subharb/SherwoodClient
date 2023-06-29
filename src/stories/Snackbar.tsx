import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface SnackbarProps {
 
}

const SnackbarComponent: React.FC<SnackbarProps> = ({  }) => {
    const [show, setShow] = React.useState(false);

    return (
        <>
        <button onClick={() => setShow(true)}>Show Snackbar</button>
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
            open={show}
            message="I love snacks"
            autoHideDuration={4000}
            onClose={() => setShow(false)}>
               <Alert severity="success">
                    SUcess
                    { show &&
                        <button >
                        Close
                        </button>
                    }
                    
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackbarComponent;
