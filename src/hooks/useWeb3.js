import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'
import Web3 from 'web3'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { encrypt, decryptToken } from '@/utils/tools'

export const useWeb3 = () => {
    const toast = useToast();
    const router = useRouter();
    const { setAddress, setIsLoggedIn, setUser, address: userAddress } = useUser();

    const Connect = async (wallet) => {
        try {
            let address = '';

            if (wallet === 'metamask') {
                if (typeof window.ethereum === 'undefined' || (typeof window.web3 === 'undefined')) throw new Error('Metamask is not installed');
                window.web3 = new Web3(window.ethereum) || new Web3(window.web3.currentProvider);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                address = accounts[0];
            }
            else if (wallet === 'phantom') {
                const provider = window.solana;
                if (!provider.isPhantom) throw new Error('Phantom is not installed');
                const sol = await window.solana.connect();
                address = sol.publicKey.toString();
            }

            const token = await axios.post(`${config.serverUrl}/api/member/walletLogin`, {
                address,
                wallet
            })

            const encrypted = encrypt(JSON.stringify(token.data));

            localStorage.setItem('nfthost-user', encrypted);

            if (token.status !== 200) throw new Error('Login Error Code: 0x1');

            const userData = await getUserByAddress(address);

            if (!userData) throw new Error('Login Error Code: 0x2');

            setUser(userData);
            setAddress(address);
            setIsLoggedIn(true);

            posthog.capture('User logged in with crypto wallet', {
                wallet
            });

            return true;
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
            
            return false;
        }
    }

    const Logout = async () => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const userData = decryptToken(storageToken);
            if (userData.wallet === 'phantom') window.solana.disconnect();

            localStorage.removeItem('nfthost-user');

            setAddress('');
            setIsLoggedIn(false);

            router.push('/', undefined, { shallow: true });
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const getUserByAddress = async (address) => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const res = await axios.get(`${config.serverUrl}/api/member/getByAddress`, {
                params: {
                    address
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            if (res.status === 200) {
                setUser(res.data);
            }

            return res.data;
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const AddCount = async (value, service) => {
        return new Promise(async (resolve, reject) => {
            try {
                const storageToken = localStorage.getItem('nfthost-user');
                if (!storageToken) return;

                const token = decryptToken(storageToken, true);
    
                const res = await axios.patch(`${config.serverUrl}/api/member/addCount`, {
                    address: userAddress,
                    service,
                    value
                }, {
                    headers: { 
                        Authorization: `Bearer ${token.accessToken}` 
                    }
                })

                if (res.status === 200) {
                    await getUserByAddress(userAddress);
                    resolve();
                }
            }
            catch (err) {
                reject(err);

                console.error(err);
                toast({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    isClosable: true,
                    position: 'bottom-center'
                })
            }
        });
    }

    const AddFree = async (value, service) => {
        return new Promise(async (resolve, reject) => {
            try {
                const storageToken = localStorage.getItem('nfthost-user');
                if (!storageToken) return;

                const token = decryptToken(storageToken, true);
    
                const res = await axios.patch(`${config.serverUrl}/api/member/addFree`, {
                    address: userAddress,
                    service,
                    value
                }, {
                    headers: { 
                        Authorization: `Bearer ${token.accessToken}` 
                    }
                })

                if (res.status === 200) {
                    await getUserByAddress(userAddress);
                    resolve();
                }
            }
            catch (err) {
                reject(err);

                console.error(err);
                toast({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    isClosable: true,
                    position: 'bottom-center'
                })
            }
        });
    }

    const DeductFree = async (value, service) => {
        return new Promise(async (resolve, reject) => {
            try {
                const storageToken = localStorage.getItem('nfthost-user');
                if (!storageToken) return;

                const token = decryptToken(storageToken, true);
    
                const res = await axios.patch(`${config.serverUrl}/api/member/deductFree`, {
                    address: userAddress,
                    service,
                    value
                }, {
                    headers: { 
                        Authorization: `Bearer ${token.accessToken}` 
                    }
                })

                if (res.status === 200) {
                    await getUserByAddress(userAddress);
                    resolve();
                }
            }
            catch (err) {
                reject(err);
                console.error(err);
                toast({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    isClosable: true,
                    position: 'bottom-center'
                })
            }
        });
    }

    // Get current metamask chain id
    const getChainId = () => {
        return `0x${parseInt(window.ethereum.networkVersion).toString(16)}`;
    }

    // Make sure user is on ETH network
    const isNetworkProtected = async () => {
        const id = getChainId();
        if (id !== '0x1') {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1' }],
            });
        }
    }

    return {
        Connect,
        Logout,
        getUserByAddress,
        AddCount,
        AddFree,
        DeductFree,
        isNetworkProtected
    }
}