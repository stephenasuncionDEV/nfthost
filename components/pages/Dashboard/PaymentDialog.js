import React, { useState, forwardRef, useImperativeHandle } from "react"
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const PaymentDialog = (props, ref) => {
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

    return (
        <Dialog
            open={open} 
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default forwardRef(PaymentDialog)