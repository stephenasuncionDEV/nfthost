import { useWebsite } from '@/providers/WebsiteProvider'
import axios from 'axios'
import config from '@/config/index'
import posthog from 'posthog-js'

export const useAnalytics = () => {
    const { userWebsite, setUserWebsite } = useWebsite();

    const CheckUniqueUsers = async (websiteData) => {
        try {
            if (!websiteData) return;
            if (localStorage.getItem(`nfthost-${websiteData._id}`)) return;
            else localStorage.setItem(`nfthost-${websiteData._id}`, 'visited');

            await axios.patch(`${config.serverUrl}/api/website/updateAnalytics`, {
                websiteId: websiteData._id,
                key: 'uniqueVisits',
                value: websiteData.analytics.uniqueVisits + 1
            }, {
                headers: { 
                    Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}` 
                }
            })

            let newUserWebsite = { ...websiteData };
            newUserWebsite.analytics.uniqueVisits = newUserWebsite.analytics.uniqueVisits + 1;

            setUserWebsite(newUserWebsite);
        }
        catch (err) {
            console.error(err);
        }
    }

    const CheckEmbedClick = async () => {
        try {
            if (!userWebsite) return;

            posthog.capture('Mint Website Embed Click', {
                websiteId: userWebsite._id
            })

            await axios.patch(`${config.serverUrl}/api/website/updateAnalytics`, {
                websiteId: userWebsite._id,
                key: 'clickedOnEmbed',
                value: userWebsite.analytics.clickedOnEmbed + 1
            }, {
                headers: { 
                    Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}` 
                }
            })

            let newUserWebsite = { ...userWebsite };
            newUserWebsite.analytics.clickedOnEmbed = newUserWebsite.analytics.clickedOnEmbed + 1;

            setUserWebsite(newUserWebsite);
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        CheckUniqueUsers,
        CheckEmbedClick
    }
}