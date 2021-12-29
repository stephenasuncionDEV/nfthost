import React, { useState, useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import LoginIcon from '@mui/icons-material/Login';
import WalletDialog from "./WalletDialog";
import style from "../styles/Login.module.scss"

const Login = ({alertRef}) => {
    const [selectedWallet, setSelectedWallet] = useState("");
    const { authenticate } = useMoralis();
    const walletDialogRef = useRef();

    useEffect(() => {
        if (selectedWallet.length == 0) return;
        try {
            if (!window.ethereum) {
                throw new Error("No crypto currency wallet found.")
            }
            if (selectedWallet == "MetaMask") {
                authenticate({ provider: "metamask" });
            }
        }
        catch (err) {
            alertRef.current.handleOpen("error", err.message);
        }
    }, [selectedWallet])

    return (
        <div className={style.centerPane}>
            <div id={style.container}>
                <WalletDialog ref={walletDialogRef} setSelectedWallet={setSelectedWallet}/>
                <header>
                    <img src="/logo.png" alt="NFT Host Logo" />
                    <h1>NFT Host</h1>
                </header>
                <div id={style.subContainer}>
                    <button className={[style.btn, style.btnIcon, style.btnOther].join(" ")} onClick={() => walletDialogRef.current.handleOpen()}>
                        <LoginIcon />
                        <span>Login with Wallet</span>
                    </button>
                </div>
            </div>   
        </div>
    )
}

export default Login