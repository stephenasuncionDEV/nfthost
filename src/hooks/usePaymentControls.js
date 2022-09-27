import { useRouter } from 'next/router'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useUser } from '@/providers/UserProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCoreControls } from '@/hooks/useCoreControls'
import { useMemberControls } from '@/hooks/useMemberControls'
import Web3 from 'web3'
import axios from 'axios'
import posthog from 'posthog-js'
import config from '@/config/index'
import { decryptToken, getPriceFromService, getCurrencyFromWallet } from '@/utils/tools'
import * as solanaWeb3 from '@solana/web3.js'
import { getAccessToken } from '@/utils/tools'
import errorHandler from '@/utils/errorHandler'

export const usePaymentControls = () => {
    const router = useRouter();
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const { user } = useUser();
    const { 
        isNetworkProtected, 
        addUnit, 
        updateEmail 
    } = useMemberControls();
    const { 
        provider,
        paymentData,
        paymentName,
        paymentEmail,
        paymentAddress,
        paymentCity,
        paymentState,
        paymentZip,
        setIsPaying,
        setIsKeepWorkingModal,
        setPaymentData,
        referrer
    } = useCore();
    const { 
        setWebsites,
        editingWebsite
    } = useWebsite();
    const [isCanceling, setIsCanceling] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const { addReferral } = useCoreControls();

    const pay = (paymentData) => {
        try {
            setPaymentData({
                ...paymentData,
                due: new Date()
            })

            router.push('/payment', undefined, { shallow: true }); 
        }
        catch (err) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const createTransactionSolana = async (connection, provider, instructions) => {
        const anyTransaction = new solanaWeb3.Transaction().add(instructions);
        anyTransaction.feePayer = provider.publicKey;
        anyTransaction.recentBlockhash = (
            await connection.getRecentBlockhash()
        ).blockhash;
        return anyTransaction;
    }

    const payWithCrypto = async () => {
        try {
            if (!provider) throw new Error('Cannot find web3 provider. Please relogin.');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const userData = decryptToken(storageToken);
            const wallet = userData.wallet;
            
            const service = paymentData.service.toLowerCase();

            const currency = getCurrencyFromWallet(wallet || 'metamask');
            const price = getPriceFromService(service, currency);

            await isNetworkProtected(wallet);

            setIsPaying(true);

            let hash = 'n/a';

            if (wallet === 'metamask' || wallet === 'coinbase' || wallet === 'walletconnect') {
                const txHash = await window.web3.eth.sendTransaction({
                    from: provider.selectedAddress || userData.address,
                    to: config.nfthost.wallet_metamask,
                    value: Web3.utils.toWei(price.toFixed(7).toString(), 'ether')
                })
                hash = txHash.blockHash;
            } 
            else if (wallet === 'phantom') {
                const connection = new solanaWeb3.Connection(
                    solanaWeb3.clusterApiUrl(process.env.CHAIN_ID === '0x89' ? 'mainnet-beta': 'devnet'), 
                );

                const { signature } = await provider.signAndSendTransaction(await createTransactionSolana(
                    connection,
                    provider,
                    solanaWeb3.SystemProgram.transfer({
                        fromPubkey: provider.publicKey,
                        toPubkey: config.nfthost.wallet_phantom,
                        lamports: solanaWeb3.LAMPORTS_PER_SOL * price,
                    })
                ));

                await connection.confirmTransaction(signature);
                hash = signature;
            }
            else {
                throw new Error('Your wallet is currently not supported for payment, please login with a different wallet provider')
            }

            if (service === 'website') {
                let premiumEndDate = new Date();
                premiumEndDate.setDate(premiumEndDate.getDate() + 30);
                const accessToken = getAccessToken();
                // const subscriptionId = clientData.data.subscriptionId;
                const res = await axios.patch(`${config.serverUrl}/api/website/updateSubscription`, {
                    memberId: user._id,
                    subscriptionId: 'temporary',
                    isPremium: true,
                    isExpired: false,
                    isPublished: editingWebsite.isPublished || false,
                    premiumStartDate: new Date(),
                    premiumEndDate: premiumEndDate
                }, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    }
                })

                setWebsites(res.data);
            }

            posthog.capture('User paid with crypto wallet', {
                wallet
            });

            await addUnit(service);
            await addPayment(hash);

            toast({
                title: 'Success',
                description: 'Successfuly Purchased Item',
                status: 'success'
            })
            
            await addReferral(referrer);

            setIsKeepWorkingModal(true);
            setIsPaying(false);
        }
        catch (err) {
            setIsPaying(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const payWithStripe = async (stripe, elements, CardElement) => {
        try {
            setIsPaying(true);

            if (!elements || !stripe) throw new Error('Error initializing stripe payment');

            const fieldsLength = [paymentName.length, paymentEmail.length, paymentAddress.length, paymentCity.length, paymentState.length, paymentZip.length];
            fieldsLength.forEach((field) => {
                if (field === 0) throw new Error("Please fill in all the required fields");
            })

            const re = /^\S+@\S+\.\S+$/
            if (!re.test(paymentEmail)) throw new Error("Email address must be valid");

            const billingDetails = {
                name: paymentName,
                email: paymentEmail,
                address: {
                    city: paymentCity,
                    line1: paymentAddress,
                    state: paymentState,
                    postal_code: paymentZip
                }       
            }

            const accessToken = getAccessToken();
            const service = paymentData.service.toLowerCase();
            const price = getPriceFromService(service); 

            const paymentType = {
                generator: 'onetime',
                utils: 'onetime',
                website: 'subscription'
            }[service];

            let clientData;
            if (paymentType === 'subscription') {
                clientData = await axios.post(`${config.serverUrl}/api/payment/requestSubscription`, {
                    service,
                    billingDetails,
                    customerId: user.customerId,
                    metadata: {
                        walletProvider: user.wallet,
                        walletAddress: user.address
                    }
                }, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    }
                })
            }
            else {
                clientData = await axios.post(`${config.serverUrl}/api/payment/request`, {
                    billingDetails,
                    amount: price,
                    customerId: user.customerId,
                    metadata: {
                        walletProvider: user.wallet,
                        walletAddress: user.address
                    }
                }, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    }
                })
            }

            const cardElement = elements.getElement(CardElement);

            const paymentMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails,
            });

            if (paymentMethod.error) throw new Error(paymentMethod.error.code);

            const transaction = await stripe.confirmCardPayment(clientData.data.clientSecret, {
                payment_method: paymentMethod.paymentMethod.id
            });

            if (transaction.error) throw new Error(transaction.error.code);
            
            if (service === 'website') {
                const subscriptionId = clientData.data.subscriptionId;
                const res = await axios.patch(`${config.serverUrl}/api/website/updateSubscription`, {
                    memberId: user._id,
                    subscriptionId,
                    isPremium: true,
                    isExpired: false,
                    isPublished: editingWebsite.isPublished || false,
                    premiumStartDate: new Date(),
                    premiumEndDate: null
                }, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    }
                })

                setWebsites(res.data);
            }

            posthog.capture('User paid with stripe', {
                price: paymentData.price
            });

            await addUnit(service);
            await addPayment(transaction.paymentIntent.id);
            await updateEmail(paymentEmail);

            toast({
                title: 'Success',
                description: 'Successfuly Purchased Item',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })

            setIsKeepWorkingModal(true);
            setIsPaying(false);
        }
        catch (err) {
            setIsPaying(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const addPayment = async (hash) => {
        try {
            const accessToken = getAccessToken();
            const service = paymentData.service.toLowerCase();
            const price = getPriceFromService(service);
    
            await axios.post(`${config.serverUrl}/api/payment/add`, {
                memberId: user._id,
                hash,
                service,
                price,
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })
        }
        catch (err) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const getSubscriptions = async () => {
        try {
            const accessToken = getAccessToken();

            const res = await axios.get(`${config.serverUrl}/api/payment/getSubscriptions`, {
                params: {
                    customerId: user.customerId
                },
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return;

            setSubscriptions(res.data);
        }
        catch (err) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const getSubscription = async (subscriptionId) => {
        try {
            const accessToken = getAccessToken();

            const res = await axios.get(`${config.serverUrl}/api/payment/getSubscription`, {
                params: {
                    subscriptionId
                },
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return;

            setSubscriptions(res.data);
        }
        catch (err) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const cancelSubscription = async (subscriptionId) => {
        try {
            setIsCanceling(true);

            const accessToken = getAccessToken();

            const res = await axios.post(`${config.serverUrl}/api/payment/cancelSubscription`, {
                subscriptionId
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot cancel subscription at the moment');

            setSubscriptions((prevSubscriptions) => {
                return prevSubscriptions.filter((sub) => sub.id !== res.data.id);
            })

            toast({
                title: 'Success',
                status: 'success',
                description: 'Successfully canceled subscription'
            })

            setIsCanceling(false);
        }   
        catch (err) {
            setIsCanceling(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    return {
        pay,
        payWithCrypto,
        payWithStripe,
        cancelSubscription,
        isCanceling,
        getSubscriptions,
        subscriptions,
        getSubscription
    }
}