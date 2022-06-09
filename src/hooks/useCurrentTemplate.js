import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useSites } from '@/hooks/useSites'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken, TemplatesArr, ParseWebsiteData } from '@/utils/tools'

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
        setCurrentEditWebsite
    } = useWebsite();

    useEffect(() => {
        UpdateCurrentTemplate();
    }, [])

    const UpdateCurrentTemplate = (data = null) => {
        try {
            const templateKeysArr = TemplatesArr.map((template) => template.key);
            const decryptedData = ParseWebsiteData(data ? data : currentEditWebsite.data);
            const { template, style } = decryptedData;
            const indexOfKey = templateKeysArr.indexOf(template);
            
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

            //@TODO: style validation

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

            await GetWebsites();

            if (res.status === 200) {
                let newEditWebsite = {...currentEditWebsite};
                newEditWebsite.data = res.data.data;

                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(res.data.data);
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

            //@TODO: style validation

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

            await GetWebsites();

            if (res.status === 200) {
                let newEditWebsite = {...currentEditWebsite};
                newEditWebsite.data = res.data.data;

                setCurrentEditWebsite(newEditWebsite);
                UpdateCurrentTemplate(res.data.data);
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

    return {
        UpdateCurrentTemplate,
        SaveStyle,
        ResetStyle
    }
}
