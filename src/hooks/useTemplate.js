import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import config from '@/config/index'
import axios from 'axios'
import posthog from 'posthog-js'
import { decryptToken } from '@/utils/tools'
import { useRouter } from 'next/router'

export const useTemplate = () => {
    const toast = useToast();
    const router = useRouter();
    const { Logout } = useUser();
    const { currentEditWebsite, setCurrentEditWebsite } = useWebsite();

    const AddTemplate = async (template) => {
        try {
            if (!template) throw new Error('Cannot fetch template');

            if (currentEditWebsite.components.templates.includes(template.key)) throw new Error('This template was already added to your website');

            if (!currentEditWebsite.isPremium && template.sub === 'premium') throw new Error('Upgrade your website to use premium templates');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.patch(`${config.serverUrl}/api/website/updateTemplate`, {
                websiteId: currentEditWebsite._id,
                template: template.key
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = { ...currentEditWebsite };
            newEditWebsite.components.templates.push(template.key);

            setCurrentEditWebsite(newEditWebsite);

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

    const AddAddon = async (addon) => {
        try {
            if (!addon) throw new Error('Cannot fetch addon');

            if (currentEditWebsite.components.addons.includes(addon.key)) throw new Error('This addon was already added to your website');

            if (!currentEditWebsite.isPremium && addon.sub === 'premium') throw new Error('Upgrade your website to use premium addons');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.patch(`${config.serverUrl}/api/website/updateAddon`, {
                websiteId: currentEditWebsite._id,
                addon: addon.key
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = {...currentEditWebsite};
            newEditWebsite.components.addons.push(addon.key);
            
            setCurrentEditWebsite(newEditWebsite);

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

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.delete(`${config.serverUrl}/api/website/deleteAddon`, {
                data: {
                    websiteId: currentEditWebsite._id,
                    addon
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = {...currentEditWebsite};
            let newAddonsArr = currentEditWebsite.components.addons.filter(item => item !== addon);
            newEditWebsite.components.addons = newAddonsArr;

            setCurrentEditWebsite(newEditWebsite);

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

    const RemoveTemplate = async (template) => {
        try {
            if (!template) throw new Error('Cannot fetch addon');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.delete(`${config.serverUrl}/api/website/deleteTemplate`, {
                data: {
                    websiteId: currentEditWebsite._id,
                    template
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = {...currentEditWebsite};
            let newTemplatesArr = currentEditWebsite.components.templates.filter(item => item !== template);
            newEditWebsite.components.templates = newTemplatesArr;

            setCurrentEditWebsite(newEditWebsite);

            posthog.capture('User removed a template', {
                template
            });

            toast({
                title: 'Success',
                description: `Successfully removed ${template} to your mint website`,
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

    const UpdateRevealDate = async (revealDate) => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.patch(`${config.serverUrl}/api/website/updateRevealDate`, {
                websiteId: currentEditWebsite._id,
                revealDate
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            posthog.capture('User set a reveal date');
        }
        catch (err) {
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
        AddTemplate,
        AddAddon,
        RemoveAddon,
        EditWebsiteTemplate,
        RemoveTemplate,
        UpdateRevealDate
    }
}