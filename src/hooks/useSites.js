import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'

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
        setNewErrors,
        setIsEditWebsite,
        setIsUpdating,
        currentEditWebsite,
        setCurrentEditWebsite,
        setIsDeletingWebsite
    } = useWebsite();
    const { DeductFree, getUserByAddress, AddCount, DeductCount } = useWeb3();

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

    const CreateWebsite = async () => {
        try {
            setNewErrors(null);

            let errorsObj = {};

            if (!newComponentTitle.length) errorsObj.title = { status: true, message: 'Title field must be filled in' };
            if (!newComponentDescription.length) errorsObj.description = { status: true, message: 'Description field must be filled in' };
            if (!newComponentEmbed.length) errorsObj.embed = { status: true, message: 'Embed field must be filled in' };

            if (Object.keys(errorsObj).length > 0) {
                setNewErrors(errorsObj);
                return;
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
                premiumStartDate: newSubcription === 'premium' ? new Date() : null,
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
            clearFields();

            posthog.capture('User created a mint website', {
                subscription: newSubcription
            });

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
        setNewErrors(null);
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
        setNewErrors(null);
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

    const areTwoFieldsArrSame = (currentEditWebsite, newFields) => {
        const {components: {...components}, meta: {...meta}, isPremium} = currentEditWebsite;

        const newOldFields = {
            ...components,
            ...meta,
            isPremium: isPremium
        }

        return !Object.keys(newOldFields).some((key) => {
            return newOldFields[key] !== newFields[key];
        });
    }

    const UpdateWebsite = async () => {
        try {
            setNewErrors(null);

            let errorsObj = {};

            if (!newComponentTitle.length) errorsObj.title = { status: true, message: 'Title field must be filled in' };
            if (!newComponentDescription.length) errorsObj.description = { status: true, message: 'Description field must be filled in' };
            if (!newComponentEmbed.length) errorsObj.embed = { status: true, message: 'Embed field must be filled in' };

            if (Object.keys(errorsObj).length > 0) {
                setNewErrors(errorsObj);
                return;
            }

            if (areTwoFieldsArrSame(currentEditWebsite, { 
                title: newComponentTitle,
                unrevealedImage: newComponentImage,
                embed: newComponentEmbed,
                description: newComponentDescription,
                robot: newMetaRobot,
                favicon: newMetaFavicon,
                language: newMetaLanguage,
                isPremium: newSubcription === 'premium'
            })) throw new Error('No changes detected');

            if (!currentEditWebsite) throw new Error('Select a mint website');

            const member = await getUserByAddress(address);

            if (!member) throw new Error('Cannot fetch member');

            const isUpdatedToPremium = !currentEditWebsite.isPremium && newSubcription === 'premium';

            if (isUpdatedToPremium && member.services.website.freeWebsite === 0) {
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
            else if (isUpdatedToPremium && member.services.website.freeWebsite > 0) {
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
                premiumStartDate: isUpdatedToPremium ? new Date() : currentEditWebsite.premiumStartDate,
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

            setCurrentEditWebsite(res.data);
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

    const DeleteWebsite = async () => {
        try {
            setNewErrors(null);

            if (!currentEditWebsite) throw new Error('Select a mint website');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            setIsDeletingWebsite(true);

            const token = decryptToken(storageToken, true);

            const res = await axios.delete(`${config.serverUrl}/api/website/delete`, {
                data: {
                    websiteId: currentEditWebsite._id
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            const DEDUCT_INDEX = 1;
            await DeductCount(DEDUCT_INDEX, 'website');
            await GetWebsites();

            clearFields();

            setIsDeletingWebsite(false);

            toast({
                title: 'Success',
                description: 'Successfuly deleted your website',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            console.error(err);
            setIsDeletingWebsite(false);
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
        clearFields,
        DeleteWebsite
    }
}