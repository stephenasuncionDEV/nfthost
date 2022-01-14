import { useState, useEffect, useRef } from "react"
import { useToast, Box } from '@chakra-ui/react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import { useRouter } from 'next/router'
import Header from "../components/Header"
import Login from "../components/Login"
import Layout from "../components/Layout"
import Home from "../components/pages/Home/Home"
import Dashboard from "../components/pages/Dashboard/Dashboard";
import Payments from "../components/pages/Payments/Payments";
import About from "../components/pages/About/About"
import CookieDrawer from "../components/CookieDrawer"

const Index = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { Moralis, isAuthenticated, user, logout, setUserData } = useMoralis();
    const web3Api = useMoralisWeb3Api();
    const alert = useToast();
    const router = useRouter();
    const { page } = router.query;
    const cookieDrawerRef = useRef();

    // Check if there is crypto wallet
    useEffect(() => {
        try {
            if (!window.ethereum) throw new Error("No crypto currency wallet found. Please install Metamask extension.");
        } catch (err) {
            alert({
                title: 'Error.',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        }
    }, [])

    // Get current page through query param
    useEffect(() => {
        if (page == null) return;
        if (page === "home") setCurrentPage(0);
        else if (page === "dashboard") setCurrentPage(1);
        else if (page === "payments") setCurrentPage(2);
        else if (page === "about") setCurrentPage(3);
    }, [router])

    // Check if network changed
    useEffect(() => {
        if (Moralis == null) return;
        Moralis.onChainChanged(async (chainID) => {
            if (chainID != `0x${process.env.CHAIN_ID}`) {
                logout()
                .then(() => {
                    throw new Error("Please switch to Ethereum Mainnet Network.");
                })
                .catch(err => {
                    alert({
                        title: 'Error',
                        description: err.message,
                        status: 'error',
                        duration: 5000,
                    })
                    location.href='/'
                })
            }
        });
    }, [Moralis])

    // Check if user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
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
                return setUserData({
                    balance: Moralis.Units.FromWei(res.balance).toString()
                })
            })
            .then(res => {
                if (user.attributes.cookie == null) {
                    setUserData({
                        cookie: false
                    })
                }
                if (user.attributes.cookie != true) cookieDrawerRef.current.show();
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
    }, [isAuthenticated])

    return (
        <Box h='100%'>
            <Header 
                title="NFT Host"
                description="NFT Host is a website where you can generate NFT collections and create NFT minting website."
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                robots={true}
                language="English"
                image="/logo.png"
            />
            <CookieDrawer ref={cookieDrawerRef} />
            {isAuthenticated ? (
                <Layout currentPage={currentPage}>
                    {currentPage === 0 && <Home />}
                    {currentPage === 1 && <Dashboard />}
                    {currentPage === 2 && <Payments />}
                    {currentPage === 3 && <About />}
                </Layout>
            ) : (
                <Login />
            )}
        </Box>
    )
}

export default Index