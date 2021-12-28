import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertDisplay = forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = (props, ref) => {
    const [alertData, setAlertData] = useState({severity: "error", message: "Error Code: 1337", duration: 3000});
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen(severity, message, duration = 3000) {
            setAlertData({
                severity: severity,
                message: message,
                duration: duration
            })
            setOpen(true);
        }
    }), [])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ 
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={open} 
            autoHideDuration={alertData.duration} 
            onClose={handleClose}
        >
            <AlertDisplay onClose={handleClose} severity={alertData.severity.toLowerCase()} sx={{ width: '100%' }}>
                {alertData.message}
            </AlertDisplay>
        </Snackbar>   
    )
}

export default forwardRef(Alert);