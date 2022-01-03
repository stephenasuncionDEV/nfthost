import React, { useState, forwardRef, useImperativeHandle } from "react"
import { Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';

const PaymentDialog = (props, ref) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [footer, setFooter] = useState("");
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen(title, description, footer) {  
            setTitle(title);
            setDescription(description);
            setFooter(footer);
            setOpen(true);
        },
        handleClose() {
            setOpen(false);
        }
    }), [])

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    {description}
                </DialogContentText>
                <LinearProgress />
                <DialogContentText sx={{mt:2}}>
                    {footer}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default forwardRef(PaymentDialog)