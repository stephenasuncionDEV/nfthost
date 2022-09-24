import { useState } from 'react'
import { getAccessToken } from '@/utils/tools'
import axios from 'axios'
import config from '@/config/index'

export const useCoreControls = () => {
    const [featuredWebsites, setFeaturedWebsites] = useState([]);

    const getFeaturedWebsites = async () => {
        try {
            const accessToken = getAccessToken();

            const res = await axios.get(`${config.serverUrl}/api/core/getFeaturedWebsites`, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            setFeaturedWebsites(res.data)
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        featuredWebsites,
        getFeaturedWebsites
    }
}