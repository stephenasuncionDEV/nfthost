import React, { useRef } from "react";
import { useMoralis } from "react-moralis";
import { Toolbar, Divider, Button, Typography } from '@mui/material';
import Sidebar from "./Sidebar"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Alert from "../components/Alert"
import style from "../styles/Layout.module.scss"

const Layout = ({children, currentPage, setCurrentPage, userData}) => {
    const { logout } = useMoralis();
    const alertRef = useRef();

    const onCopyAddress = () => {
        navigator.clipboard.writeText(userData.address);
        alertRef.current.handleOpen("info", "Address copied.");
    }

    return (
        <div className={style.pane}>
            <Alert ref={alertRef}/>
            <Sidebar 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                logout={logout}
            />
            <div className={style.topPane}>
                <Toolbar>
                    <Button 
                        variant="outlined" 
                        startIcon={<ContentCopyIcon/>}
                        style={{
                            borderRadius: 20,
                            border: '1px solid rgb(230, 230, 230)',
                            color: 'rgb(90, 90, 90)',
                            fontSize: 12
                        }}
                        onClick={onCopyAddress}
                    >
                        {userData.address}
                        <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" flexItem />
                        {userData.balance && (
                            `${userData.balance.length > 6 ? userData.balance.substring(0, 6) : userData.balance} ETH`
                        )}
                    </Button>
                </Toolbar>
                <Divider />
                {children}
            </div>
        </div>
    )
}

export default Layout