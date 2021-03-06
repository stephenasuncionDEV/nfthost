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

export const useUserWebsite = () => {
    const router = useRouter();
    const toast = useToast();
    const [websiteData, setWebsiteData] = useState();
    const [ isOld, setIsOld ] = useState(false);
    const { setUserWebsite, setUserWebsiteError, userWebsiteError } = useWebsite();
    const { setIsCookieModal } = useCore();
    const { CheckUniqueUsers } = useAnalytics();
    const { websiteId } = router.query;

    // Check if user accepted cookie and increment unique visit
    useEffect(() => {
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    // Get mint website
    useEffect(() => {
        if (!Object.keys(router.query).length) return;
        GetUserWebsite();
    }, [router])

    const BuildWebsiteError = (message) => {
        let newUserWebsiteError = [...userWebsiteError];
        newUserWebsiteError.push(message);
        setUserWebsiteError(newUserWebsiteError);
        throw new Error(message);
    }

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

            if (!res.data) BuildWebsiteError('Invalid website ID');

            console.log('[NFTHost] Website ID:', res.data._id);

            posthog.capture('Mint Website Visit', {
                websiteId,
                websiteTitle: res.data.components.title,
                origin: document.referrer
            })

            if (res.data.isExpired === true) BuildWebsiteError('Website is expired, if you are the owner of this website, you can renew your subscription.');

            // Check if mint website is expired
            if (checkExpiration) await CheckExpiration(res.data);

            const siteData = ParseWebsiteData(res.data.data);

            let isOld = false;

            // If Website is old version
            if (!siteData || Object.keys(siteData).length <= 2) {
                isOld = true;          
            }

            // Add embed code if reveal date is good
            const isReveal = !res.data.revealDate || new Date(res.data.revealDate) <= new Date();
            if (isReveal && !isOld) {
                const fullHtml = siteData.html;
                const embedPosition = fullHtml.indexOf('id="nfthost-embed"') - 9;
                const closingPosition = fullHtml.slice(embedPosition).indexOf('</section>') + embedPosition + 10;
                const embedContainer = '<div style="margin: 1.5em">' + res.data.components.embed + '</div>';
                const htmlCode = fullHtml.slice(0, embedPosition) + embedContainer + fullHtml.slice(closingPosition);
                siteData.html = htmlCode;
            }

            setWebsiteData(siteData);

            await CheckUniqueUsers(res.data);

            setIsOld(isOld);
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
        websiteData,
        isOld
    }
}