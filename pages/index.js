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
    const {isAuthenticated, user, logout, Moralis} = useMoralis();
    const web3Api = useMoralisWeb3Api();
    const alertRef = useRef();

    useEffect(() => {
        Moralis.onChainChanged(async (chainID) => {
            if (chainID != `0x${process.env.CHAIN_ID}`) {
                logout()
                .then(() => {
                    alertRef.current.handleOpen("error", "Please switch to Ethereum Mainnet");
                });
            }
        });
    }, [Moralis])

    const getUserData = () => {
        Moralis.enableWeb3({ provider: "metamask" })
        .then(res => {
            return Moralis.getChainId();
        })
        .then(chainID => {
            if (chainID != process.env.CHAIN_ID) {
                logout();
                throw new Error("Please switch to Ethereum Mainnet");
            }
            return web3Api.account.getNativeBalance({
                chain: `0x${process.env.CHAIN_ID}`,
                address: user.attributes.ethAddress
            });
        })
        .then(res => {
            setUserData({
                address: user.attributes.ethAddress,
                balance: ethers.utils.formatEther(res.balance)
            })
        })
        .catch(err => {
            alertRef.current.handleOpen("error", err.message);
            return;
        })
    }

    useEffect(() => {
        if (isAuthenticated) {
            getUserData();
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