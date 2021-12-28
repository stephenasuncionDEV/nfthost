import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header"
import Alert from "../components/Alert"
import Login from "../components/Login"

const Index = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [userData, setUserData] = useState({});
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const alertRef = useRef();

    useEffect(() => {
        if (Object.keys(userData).length === 0) return;
        setIsConnected(true);
    }, [userData])

    return (
        <div>
            <Header 
                title="NFT Host"
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
            />
            <Alert ref={alertRef}/>
            {isConnected ? (
                <h3>Connected</h3>
            ) : (
                <Login
                    alertRef={alertRef}
                    setUserData={setUserData}
                    setProvider={setProvider}
                    setSigner={setSigner}
                />
            )}
        </div>
    )
}

export default Index