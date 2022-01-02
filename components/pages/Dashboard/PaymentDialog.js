import React, { useState, forwardRef, useImperativeHandle } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const PaymentDialog = (props, ref) => {
    const {onConfirm} = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen(title, description) {  
            setTitle(title);
            setDescription(description);
            setOpen(true);
        }
    }), [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    }

    return (
        <Dialog
            open={open} 
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} color="success">Buy</Button>
            </DialogActions>
        </Dialog>
    )
}

export default forwardRef(PaymentDialog)