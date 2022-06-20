import { useRouter } from 'next/router'
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
        userWebsite,
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
        newComponentScript,
        setNewComponentScript,
        newMetaRobot,
        setNewMetaRobot,
        newMetaFavicon,
        setNewMetaFavicon,
        newMetaLanguage,
        setNewMetaLanguage,
        setNewErrors,
        setEditErrors,
        setIsEditWebsite,
        setIsUpdating,
        currentEditWebsite,
        setCurrentEditWebsite,
        setIsDeletingWebsite,
        editWebsiteFormRef,
        setIsCreateWebsiteModal,
        setCreateWebsiteStep
    } = useWebsite();
    const { DeductFree, getUserByAddress, AddCount, DeductCount, Logout } = useWeb3();

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
            setIsRefreshing(false);
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

    const CreateWebsite = async () => {
        try {
            setNewErrors(null);

            let errorsObj = {};

            if (!newComponentTitle.length) errorsObj.title = { status: true, message: 'Title field must be filled in' };
            if (!newComponentDescription.length) errorsObj.description = { status: true, message: 'Description field must be filled in' };
            if (!newComponentEmbed.length) errorsObj.embed = { status: true, message: 'Embed field must be filled in' };
            if (newComponentScript.length > 0 && !(/</i.test(newComponentScript) && />/i.test(newComponentScript))) errorsObj.script = { status: true, message: 'Embed code must be a valid html code' };
            if (!(/</i.test(newComponentEmbed) && />/i.test(newComponentEmbed))) errorsObj.embed = { status: true, message: 'Embed code must be a valid html code' };
            if (!newComponentImage.length) errorsObj.image = { status: true, message: 'Unrevealed Image Link field must be filled in' };
            if (newComponentImage.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp)$/) == null) errorsObj.image = { status: true, message: 'Unrevealed Image Link field must be an image file' };

            const freeWebsiteCount = websites.filter((website) => !website.isPremium).length;

            if (freeWebsiteCount >= 3) throw new Error('Only 3 free websites is available')

            if (Object.keys(errorsObj).length > 0) {
                setNewErrors(errorsObj);
                toast({
                    title: 'Error',
                    description: 'Please fix all the errors before creating a website',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-center'
                })
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
                        origin: '/dashboard/website',
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

            setIsCreating(true);

            const res = await axios.post(`${config.serverUrl}/api/website/create`, {
                memberId: user._id,
                isPremium: newSubcription === 'premium',
                premiumStartDate: newSubcription === 'premium' ? new Date() : null,
                components: {
                    title: newComponentTitle,
                    unrevealedImage: newComponentImage,
                    description: newComponentDescription,
                    embed: newComponentEmbed,
                    script: newComponentScript
                },
                meta: {
                    robot: newMetaRobot,
                    favicon: newMetaFavicon,
                    language: newMetaLanguage
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}` 
                }
            })

            const INCREMENT_INDEX = 1;
            await AddCount(INCREMENT_INDEX, 'website');
            await GetWebsites();

            setIsCreateWebsiteModal(false);
            setIsCreating(false);
            clearFields();
            CancelEdit();

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
            setIsCreating(false);
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

    const EditWebsite = (website) => {
        try {
            if (website) {
                setCurrentEditWebsite(website);
                setIsEditWebsite(true);
            }
    
            if (editWebsiteFormRef.current?.elements?.length > 0) {
                let elements = editWebsiteFormRef.current.elements;
                const { title, language, description, favicon, unrevealed, script, embed, robot } = elements;
                
                title.value = website.components.title;
                language.value = website.meta.language;
                favicon.value = website.meta.favicon;
                unrevealed.value = website.components.unrevealedImage;
                description.value = website.components.description;
                script.value = website.components.script;
                embed.value = website.components.embed;
                robot.value = website.meta.robot;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const clearFields = () => {
        setNewErrors(null);
        setNewSubscription('free');
        setNewComponentTitle('');
        setNewComponentImage('https://www.nfthost.app/assets/logo.png');
        setNewComponentDescription('');
        setNewComponentEmbed('');
        setNewComponentScript('');
        setNewMetaRobot('if');
        setNewMetaFavicon('https://www.nfthost.app/favicon.ico');
        setNewMetaLanguage('EN');
    }

    const CancelEdit = () => {
        setIsEditWebsite(false);
        setCurrentEditWebsite(null);
        setEditErrors(null);
    }

    const areTwoFieldsArrSame = (currentEditWebsite, newFields) => {
        const {components: {addons, ...components}, meta: {...meta}} = currentEditWebsite;

        const newOldFields = {
            ...components,
            ...meta,
        }

        return !Object.keys(newOldFields).some((key) => {
            return newOldFields[key] !== newFields[key];
        });
    }

    const UpdateWebsite = async () => {
        try {
            if (!editWebsiteFormRef || !currentEditWebsite) return;

            setEditErrors(null);

            const { title, language, description, favicon, unrevealed, script, embed, robot } = editWebsiteFormRef.current.elements;

            let errorsObj = {};

            if (!title.value.length) errorsObj.title = { status: true, message: 'Title field must be filled in' };
            if (!description.value.length) errorsObj.description = { status: true, message: 'Description field must be filled in' };
            if (!embed.value.length) errorsObj.embed = { status: true, message: 'Embed field must be filled in' };
            if (!unrevealed.value.length) errorsObj.image = { status: true, message: 'Unrevealed Image Link field must be filled in' };
            if (!robot.value.length) errorsObj.robot = { status: true, message: 'Robot field must be filled in' };
            
            if (Object.keys(errorsObj).length > 0) {
                setEditErrors(errorsObj);
                return;
            }

            if (areTwoFieldsArrSame(currentEditWebsite, { 
                title: title.value,
                unrevealedImage: unrevealed.value,
                embed: embed.value,
                script: script.value,
                description: description.value,
                robot: robot.value,
                favicon: favicon.value,
                language: language.value,
            })) throw new Error('No changes detected');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            setIsUpdating(true);

            const token = decryptToken(storageToken, true);

            const res = await axios.put(`${config.serverUrl}/api/website/update`, {
                ...currentEditWebsite,
                websiteId: currentEditWebsite._id,
                components: {
                    ...currentEditWebsite.components,
                    title: title.value,
                    description: description.value,
                    embed: embed.value,
                    script: script.value,
                    unrevealedImage: unrevealed.value
                },
                meta: {
                    robot: robot.value,
                    favicon: favicon.value,
                    language: language.value,
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            setCurrentEditWebsite(res.data);
            setIsUpdating(false);

            posthog.capture('User updated a mint website', {
                subscription: newSubcription
            });

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
            setIsUpdating(false);
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

    const UpgradeToPremium = async () => {
        try {
            if (!currentEditWebsite) return;

            const member = await getUserByAddress(address);

            if (!member) throw new Error('Cannot fetch member');
          
            if (member.services.website.freeWebsite === 0) {
                setPaymentData({
                    service: 'Website',
                    price: 15,
                    product: '1 NFT mint website (premium)',
                    redirect: {
                        origin: '/dashboard/website',
                        title: 'Website'
                    },
                    due: new Date()
                })
                router.push('/payment', undefined, { shallow: true }); 
                return;
            }
            else if (member.services.website.freeWebsite > 0) {
                const DEDUCT_INDEX = 1;
                await DeductFree(DEDUCT_INDEX, 'website');
            }

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            setIsUpdating(true);

            await axios.patch(`${config.serverUrl}/api/website/updateSubscription`, {
                websiteId: currentEditWebsite._id,
                isPremium: true,
                premiumStartDate: new Date()
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            let newEditWebsite = { ...currentEditWebsite }
            newEditWebsite.isPremium = true;

            setCurrentEditWebsite(newEditWebsite);
            setIsUpdating(false);

            posthog.capture('User upgraded a mint website to premium');

            toast({
                title: 'Success',
                description: 'Successfuly upgraded your mint website to premium',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            console.error(err);
            setIsUpdating(false);
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

    const DeleteWebsite = async () => {
        try {
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

            CancelEdit();

            setIsDeletingWebsite(false);

            posthog.capture('User deleted a mint website', {
                subscription: currentEditWebsite.isPremium
            });

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
            setIsDeletingWebsite(false);
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

    const UpdateExpiration = async (isExpired) => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            await axios.patch(`${config.serverUrl}/api/website/updateExpiration`, {
                websiteId: userWebsite._id,
                isExpired
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })
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

    const CopyWebsiteLink = () => {
        navigator.clipboard.writeText(`${config?.frontendUrl}/${currentEditWebsite._id}`);

        toast({
            title: 'Success',
            description: `Copied ${currentEditWebsite.components.title}'s link`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

    const RenewWebsite = async () => {
        try {
            if (!currentEditWebsite) throw new Error('Select a mint website');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            setIsUpdating(true);

            const today = new Date();

            await axios.patch(`${config.serverUrl}/api/website/renewSubscription`, {
                websiteId: currentEditWebsite._id,
                isExpired: false,
                premiumStartDate: today
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            let newEditWebsite = { ...currentEditWebsite }
            newEditWebsite.isExpired = false;
            newEditWebsite.premiumStartDate = today;

            setCurrentEditWebsite(newEditWebsite);
            setIsUpdating(false);

            posthog.capture('User renew a mint website');

            toast({
                title: 'Success',
                description: 'Successfuly renewed subscription of your website',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            setIsUpdating(false);
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
        GetWebsites,
        CreateWebsite,
        EditWebsite,
        UpdateWebsite,
        clearFields,
        DeleteWebsite,
        UpdateExpiration,
        CopyWebsiteLink,
        CancelEdit,
        UpgradeToPremium,
        RenewWebsite
    }
}