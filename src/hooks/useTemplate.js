import { useUser } from '@/providers/UserProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import axios from 'axios'
import { decryptToken } from '@/utils/tools'
import { useSites } from '@/hooks/useSites'
import { useCurrentTemplate } from '@/hooks/useCurrentTemplate'

export const useTemplate = () => {
    const toast = useToast();
    const { Logout } = useUser();
    const { currentEditWebsite, setCurrentEditWebsite } = useWebsite();
    const { GetWebsites } = useSites();
    const { UpdateCurrentTemplate } = useCurrentTemplate();

    const ChooseTemplate = async (template) => {
        try {
            if (!template) throw new Error('Cannot fetch template');
            if (currentEditWebsite.data === template.key) throw new Error('You are already using this template');
            if (!currentEditWebsite.isPremium && template.sub === 'premium') throw new Error('Upgrade your website to use premium templates');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const res = await axios.patch(`${config.serverUrl}/api/website/updateTemplate`, {
                websiteId: currentEditWebsite._id,
                template: template.key
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            if (res.status === 200) {
                let newEditWebsite = {...currentEditWebsite};
                newEditWebsite.data = res.data.data;

                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(res.data.data);
            }

            toast({
                title: 'Success',
                description: "Successfully updated website's template",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            if (err.response?.data?.isExpired) await Logout();
            toast({
                title: 'Error',
                description: !err.response ? err.message : err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        ChooseTemplate
    }
}