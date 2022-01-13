import { useState, useEffect, useRef } from "react"
import { useToast, Box, Text, Button } from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import { useMoralis } from "react-moralis"
import { getEthPriceNow } from "get-eth-price";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import uniqid from 'uniqid';
import WebsiteList from "./WebsiteList"
import AddWebsiteDialog from "./AddWebsiteDialog"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"
import PaymentMethodDialog from "../PaymentMethodDialog";
import PaymentLoadingDialog from "../PaymentLoadingDialog";
import PaymentDialog from "../PaymentDialog";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const HostContainer = () => {
    const { Moralis, user, setUserData } = useMoralis();
    const [curWebsite, setCurWebsite] = useState(null);
    const websiteListRef = useRef();
    const addWebsiteDialogRef = useRef();
    const confirmDeleteDialogRef = useRef();
    const paymentMethodDialogRef = useRef();
    const paymentMethodDialogRef2 = useRef();
    const paymentLoadingDialogRef = useRef();
    const paymentDialogRef = useRef();
    const paymentDialogRef2 = useRef();
    const alert = useToast();

    useEffect(() => {
        if (user == null) return;
        
        // Initialize hostSize (for new users)
        if (user.attributes.websites == null) {
            setUserData({
                websites: [],
                hostSize: 1
            });
        }
    }, [user])

    const handleAddSite = () => {
        if (user.attributes.websites.length >= user.attributes.hostSize) {
            paymentMethodDialogRef.current.show();
        } else {
            addWebsiteDialogRef.current.show();
        }    
    }

    const handleEditSite = (website) => {
        addWebsiteDialogRef.current.show(website);
    }

    const handleRenewSite = (website) => {
        setCurWebsite(website);
        paymentMethodDialogRef2.current.show();
    }

    const handleDeleteSite = (website) => {
        confirmDeleteDialogRef.current.show(website);
    }

    const handlePaymentMethodChange = (method) => {
        if (method === 'metamask') {
            paymentLoadingDialogRef.current.show({
                title: "Buy a Premium Website",
                footer: "You will be prompted 1 transaction"
            });
            getEthPriceNow()
            .then(data => {
                const ethPrice = 5 / data[Object.keys(data)[0]].ETH.USD;
                const val = ethPrice.toString().substring(0, 11);
                return Moralis.transfer({
                    type: "native", 
                    amount: Moralis.Units.ETH(val), 
                    receiver: process.env.METAMASK_ADDRESS
                })
            })
            .then(res => {
                const transactionsClass = Moralis.Object.extend("Transactions");
                const transaction = new transactionsClass();
                transaction.set('owner', user.attributes.ethAddress);
                transaction.set('type', 'metamask');
                transaction.set('amount', 5);
                transaction.set('status', 'paid');
                transaction.set('paymentID', res.blockHash);
                return transaction.save();
            })
            .then(res => {
                return handlePaymentSuccess();
            })
            .then(res => {
                paymentLoadingDialogRef.current.hide();
            })
            .catch(err => {
                paymentLoadingDialogRef.current.hide();
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
        }
        else if (method === 'stripe') {
            paymentDialogRef.current.show("Buy a Premium Website", 5);
        }
    }

    const handlePaymentSuccess = () => {
        const hostSize = user.attributes.hostSize;
        return setUserData({
            hostSize: hostSize + 1
        })
        .then(res => {
            alert({
                title: 'Success',
                description: "Successfully purchased premium website.",
                status: 'success',
                duration: 3000,
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

    const handlePaymentMethodChange2 = (method) => {
        if (method === 'metamask') {
            paymentLoadingDialogRef.current.show({
                title: "Renew a Premium Website",
                footer: "You will be prompted 1 transaction"
            });
            getEthPriceNow()
            .then(data => {
                const ethPrice = 5 / data[Object.keys(data)[0]].ETH.USD;
                const val = ethPrice.toString().substring(0, 11);
                return Moralis.transfer({
                    type: "native", 
                    amount: Moralis.Units.ETH(val), 
                    receiver: process.env.METAMASK_ADDRESS
                })
            })
            .then(res => {
                const transactionsClass = Moralis.Object.extend("Transactions");
                const transaction = new transactionsClass();
                transaction.set('owner', user.attributes.ethAddress);
                transaction.set('type', 'metamask');
                transaction.set('amount', 5);
                transaction.set('status', 'paid');
                transaction.set('paymentID', res.blockHash);
                return transaction.save();
            })
            .then(res => {
                return handlePaymentSuccess2();
            })
            .then(res => {
                paymentLoadingDialogRef.current.hide();
            })
            .catch(err => {
                paymentLoadingDialogRef.current.hide();
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
        }
        else if (method === 'stripe') {
            paymentDialogRef2.current.show("Renew a Premium Website", 5);
        }
    }

    const handlePaymentSuccess2 = () => {
        if (curWebsite == null) return;

        const curDate = new Date();
        const expiryDate = new Date(curDate.setMonth(curDate.getMonth()+1));
        const websiteClass = Moralis.Object.extend("Website");
        const query = new Moralis.Query(websiteClass);
        query.equalTo("url", curWebsite.url);
        return query.first()
        .then(res => {
            res.set('expiresAt', expiryDate);
            return res.save();
        })
        .then(res => {
            alert({
                title: 'Website Renewed',
                description: `${curWebsite.header} has been renewed.`,
                status: 'success',
                duration: 3000,
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

    const onDelete = (data) => {
        // Get website array and index of current website
        const websiteArr = user.attributes.websites;
        const websiteIndex = websiteArr.findIndex(res => res.url == data.url);

        // Delete current website from temp array
        let newWebsiteList = [...websiteArr];
        newWebsiteList.splice(websiteIndex, 1);

        // Update user data
        setUserData({
            websites: newWebsiteList
        })
        .then(res => {
            const websiteClass = Moralis.Object.extend("Website");
            const query = new Moralis.Query(websiteClass);
            query.equalTo("url", data.url);
            return query.first();
        })
        .then(res => {
            return res.destroy();
        })
        .then(res => {
            websiteListRef.current.refresh();
            alert({
                title: 'Success',
                description: "Website has been deleted.",
                status: 'success',
                duration: 3000,
            })
        })
        .catch(err =>  {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        })
    }

    const onSave = (data) => {
        const { url, title, header, description, iframe, image, isRobot, language, keywordsList } = data;

        // Parse Keywords
        let keywords = "";
        keywordsList.forEach((keyword, idx) => {
            keywords += keyword + (idx == keywordsList.length - 1 ? "" : ", ");
        });

        // Get website array and index of current website
        const websiteArr = user.attributes.websites;
        const websiteIndex = websiteArr.findIndex(res => res.url == url);

        // Initializing new website list
        let newWebsiteList = [...websiteArr];
        newWebsiteList[websiteIndex].title = title;
        newWebsiteList[websiteIndex].header = header;
        newWebsiteList[websiteIndex].description = description;
        newWebsiteList[websiteIndex].iframe = iframe;
        newWebsiteList[websiteIndex].image = image;
        newWebsiteList[websiteIndex].isRobot = isRobot;
        newWebsiteList[websiteIndex].language = language;
        newWebsiteList[websiteIndex].keywords = keywords;

        // Update user website list
        setUserData({
            websites: newWebsiteList
        })
        .then(res => {
            const websiteClass = Moralis.Object.extend("Website");
            const query = new Moralis.Query(websiteClass);
            query.equalTo("url", url);
            return query.first();
        })
        .then(res => {
            res.set('title', title);
            res.set('header', header);
            res.set('description', description);
            res.set('iframe', iframe);
            res.set('image', image);
            res.set('isRobot', isRobot);
            res.set('language', language);
            res.set('keywords', keywords);
            return res.save();
        })
        .then(res => {
            websiteListRef.current.refresh();
            addWebsiteDialogRef.current.done();
            alert({
                title: 'Website Updated',
                description: "Changes has been saved.",
                status: 'success',
                duration: 3000,
            })
        })
        .catch(err => {
            websiteListRef.current.refresh();
            addWebsiteDialogRef.current.done();
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        })
    }

    const onCreate = (data) => {
        const { keywordsList, ...relevantData } = data;

        // Check if website is premium
        const isPremium = user.attributes.websites.length > 0 && user.attributes.hostSize > 1;

        // Parse Keywords
        let keywords = "";
        keywordsList.forEach((keyword, idx) => {
            keywords += keyword + (idx == keywordsList.length - 1 ? "" : ", ");
        });

        // Intialize new website object
        const newWebsiteData = {
            ...relevantData,
            isPremium,
            url: `https://www.nfthost.app/${uniqid()}`
        }

        // Initialize new object when a user has a website
        let newWebsiteArr;
        const websiteArr = user.attributes.websites;
        if (websiteArr.length > 0) {
            newWebsiteArr = [...websiteArr];
            newWebsiteArr.push(newWebsiteData);
        }

        // Add website to user data
        setUserData({
            websites: websiteArr.length == 0 ? [newWebsiteData] : newWebsiteArr
        })
        .then(res => {
            const curDate = new Date();
            const futureDate = new Date();
            const expiryDate = new Date(curDate.setMonth(curDate.getMonth()+1));
            futureDate.setYear(3000);
            const websiteClass = Moralis.Object.extend("Website");
            const website = new websiteClass();
            website.set('owner', user.attributes.ethAddress);
            website.set('title', data.title);
            website.set('header', data.header);
            website.set('description', data.description);
            website.set('image', data.image);
            website.set('iframe', data.iframe);
            website.set('keywords', keywords);
            website.set('isRobot', data.isRobot);
            website.set('language', data.language);
            website.set('isPremium', isPremium);
            website.set('expiresAt', isPremium ? expiryDate : futureDate);
            website.set('url', newWebsiteData.url);
            return website.save();
        })
        .then(res => {
            websiteListRef.current.refresh();
            addWebsiteDialogRef.current.done();
            alert({
                title: 'Website Created',
                description: 'Your website has been created.',
                status: 'success',
                duration: 3000,
            })
        })
        .catch(err => {
            websiteListRef.current.refresh();
            addWebsiteDialogRef.current.done();
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        })
    }

    return (
        <Box
            mt='6'
            maxW='1000px'
            w='100%'
        >
            <AddWebsiteDialog 
                ref={addWebsiteDialogRef} 
                onCreate={onCreate}
                onSave={onSave}
            />
            <ConfirmDeleteDialog 
                ref={confirmDeleteDialogRef} 
                onDelete={onDelete} 
            />
            <PaymentMethodDialog 
                ref={paymentMethodDialogRef}
                onChange={handlePaymentMethodChange}
            />
            <PaymentMethodDialog 
                ref={paymentMethodDialogRef2}
                onChange={handlePaymentMethodChange2}
            />
            <PaymentLoadingDialog 
                ref={paymentLoadingDialogRef}
            />
            <Elements stripe={stripePromise} >
                <PaymentDialog
                    ref={paymentDialogRef}
                    onSuccess={handlePaymentSuccess}
                />
                <PaymentDialog
                    ref={paymentDialogRef2}
                    onSuccess={handlePaymentSuccess2}
                />
            </Elements>
            <Box
                mt='2em'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Text
                    fontSize='18pt'
                    fontWeight='700'
                >
                    Your Websites
                </Text>
                <Button
                    variant='solid'
                    leftIcon={<MdAdd />}
                    bg='black'
                    color='white'
                    _hover={{
                        bg: 'rgb(50,50,50)'
                    }}
                    onClick={handleAddSite}
                >
                    Add Site
                </Button>
            </Box>
            <WebsiteList 
                ref={websiteListRef} 
                onEdit={handleEditSite}
                onDelete={handleDeleteSite}
                onRenew={handleRenewSite}
            />
        </Box>
    )
}

export default HostContainer