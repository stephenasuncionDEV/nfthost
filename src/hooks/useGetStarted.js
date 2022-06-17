import { useEffect } from 'react'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'
import { useWebsite } from '@/providers/WebsiteProvider'

export const useGetStarted = () => {
    const { featuredWebsites, setFeaturedWebsites } = useWebsite();

    useEffect(() => {
        if (featuredWebsites) return;
        getFeaturedWebsites();
    }, [featuredWebsites])

    const getFeaturedWebsites = async () => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const res = await axios.get(`${config.serverUrl}/api/website/getFeatured`, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            setFeaturedWebsites(res.data)
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        featuredWebsites
    }
}