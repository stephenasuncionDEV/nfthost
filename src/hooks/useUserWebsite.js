import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken, formatRobot } from '@/utils/tools'

export const useUserWebsite = () => {
    const router = useRouter();
    const toast = useToast();
    const { setUserWebsite } = useWebsite();
    const { setIsCookieModal } = useCore();
    const { websiteId } = router.query;

    useEffect(() => {
        // Check if user accepted cookie
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    useEffect(() => {
        if (!Object.keys(router.query).length) return;
        GetUserWebsite();
    }, [router])

    const GetUserWebsite = async () => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const res = await axios.get(`${config.serverUrl}/api/website/get`, {
                params: {
                    websiteId
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            //@TODO: Check expiration if premium
            //@TODO: Analytics

            if (!res.data) throw new Error('Invalid website Id');

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
        GetUserWebsite
    }
}