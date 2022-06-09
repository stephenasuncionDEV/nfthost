import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useSites } from '@/hooks/useSites'
import axios from 'axios'
import config from '@/config/index'
import posthog from 'posthog-js'
import { decryptToken, TemplatesArr, ParseWebsiteData, convertDateToLocal, convertLocalToDate } from '@/utils/tools'

export const useCurrentTemplate = () => {
    const toast = useToast();
    const { GetWebsites } = useSites();
    const { Logout } = useWeb3();
    const { 
        setCurrentTemplate,
        currentEditWebsite,
        newBackgroundColor,
        setNewBackgroundColor,
        newBackgroundImage,
        setNewBackgroundImage,
        setNewErrors,
        setCurrentEditWebsite,
        newRevealDate,
        setNewRevealDate
    } = useWebsite();

    useEffect(() => {
        UpdateCurrentTemplate();
    }, [])

    const UpdateCurrentTemplate = (newWebsiteObj = null) => {
        try {
            const templateKeysArr = TemplatesArr.map((template) => template.key);
            const decryptedData = ParseWebsiteData(newWebsiteObj ? newWebsiteObj.data : currentEditWebsite.data);
            const { template, style } = decryptedData;
            const indexOfKey = templateKeysArr.indexOf(template);
            
            setNewRevealDate(convertDateToLocal(newWebsiteObj ? newWebsiteObj.revealDate : currentEditWebsite.revealDate));
            setNewBackgroundColor(style.bgColor);
            setNewBackgroundImage(style.bgImage);
            setCurrentTemplate(TemplatesArr[indexOfKey]);
        }
        catch (err) {
            console.error(err);
        }
    }

    const SaveStyle = async () => {
        try {
            setNewErrors(null);

            if (!currentEditWebsite.isPremium) throw new Error('You must upgrade your website to premium to use this feature');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const res = await axios.patch(`${config.serverUrl}/api/website/updateStyle`, {
                websiteId: currentEditWebsite._id,
                style: {
                    bgColor: newBackgroundColor,
                    bgImage: newBackgroundImage
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            const dateLocal = convertDateToLocal(newRevealDate);

            if (new Date(currentEditWebsite.revealDate) !== newRevealDate) {
                await UpdateRevealDate(dateLocal);
            }

            await GetWebsites();

            if (res.status === 200) {
                let newEditWebsite = {...currentEditWebsite};
                newEditWebsite.data = res.data.data;

                if (new Date(currentEditWebsite.revealDate) !== newRevealDate) {
                    newEditWebsite.revealDate = newRevealDate;
                }

                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(res.data);
            }

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

    const ResetStyle = async () => {
        try {
            setNewErrors(null);

            if (!currentEditWebsite.isPremium) throw new Error('You must upgrade your website to premium to use this feature');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const res = await axios.patch(`${config.serverUrl}/api/website/updateStyle`, {
                websiteId: currentEditWebsite._id,
                style: {
                    bgColor: '',
                    bgImage: ''
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            const today = new Date();
            await UpdateRevealDate(today, true);

            await GetWebsites();

            if (res.status === 200) {
                let newEditWebsite = {...currentEditWebsite};
                newEditWebsite.data = res.data.data;
                newEditWebsite.revealDate = today;

                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(res.data);
            }

            toast({
                title: 'Success',
                description: 'Successfuly reset style your mint website',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
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

    const UpdateRevealDate = async (revealDate, isReset = false) => {
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

            if (!isReset) posthog.capture('User set a reveal date');
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
        UpdateCurrentTemplate,
        SaveStyle,
        ResetStyle,
        UpdateRevealDate
    }
}
