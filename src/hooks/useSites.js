import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useToast } from '@chakra-ui/react'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { getWebsites } from 'routes/website/controller'

export const useSites = () => {
    const toast = useToast();
    const router = useRouter();
    const { setPaymentData } = useCore();
    const { address, user } = useUser();
    const { 
        websites,
        setWebsites, 
        setIsCreating, 
        setIsRefreshing,
        newSubcription,
        setNewSubscription,
        newComponentTitle,
        setNewComponentTitle,
        newComponentImage,
        setNewComponentImage,
        newComponentDescription,
        setNewComponentDescription,
        newComponentEmbed,
        setNewComponentEmbed,
        newMetaRobot,
        setNewMetaRobot,
        newMetaFavicon,
        setNewMetaFavicon,
        newMetaLanguage,
        setNewMetaLanguage,
        newErrors,
        setNewErrors,
        setIsEditWebsite,
        setIsUpdating,
        currentEditWebsite,
        setCurrentEditWebsite
    } = useWebsite();
    const { DeductFree, getUserByAddress, AddCount } = useWeb3();

    useEffect(() => {   
        GetWebsites();
    }, [])

    const GetWebsites = async () => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;
            if (!user) return;

            setIsRefreshing(true);

            const token = decryptToken(storageToken, true);

            const res = await axios.get(`${config.serverUrl}/api/website/getMany`, {
                params: {
                    memberId: user._id
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            setWebsites(res.data);
            setIsRefreshing(false);
        }
        catch (err) {
            console.error(err);
            setIsRefreshing(false);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const triggerError = (component, { status, message }) => {
        setNewErrors({
            ...newErrors,
            [`${component}`]: {
                status,
                message
            }
        })
    }

    const CreateWebsite = async () => {
        try {
            setNewErrors(null);

            if (!newComponentTitle.length) {
                triggerError('title', { status: true, message: 'Title field must be filled in' });
                throw new Error('Title field must be filled in');
            }

            if (!newComponentDescription.length) {
                triggerError('description', { status: true, message: 'Description field must be filled in' });
                throw new Error('Description field must be filled in');
            }

            if (!newComponentEmbed.length) {
                triggerError('embed', { status: true, message: 'Embed field must be filled in' });
                throw new Error('Embed field must be filled in');
            }

            const member = await getUserByAddress(address);

            if (!member) throw new Error('Cannot fetch member');

            if (newSubcription === 'premium' && member.services.website.freeWebsite === 0) {
                setPaymentData({
                    service: 'Website',
                    price: 15,
                    product: '1 NFT mint website (premium)',
                    redirect: {
                        origin: '/service/website',
                        title: 'Website'
                    },
                    due: new Date()
                })
                router.push('/payment', undefined, { shallow: true }); 
                return;
            }
            else if (newSubcription === 'premium' && member.services.website.freeWebsite > 0) {
                const DEDUCT_INDEX = 1;
                await DeductFree(DEDUCT_INDEX, 'website');
            }

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            setIsCreating(true);

            const token = decryptToken(storageToken, true);

            const res = await axios.post(`${config.serverUrl}/api/website/create`, {
                memberId: user._id,
                isPremium: newSubcription === 'premium',
                components: {
                    title: newComponentTitle,
                    unrevealedImage: newComponentImage,
                    description: newComponentDescription,
                    embed: newComponentEmbed,
                },
                meta: {
                    robot: newMetaRobot,
                    favicon: newMetaFavicon,
                    language: newMetaLanguage
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            const INCREMENT_INDEX = 1;
            await AddCount(INCREMENT_INDEX, 'website');
            await GetWebsites();

            setIsCreating(false);

            toast({
                title: 'Success',
                description: 'Successfuly created a mint website',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            console.error(err);
            setIsCreating(false);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const EditWebsite = (websiteIdx) => {
        setCurrentEditWebsite(websites[websiteIdx]);
        setIsEditWebsite(true);
        setNewSubscription(websites[websiteIdx].isPremium ? 'premium' : 'free');
        setNewComponentTitle(websites[websiteIdx].components.title);
        setNewComponentImage(websites[websiteIdx].components.unrevealedImage);
        setNewComponentDescription(websites[websiteIdx].components.description);
        setNewComponentEmbed(websites[websiteIdx].components.embed);
        setNewMetaRobot(websites[websiteIdx].meta.robot);
        setNewMetaFavicon(websites[websiteIdx].meta.favicon);
        setNewMetaLanguage(websites[websiteIdx].meta.language);
    }

    const clearFields = () => {
        setCurrentEditWebsite(null);
        setIsEditWebsite(false);
        setNewSubscription('free');
        setNewComponentTitle('');
        setNewComponentImage('https://www.nfthost.app/assets/logo.png');
        setNewComponentDescription('');
        setNewComponentEmbed('');
        setNewMetaRobot('if');
        setNewMetaFavicon('https://www.nfthost.app/favicon.ico');
        setNewMetaLanguage('EN');
    }

    const UpdateWebsite = async () => {
        try {
            setNewErrors(null);

            if (!newComponentTitle.length) {
                triggerError('title', { status: true, message: 'Title field must be filled in' });
                throw new Error('Title field must be filled in');
            }

            if (!newComponentDescription.length) {
                triggerError('description', { status: true, message: 'Description field must be filled in' });
                throw new Error('Description field must be filled in');
            }

            if (!newComponentEmbed.length) {
                triggerError('embed', { status: true, message: 'Embed field must be filled in' });
                throw new Error('Embed field must be filled in');
            }

            if (!currentEditWebsite) throw new Error('Select a mint website');

            const member = await getUserByAddress(address);

            if (!member) throw new Error('Cannot fetch member');

            if (!currentEditWebsite.isPremium && newSubcription === 'premium' && member.services.website.freeWebsite === 0) {
                setPaymentData({
                    service: 'Website',
                    price: 15,
                    product: '1 NFT mint website (premium)',
                    redirect: {
                        origin: '/service/website',
                        title: 'Website'
                    },
                    due: new Date()
                })
                router.push('/payment', undefined, { shallow: true }); 
                return;
            }
            else if (!currentEditWebsite.isPremium && newSubcription === 'premium' && member.services.website.freeWebsite > 0) {
                const DEDUCT_INDEX = 1;
                await DeductFree(DEDUCT_INDEX, 'website');
            }

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            setIsUpdating(true);

            const token = decryptToken(storageToken, true);

            const res = await axios.put(`${config.serverUrl}/api/website/update`, {
                websiteId: currentEditWebsite._id,
                isPremium: newSubcription === 'premium',
                components: {
                    title: newComponentTitle,
                    unrevealedImage: newComponentImage,
                    description: newComponentDescription,
                    embed: newComponentEmbed,
                },
                meta: {
                    robot: newMetaRobot,
                    favicon: newMetaFavicon,
                    language: newMetaLanguage
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            setIsUpdating(false);

            toast({
                title: 'Success',
                description: 'Successfuly updated your mint website',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            console.error(err);
            setIsUpdating(false);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        GetWebsites,
        CreateWebsite,
        EditWebsite,
        UpdateWebsite,
        clearFields
    }
}