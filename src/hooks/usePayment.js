import { useToast } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useWeb3 } from './useWeb3'
import Web3 from 'web3'
import axios from 'axios'
import posthog from 'posthog-js'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'

export const usePayment = () => {
    const toast = useToast();
    const { isNetworkProtected, AddGeneration } = useWeb3();
    const { 
        paymentData,
        paymentName,
        paymentEmail,
        paymentAddress,
        paymentCity,
        paymentState,
        paymentZip,
        setIsPaying
    } = useCore();

    const PayWithCrypto = async () => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const userData = decryptToken(storageToken);
            const wallet = userData.wallet;
            const PRICE = 0.014;

            if (wallet === 'metamask') {
                await isNetworkProtected();

                const txHash = await window.web3.eth.sendTransaction({
                    from: window.ethereum.selectedAddress,
                    to: config.nfthost.wallet_metamask,
                    value: Web3.utils.toWei(PRICE.toFixed(7).toString(), "ether")
                })

                posthog.capture('User paid with metamask wallet', {
                    price: 25
                });
            }
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

    const PayWithStripe = async (stripe, elements, memberId, CardElement) => {
        try {
            if (!elements || !stripe) throw new Error('Error initializing stripe payment');

            // Check field length
            const fieldsLength = [paymentName.length, paymentEmail.length, paymentAddress.length, paymentCity.length, paymentState.length, paymentZip.length];
            fieldsLength.forEach((field) => {
                if (field === 0) throw new Error("Please fill in all the required fields");
            })

            // Validate Email
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

            setIsPaying(true);

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const clientData = await axios.post(`${config.serverUrl}/api/payment/`, {
                email: paymentEmail,
                amount: 'generator'
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            const cardElement = elements.getElement(CardElement);

            const paymentMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails,
            });

            if (paymentMethod.error) throw new Error(paymentMethod.error.code);

            const transaction = await stripe.confirmCardPayment(clientData.data.secret, {
                payment_method: paymentMethod.paymentMethod.id
            });

            if (transaction.error) throw new Error(transaction.error.code);

            const ADD_GENERATION_INDEX = 1;
            await AddGeneration(ADD_GENERATION_INDEX);

            // TODO: Add to payments data

            setIsPaying(false);

            //sucess
            toast({
                title: 'Success',
                description: 'Successfuly purchased 1 NFT collection generation',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })

            posthog.capture('User paid with stripe', {
                price: paymentData.price
            });
        }
        catch (err) {
            console.error(err);
            setIsPaying(false);
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

    return {
        PayWithCrypto,
        PayWithStripe
    }
}