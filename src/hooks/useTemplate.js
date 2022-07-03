import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/useSites'
import { useCurrentTemplate } from '@/hooks/useCurrentTemplate'
import config from '@/config/index'
import axios from 'axios'
import posthog from 'posthog-js'
import { decryptToken, ParseWebsiteData } from '@/utils/tools'
import { useRouter } from 'next/router'

export const useTemplate = () => {
    const toast = useToast();
    const router = useRouter();
    const { Logout } = useUser();
    const { currentEditWebsite, setCurrentEditWebsite } = useWebsite();
    const { GetWebsites } = useSites();
    const { UpdateCurrentTemplate } = useCurrentTemplate();

    const ChooseTemplate = async (template) => {
        try {
            if (!template) throw new Error('Cannot fetch template');

            const webData = ParseWebsiteData(currentEditWebsite.data);

            if (webData.template === template.key) throw new Error('You are already using this template');
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
                UpdateCurrentTemplate(newEditWebsite);
            }

            posthog.capture('User use a template', {
                template: template.key
            });

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

    const ChooseAddon = async (addon) => {
        try {
            if (!addon) throw new Error('Cannot fetch addon');

            if (currentEditWebsite.components.addons.indexOf(addon.key) !== -1) throw new Error('This addon was already added to your website');

            if (!currentEditWebsite.isPremium && addon.sub === 'premium') throw new Error('Upgrade your website to use premium addons');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const addonsArr = currentEditWebsite.components.addons !== null ? [...currentEditWebsite.components.addons, addon.key] : [addon.key];

            const res = await axios.patch(`${config.serverUrl}/api/website/updateComponents`, {
                websiteId: currentEditWebsite._id,
                key: 'addons',
                value: addonsArr
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            if (res.status === 200) {
                let newEditWebsite = {...currentEditWebsite};
                newEditWebsite.components.addons = addonsArr;
                
                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(newEditWebsite);
            }

            posthog.capture('User use an addon', {
                addon: addon.key
            });

            toast({
                title: 'Success',
                description: `Successfully added ${addon.key} to your mint website`,
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

    const RemoveAddon = async (addon) => {
        try {
            if (!addon) throw new Error('Cannot fetch addon');

            if (!currentEditWebsite.isPremium && addon.sub === 'premium') throw new Error('Upgrade your website to use premium addons');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            let newEditWebsite = {...currentEditWebsite};
            let newAddonsArr = currentEditWebsite.components.addons.filter(item => item !== addon);
            newEditWebsite.components.addons = newAddonsArr;

            const res = await axios.delete(`${config.serverUrl}/api/website/deleteAddon`, {
                data: {
                    websiteId: currentEditWebsite._id,
                    addon: newAddonsArr
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            if (res.status === 200) {
                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(newEditWebsite);
            }

            posthog.capture('User removed an addon', {
                addon
            });

            toast({
                title: 'Success',
                description: `Successfully removed ${addon} to your mint website`,
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

    const EditWebsiteTemplate = () => {
        try {
            router.push(`/editor/${currentEditWebsite._id}`, undefined, { shallow: true });
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        ChooseTemplate,
        ChooseAddon,
        RemoveAddon,
        EditWebsiteTemplate
    }
}