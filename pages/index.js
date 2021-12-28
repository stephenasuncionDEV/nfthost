import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header"
import Alert from "../components/Alert"
import Login from "../components/Login"
import Layout from "../components/Layout"

const Index = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [userData, setUserData] = useState({});
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
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
                <Layout 
                    userData={userData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                >
                    {currentPage == 0 && (
                        <h1>Dashboard</h1>
                    )}
                    {currentPage == 1 && (
                        <h1>About</h1>
                    )}
                </Layout>
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