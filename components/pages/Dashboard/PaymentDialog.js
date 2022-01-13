import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, 
    ModalHeader, ModalBody, ModalCloseButton, ModalFooter, 
    FormControl, FormLabel, Input, HStack, useToast, Box, 
    Button } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";

const PaymentDialog = (props, ref) => {
    const { onSuccess } = props;
    const { Moralis, user } = useMoralis();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isError, setIsError] = useState([false, false, false, false, false, false]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [price, setPrice] = useState(20);
    const [title, setTitle] = useState('Payments');
    const stripe = useStripe();
    const elements = useElements();
    const alert = useToast();

    useImperativeHandle(ref, () => ({
        show(title = 'Payments', price = 20) {  
            setTitle(title);
            setPrice(price);
            setIsError([false, false, false, false, false, false]);
            onOpen();
        }
    }), [])

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const handleStateChange = (e) => {
        setState(e.target.value);
    }

    const handleZipChange = (e) => {
        setZip(e.target.value);
    }

    const handleClear = () => {
        setName("");
        setEmail("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
    }

    const handlePay = () => {
        try {
            // Check field length
            const fieldsLength = [name.length, email.length, address.length, city.length, state.length, zip.length];
            fieldsLength.forEach((field, idx) => {
                if (field === 0) {
                    let newIsErrorList = [...isError];
                    newIsErrorList[idx] = true;
                    setIsError(newIsErrorList);
                    throw new Error("Please fill in all the required fields");
                }
            })

            // Validate Email
            const re = /^\S+@\S+\.\S+$/
            if (!re.test(email)) {
                let newIsErrorList = [...isError];
                newIsErrorList[1] = true;
                setIsError(newIsErrorList);
                throw new Error("Invalid email address.");
            }

            // Begin Payment Transaction
            onPay();

        } catch (err) {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        }
    }

    const onPay = () => {
        const billingDetails = {
            name,
            email,
            address: {
                city,
                line1: address,
                state,
                postal_code: zip
            }       
        }

        setIsProcessing(true);

        let clientSecret;
        let paymentMethodReq;

        axios.post("/api/payment", {
            amount: price * 100,
            email: email
        })
        .then(res => {
            clientSecret = res.data;
            const cardElement = elements.getElement(CardElement);
            return stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            })
        })
        .then(res => {
            paymentMethodReq = res;
            return stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            })
        })
        .then(res => {
            const transactionsClass = Moralis.Object.extend("Transactions");
            const transaction = new transactionsClass();
            transaction.set('owner', user.attributes.ethAddress);
            transaction.set('type', 'stripe');
            transaction.set('amount', price);
            transaction.set('status', 'paid');
            transaction.set('paymentID', res.paymentIntent.id);
            return transaction.save();
        })
        .then(res => {
            onSuccess();
            setIsProcessing(false);
            handleClear();
            onClose();
        })
        .catch(err => {
            setIsProcessing(false);
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        })
    }

    const cardElementOptions = {
        hidePostalCode: true
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isInvalid={isError[0]} isRequired>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input 
                            id='name' 
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                        />
                    </FormControl>
                    <FormControl mt='2' isInvalid={isError[1]} isRequired>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input 
                            id='email' 
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl mt='2' isInvalid={isError[2]} isRequired>
                        <FormLabel htmlFor='address'>Address</FormLabel>
                        <Input 
                            id='address' 
                            type='text'
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </FormControl>
                    <HStack mt='2'>
                        <FormControl isInvalid={isError[3]} isRequired>
                            <FormLabel htmlFor='city'>City</FormLabel>
                            <Input 
                                id='city' 
                                type='text'
                                value={city}
                                onChange={handleCityChange}
                            />
                        </FormControl>
                        <FormControl isInvalid={isError[4]} isRequired>
                            <FormLabel htmlFor='state'>State</FormLabel>
                            <Input 
                                id='state' 
                                type='text'
                                value={state}
                                onChange={handleStateChange}
                            />
                        </FormControl>
                    </HStack>
                    <FormControl isInvalid={isError[5]} isRequired>
                        <FormLabel htmlFor='zip'>ZIP</FormLabel>
                        <Input 
                            id='zip' 
                            type='text'
                            value={zip}
                            onChange={handleZipChange}
                        />
                    </FormControl>
                    <Box mt='4' p='5' bg='gray.100' borderRadius='10px'>
                        <CardElement options={cardElementOptions}/>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        flex='1'
                        variant='solid'
                        bg='black'
                        color='white'
                        _hover={{
                            bg: 'rgb(50,50,50)'
                        }}
                        onClick={handlePay}
                        isLoading={isProcessing}
                        loadingText="Processing"
                    >
                        Pay ${price}.00
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(PaymentDialog)