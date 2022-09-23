import { useToast } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'

export const useDomain = () => {
    const toast = useToast();
    const { 
        newAlias, 
        newDomain,
        setIsChangingAlias, 
        currentEditWebsite, 
        setCurrentEditWebsite, 
        setNewAlias,
        setNewDomain,
        setIsChangingDomain 
    } = useWebsite();
    const { Logout } = useWeb3();

    const UpdateAlias = async () => {
        try {
            if (!currentEditWebsite) return;
            if (!currentEditWebsite.isPremium) throw new Error('Your mint website must be premium');
            if (!newAlias.length) throw new Error('Alias cannot be empty');
            if (newAlias.length > 32) throw new Error('Alias max length is 32 characters');
            if (newAlias === currentEditWebsite.custom.alias) throw new Error('No change detected');
            if (!newAlias.match(/^[0-9a-zA-Z]+$/)) throw new Error('Special characters is not allowed')

            const tempAlias = newAlias.toLowerCase().trim().replace(/ /g, '_');

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

    const UpdateDomain = async () => {
        try {
            if (!currentEditWebsite) return;
            if (!currentEditWebsite.isPremium) throw new Error('Your mint website must be premium');
            if (!newDomain.length) throw new Error('Domain cannot be empty');
            if (newDomain === currentEditWebsite.custom.domain) throw new Error('No change detected');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            setIsChangingDomain(true);

            const res1 = await axios.post(`${config.serverUrl}/api/website/verifyDomain`, {
                domain: newDomain
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            const { status, type } = res1.data;

            if (!status) throw new Error(`Please configure your custom domain's ${type} correctly.`);

            const tempDomain = newDomain.toLowerCase();

            await axios.patch(`${config.serverUrl}/api/website/updateCustom`, {
                websiteId: currentEditWebsite._id,
                key: 'domain',
                value: tempDomain
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = { ...currentEditWebsite };
            newEditWebsite.custom.domain = tempDomain;

            setCurrentEditWebsite(newEditWebsite);
            setNewDomain('');
            setIsChangingDomain(false);

            posthog.capture('User added custom domain');

            toast({
                title: 'Success',
                description: "Successfuly added custom domain",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            setIsChangingDomain(false);
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

    const CopyDns = (type) => {
        if (type.toLowerCase() === 'cname') {
            navigator.clipboard.writeText('www.nfthost.app');
        } else if (type.toLowerCase() === 'alias') {
            navigator.clipboard.writeText('76.76.21.241');
        }

        toast({
            title: 'Success',
            description: `Successfuly copied ${type}.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

    return {
        UpdateAlias,
        UpdateDomain,
        CopyDns
    }
}