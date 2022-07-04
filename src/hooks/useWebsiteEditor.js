import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCore } from '@/providers/CoreProvider'
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import { useWeb3 } from '@/hooks/useWeb3'
import { useEditorPlugins } from '@/hooks/useEditorPlugins'
import { ParseWebsiteData, EncodeWebsiteData, decryptToken } from '@/utils/tools'
import axios from 'axios'
import config from '@/config/index'

export const useWebsiteEditor = () => {
    const { setIsAreYouSureModal, setAreYouSureData } = useCore();
    const { currentEditWebsite, setEditor, editor, setCurrentEditWebsite } = useWebsite();
    const { Logout } = useWeb3();
    const [isSaving, setIsSaving] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { 
        getNFTHostComponents,
        setDOMComponents,
        setupDefaults
    } = useEditorPlugins();
    const { websiteId } = router.query;

    const bodyColor = useColorModeValue('rgb(250,251,251)', 'rgb(18,22,30)');

    useEffect(() => {
        if (!currentEditWebsite) return;

        // Initialize GrapesJS
        const editor = grapesjs.init({
            container: "#editor",
            styleManager: { clearProperties: 1 },
            autoload: false,
            autosave: true,
            plugins: [
                gjsPresetWebpage,
                setDOMComponents,
                setupDefaults
            ],
            pluginsOpts: {
                gjsPresetWebpage: {
                    textCleanCanvas: 'Are you sure you want to clean the canvas?'
                }
            },
            blockManager: {
                blocks: getNFTHostComponents()
            }
        })

        // Fix Sector Duplication
        const desiredModels = editor.StyleManager.getSectors().models.filter((value, idx, self) => {
            return idx === self.findIndex((t) => (
                t.id === value.id && t.name === value.name
            ))
        });
        editor.StyleManager.getSectors().models = desiredModels;

        setEditor(editor);

    }, [currentEditWebsite])

    const Publish = async () => {
        try {
            setIsSaving(true);

            if (!currentEditWebsite.isPremium) throw new Error('You must upgrade your website to premium to use this feature');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const encodedData = EncodeWebsiteData(JSON.stringify(editor.storeData()));

            await axios.patch(`${config.serverUrl}/api/website/updateStyle`, {
                websiteId: currentEditWebsite._id,
                data: encodedData
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            let newEditWebsite = { ...currentEditWebsite };
            newEditWebsite.data = encodedData;
            setCurrentEditWebsite(newEditWebsite);

            setIsSaving(false);

            toast({
                title: 'Success',
                description: 'Successfuly published your mint website',
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
                description: !err.response ? err.message : err.response.data?.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const ReturnToDashboard = () => {
        if (!currentEditWebsite) {
            router.push('/dashboard/website', undefined, { shallow: true });
            return;
        }
        setAreYouSureData({
            item: 'draft',
            action: 'Discard',
            button: 'danger',
            callback: () => {
                router.push('/dashboard/website', undefined, { shallow: true });
            }
        })
        setIsAreYouSureModal(true);
    }

    return {
        Publish,
        isSaving,
        ReturnToDashboard
    }
}