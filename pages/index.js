import { useState, useEffect } from "react"
import { useToast, Box } from '@chakra-ui/react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import Header from "../components/Header"
import Login from "../components/Login"
import Layout from "../components/Layout"
import Home from "../components/pages/Home/Home"
import Dashboard from "../components/pages/Dashboard/Dashboard";
import About from "../components/pages/About/About"

const Index = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {Moralis, isAuthenticated, user, logout, setUserData} = useMoralis();
    const web3Api = useMoralisWeb3Api();
    const alert = useToast();

    useEffect(() => {
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
                        duration: 3000,
                    })
                })
            }
        });
    }, [Moralis])

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
                setUserData({
                    balance: Moralis.Units.FromWei(res.balance).toString()
                })
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
                description="NFT Host is a website where you can host your ERC721 drops. Upload your nft collection(s) and share it with anyone!!!"
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                robots={true}
                language="English"
                image="/logo.png"
            />
            {isAuthenticated ? (
                <Layout 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                >
                    {currentPage == 0 && <Home />}
                    {currentPage == 1 && <Dashboard />}
                    {currentPage == 2 && <About />}
                </Layout>
            ) : (
                <Login />
            )}
        </Box>
    )
}

export default Index