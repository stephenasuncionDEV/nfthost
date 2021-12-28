import React, { useState, forwardRef, useImperativeHandle } from "react";
import { List, ListItem, ListItemIcon, ListItemText, DialogTitle, Dialog } from '@mui/material';
import MetamaskIcon from "./icons/MetamaskIcon"
import style from "../styles/WalletDialog.module.scss"

const walletList = [{name: "MetaMask", icon: 0}];

const SimpleDialog = (props) => {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Connect to Wallet</DialogTitle>
            <List>
                {walletList.map((wallet, idx) => (
                    <ListItem className={style.item} button onClick={() => handleListItemClick(wallet.name)} key={idx}>
                        <ListItemIcon>
                            {wallet.icon == 0 && (<MetamaskIcon size={25} />)}
                        </ListItemIcon>
                        <ListItemText primary={wallet.name} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )
}

const WalletDialog = (props, ref) => {
    const {setSelectedWallet} = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
    }), [])
    
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setSelectedWallet(value);
    };

    return (
        <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
        />
    )
}

export default forwardRef(WalletDialog);