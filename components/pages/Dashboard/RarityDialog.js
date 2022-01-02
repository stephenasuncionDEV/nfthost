import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField } from '@mui/material';
import style from "../../../styles/RarityDialog.module.scss"

const RarityDialog = (props, ref) => {
    const {layerList, setLayerList} = props;
    const [layerIndex , setLayerIndex] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [imageRarityList, setImageRarityList] = useState([]);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen(layerList, index) {  
            setLayerIndex(index);  
            let tempRarityListArray = [];
            let isNew = true;
            layerList[index].images.forEach((image) => {
                tempRarityListArray.push({value: image.percentage, tempValue: image.value});
            });
            setMaxValue(layerList[index].images[0].maxValue);
            setImageRarityList(tempRarityListArray);
            setOpen(true);
        }
    }), [])

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeValue = (e, index) => {
        let tempRarityList = [...imageRarityList];
        tempRarityList[index].tempValue = e.target.value;

        let max = 0;
        tempRarityList.forEach((data) => {
            max += parseInt(data.tempValue);
        })
        setMaxValue(max);

        tempRarityList.forEach((data, idx) => {
            tempRarityList[idx].value = (data.tempValue / max * 100).toFixed(2);
        })

        setImageRarityList(tempRarityList);
    };

    const onSave = () => {
        let tempLayerList = [...layerList];

        tempLayerList[layerIndex].images.forEach((image, idx, array) => {
            array[idx].value = imageRarityList[idx].tempValue;
            array[idx].maxValue = maxValue;
            array[idx].percentage = imageRarityList[idx].value;
        });

        setLayerList(tempLayerList);
        setOpen(false);
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>Rarity Settings</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change rarity of each of your {layerList[layerIndex].name} images
                </DialogContentText>
                <div className={style.layout}>
                    <List>
                        {layerList[layerIndex].images.map((image, idx) => (
                            <ListItem key={idx}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={image.name}
                                        src={image.url}
                                    />
                                </ListItemAvatar>
                                <ListItemText 
                                    sx={{ width: 80 }}
                                    secondary={image.name} 
                                />
                            </ListItem>
                        ))}
                    </List>
                    <List sx={{ width: "100%" }}>
                        {imageRarityList.map((data, idx, array) => (
                            <ListItem key={idx} sx={{ height: 58 }}>
                                <ListItemText 
                                    sx={{ mr: 4 }}
                                    secondary={`${data.value}%`}
                                />
                                <TextField type="number" size="small" value={data.tempValue} min={1} onChange={(e) => onChangeValue(e, idx)}/>
                                <ListItemText
                                    sx={{ ml: 1 }}
                                    secondary="out of"
                                />
                                <TextField sx={{ ml: 1 }} type="number" size="small" value={maxValue} disabled/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSave} color="success">Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default forwardRef(RarityDialog)