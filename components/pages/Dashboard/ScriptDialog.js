import React, { useState, forwardRef, useImperativeHandle } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const ScriptDialog = (props, ref) => {
    const {alertRef, layerList, setLayerList} = props;
    const [script, setScript] = useState("");
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen() {  
            setOpen(true);
        },
        runScript(script) {
            setScript(script);
            onRun();
        }
    }), [])

    const handleClose = () => {
        setOpen(false);
    }

    const determineLayer = () => {
        if (script.indexOf("layers=") != -1) {
            let newLayers = [];
            let retLayers = [];
            const scripts = script.split("\n");
            scripts.forEach((line, idx) => {
                if (line.indexOf("layers=") != -1) {
                    const stringArray = line.substring(line.indexOf("layers=") + 7);
                    newLayers = [...JSON.parse(stringArray)];
                }
            });
            newLayers.forEach((layer, idx) => {
                retLayers.push({
                    name: layer,
                    images: []
                })
            });
            if (layerList.length + retLayers.length > 6) {
                alertRef.current.handleOpen("error", "You cannot have more than 6 layers.");
                return;
            } else {
                setLayerList([...layerList, ...retLayers]);
            }    
        }
    }

    const onRun = () => {
        determineLayer();
        setOpen(false);
    }

    const onTab = (e) => {
        if (e.key == "Tab") {
            e.preventDefault();
        }
    }

    const onScript = (e) => {
        setScript(e.target.value);
    }

    return (
        <Dialog
            open={open} 
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>Script</DialogTitle>
            <DialogContent>
                <TextField
                    label="script"
                    rows={10}
                    fullWidth
                    multiline
                    sx={{mt: 1}}
                    onKeyDown={onTab}
                    value={script}
                    onChange={onScript}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onRun} color="success">Run</Button>
            </DialogActions>
        </Dialog>
    )
}

export default forwardRef(ScriptDialog)