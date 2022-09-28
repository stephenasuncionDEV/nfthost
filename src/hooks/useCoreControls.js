import { useState } from 'react'
import { useCore } from '@/providers/CoreProvider'
import { getAccessToken } from '@/utils/tools'
import axios from 'axios'
import config from '@/config/index'

export const useCoreControls = () => {
    const [featuredWebsites, setFeaturedWebsites] = useState([]);
    const { paymentData } = useCore();

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

    const addReferral = async (name) => {
        try {
            if (!name) return;

            const accessToken = getAccessToken();

            await axios.post(`${config.serverUrl}/api/core/addReferral`, {
                name,
                service: paymentData.service.toLowerCase()
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        featuredWebsites,
        getFeaturedWebsites,
        addReferral
    }
}