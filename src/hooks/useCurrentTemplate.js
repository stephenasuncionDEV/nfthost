import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useSites } from '@/hooks/useSites'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken, convertDateToLocal, convertLocalToDate } from '@/utils/tools'
import { useTemplate } from './useTemplate'

export const useCurrentTemplate = () => {
    const toast = useToast();
    const [isSaving, setIsSaving] = useState(false);
    const { GetWebsites } = useSites();
    const { Logout } = useWeb3();
    const { 
        currentEditWebsite,
        setNewErrors,
        setCurrentEditWebsite,
        newRevealDate,
        setNewRevealDate
    } = useWebsite();
    const { UpdateRevealDate } = useTemplate();

    useEffect(() => {
        if (!currentEditWebsite) return;
        const localDate = convertDateToLocal(currentEditWebsite.revealDate);
        setNewRevealDate(localDate);
    }, [currentEditWebsite])

    const SaveStyle = async () => {
        try {
            setNewErrors(null);

            if (!currentEditWebsite.isPremium) throw new Error('You must upgrade your website to premium to use this feature');

            setIsSaving(true);

            // const storageToken = localStorage.getItem('nfthost-user');
            // if (!storageToken) return;

            // const token = decryptToken(storageToken, true);

            // const res = await axios.patch(`${config.serverUrl}/api/website/updateStyle`, {
            //     websiteId: currentEditWebsite._id,
            //     style: {
            //         bgColor: newBackgroundColor,
            //         bgImage: newBackgroundImage
            //     }
            // }, {
            //     headers: { 
            //         Authorization: `Bearer ${token.accessToken}` 
            //     }
            // })

            const revealDate = convertLocalToDate(currentEditWebsite.revealDate);
            let revealDateChanged = false;

            if (revealDate !== newRevealDate) {
                revealDateChanged = true;
                await UpdateRevealDate(newRevealDate);
            }

            let newEditWebsite = { ...currentEditWebsite };

            if (revealDateChanged) {
                newEditWebsite.revealDate = newRevealDate;
                setNewRevealDate(newRevealDate);
            }

            setCurrentEditWebsite(newEditWebsite);

            await GetWebsites();

            setIsSaving(false);

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
            setIsSaving(false);
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

            let newEditWebsite = {...currentEditWebsite};
            newEditWebsite.data = res.data.data;
            newEditWebsite.revealDate = today;

            setCurrentEditWebsite(newEditWebsite);

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


    return {
        SaveStyle,
        ResetStyle,
        isSaving
    }
}
