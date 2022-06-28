import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { formatRobot, ParseWebsiteData } from '@/utils/tools'
import { useAnalytics } from '@/hooks/useAnalytics'

export const useUserWebsite = (websiteData) => {
    const router = useRouter();
    const toast = useToast();
    const { setUserWebsite } = useWebsite();
    const { setIsCookieModal } = useCore();
    const { websiteId } = router.query;
    const [data, setData] = useState();
    const { CheckUniqueUsers } = useAnalytics();

    // Check if user accepted cookie and increment unique visit
    useEffect(() => {
        posthog.capture('Mint Website Visit', {
            websiteId
        })
        
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    // Get mint website
    useEffect(() => {
        if (!Object.keys(router.query).length) return;
        GetUserWebsite();
    }, [router])

    // Parse website data
    useEffect(() => {
        if (!websiteData) return;
        const ret = ParseWebsiteData(websiteData);
        setData(ret);
    }, [websiteData])

    const GetUserWebsite = async (checkExpiration = true) => {
        try {
            const res = await axios.get(`${config.serverUrl}/api/website/get`, {
                params: {
                    websiteId
                },
                headers: { 
                    Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}` 
                }
            })

            if (!res.data) throw new Error('Invalid website Id');

            if (checkExpiration) await CheckExpiration(res.data);

            await CheckUniqueUsers(res.data);

            setUserWebsite({
                ...res.data,
                meta: {
                    ...res.data.meta,
                    robot: formatRobot(res.data.meta.robot)
                }
            })
        }
        catch (err) {
            console.error(err);
            router.push('/', undefined, { shallow: true });
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const CheckExpiration = async (websiteData) => {
        try {
            if (!websiteData) return;
            if (!websiteData.premiumStartDate) return;

            const subscriptionStart = new Date(websiteData.premiumStartDate);
            const subscriptionEnd = subscriptionStart.setDate(subscriptionStart.getDate() + 30);

            const isExpired = new Date() > new Date(subscriptionEnd);

            if (isExpired) {
                await axios.patch(`${config.serverUrl}/api/website/updateExpiration`, {
                    websiteId: websiteData._id,
                    isExpired: true
                }, {
                    headers: { 
                        Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}` 
                    }
                })

                let newUserWebsite = { ...websiteData };
                newUserWebsite.isExpired = true;

                setUserWebsite(newUserWebsite);
                
                router.push('/', undefined, { shallow: true });
            }
        }
        catch (err) {
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
        }
    } 

    return {
        GetUserWebsite,
        data
    }
}