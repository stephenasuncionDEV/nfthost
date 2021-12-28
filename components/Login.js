import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import LoginIcon from '@mui/icons-material/Login';
import WalletDialog from "./WalletDialog";
import style from "../styles/Login.module.scss"

const Login = ({alertRef, setUserData, setProvider, setSigner}) => {
    const [selectedWallet, setSelectedWallet] = useState("");
    const walletDialogRef = useRef();

    useEffect(() => {
        if (selectedWallet.length == 0) return;
        try {
            if (!window.ethereum) {
                throw new Error("No crypto currency wallet found.")
            }
            if (selectedWallet == "MetaMask") {
                metamaskLoginHandler();
            }
        }
        catch (err) {
            alertRef.current.handleOpen("error", err.message);
        }
    }, [selectedWallet])

    const metamaskLoginHandler = () => {
        try {
            window.ethereum.sendAsync({ method: 'eth_requestAccounts' }, (err, res) => {
                if (err) throw new Error(err);

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                const signer = provider.getSigner();
                setSigner(signer);

                let userAccount = "";
                provider.listAccounts()
                .then(account => {
                    userAccount = account[0];
                    return provider.getBalance(account[0]);
                })
                .then(balance => {
                    const userData = {
                        address: userAccount,
                        balance: ethers.utils.formatEther(balance)
                    }
                    setUserData(userData);
                })
                .catch(err => {
                    alertRef.current.handleOpen("error", err);
                })
            });
        }
        catch (err) {
            alertRef.current.handleOpen("error", err);
        }
    }

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