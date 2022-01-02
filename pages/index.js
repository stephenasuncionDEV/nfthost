import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers"
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Header from "../components/Header"
import Alert from "../components/Alert"
import Login from "../components/Login"
import Layout from "../components/Layout"
import Home from "../components/pages/Home/Home"
import Dashboard from "../components/pages/Dashboard/Dashboard";
import About from "../components/pages/About/About"

const Index = () => {
    const [userData, setUserData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const {isAuthenticated, account} = useMoralis();
    const web3Api = useMoralisWeb3Api();
    const alertRef = useRef();

    const getBalance = () => {
        web3Api.account.getNativeBalance({
            chain: "rinkeby",
            address: account
        })
        .then(res => {
            setUserData({
                address: account,
                balance: ethers.utils.formatEther(res.balance)
            })
        })
        .catch(err => {
            alertRef.current.handleOpen("error", err.message);
        })
    }

    useEffect(() => {
        if (isAuthenticated) {
            getBalance();
        }
    }, [isAuthenticated])

    return (
        <div>
            <Header 
                title="NFT Host"
                description="NFT Host is a website where you can host your ERC721 drops. Upload your nft collection(s) and share it with anyone!!!"
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                robots={true}
                language="English"
                image="/logo.png"
            />
            <Alert ref={alertRef}/>
            {isAuthenticated ? (
                <Layout 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    userData={userData}
                >
                    {currentPage == 0 && (
                        <Home 
                            alertRef={alertRef}
                        />
                    )}
                    {currentPage == 1 && (
                        <Dashboard 
                            alertRef={alertRef}
                        />
                    )}
                    {currentPage == 2 && (
                        <About />
                    )}
                </Layout>
            ) : (
                <Login
                    alertRef={alertRef}
                />
            )}
        </div>
    )
}

export default Index