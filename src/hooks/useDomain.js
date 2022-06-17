import { useToast } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'

export const useDomain = () => {
    const toast = useToast();
    const { newAlias, setIsChangingAlias, currentEditWebsite, setCurrentEditWebsite, setNewAlias } = useWebsite();
    const { Logout } = useWeb3();

    const UpdateAlias = async () => {
        try {
            if (!currentEditWebsite) return;
            if (!currentEditWebsite.isPremium) throw new Error('Your mint website must be premium');
            if (!newAlias.length) throw new Error('Alias cannot be empty');
            if (newAlias === currentEditWebsite.custom.alias) throw new Error('No change detected');
            if (!newAlias.match(/^[0-9a-z]+$/)) throw new Error('Special characters is not allowed')

            const tempAlias = newAlias.trim().replace(/ /g, '_');

            setIsChangingAlias(true);

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.patch(`${config.serverUrl}/api/website/updateCustom`, {
                websiteId: currentEditWebsite._id,
                key: 'alias',
                value: tempAlias
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = { ...currentEditWebsite };
            newEditWebsite.custom.alias = tempAlias;

            setCurrentEditWebsite(newEditWebsite);
            setNewAlias('');
            setIsChangingAlias(false);

            posthog.capture('User changed website alias');

            toast({
                title: 'Success',
                description: "Successfuly changed your website's alias",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            setIsChangingAlias(false);
            console.error(err);
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
        UpdateAlias
    }
}