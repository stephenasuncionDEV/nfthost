import { useEffect, useRef } from "react"
import { useToast, Button, Icon } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { MdLogin } from 'react-icons/md'
import WalletDialog from "./WalletDialog";
import style from "../styles/Login.module.scss"

const Login = () => {
    const { authenticate, authError } = useMoralis();
    const walletDialogRef = useRef();
    const alert = useToast();

    // Check if there is crypto wallet
    useEffect(() => {
        try {
            if (!window.ethereum) throw new Error("No crypto currency wallet found.");
        } catch (err) {
            alert({
                title: 'Error.',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        }
    }, [])

    // Check result of Wallet Dialog
    const handleWalletChange = (index) => {
        if (index === 0) {
            authenticate({ provider: "metamask", chainId: process.env.CHAIN_ID})
            .then(() => {
                if (authError) throw new Error(authError.message.substring(authError.message.indexOf(':') + 2));
            })
            .catch(err => {
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
        }
    }

    // Show wallet dialog
    const handleConnectWithWallet = () => {
        walletDialogRef.current.show();
    }

    return (
        <div className={style.centerPane}>
            <WalletDialog ref={walletDialogRef} onChange={handleWalletChange} />
            <div id={style.container}>
                <header>
                    <img src="/logo.png" alt="NFT Host Logo" />
                    <h1>NFT Host</h1>
                </header>
                <div id={style.subContainer}>
                    <Button variant='solid' px={6} rightIcon={<Icon as={MdLogin} />} colorScheme='blue' onClick={handleConnectWithWallet}>
                        Connect to a Wallet
                    </Button>
                </div>
            </div>   
        </div>
    )
}

export default Login