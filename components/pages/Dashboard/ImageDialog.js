import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ImageDialog = (props, ref) => {
    const {onDeleteItem} = props;
    const [imageIndex, setImageIndex] = useState(null);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen(index) {
            setImageIndex(index);
            setOpen(true);
        }
    }), [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        onDeleteItem(imageIndex);
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image Settings</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want to delete this image?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default forwardRef(ImageDialog)