import { useEffect, useState } from 'react'
import { useToast, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import { useWeb3 } from '@/hooks/useWeb3'
import { useEditorPlugins } from '@/hooks/useEditorPlugins'
import { ParseWebsiteData, EncodeWebsiteData, decryptToken } from '@/utils/tools'
import axios from 'axios'
import config from '@/config/index'

export const useWebsiteEditor = () => {
    const { currentEditWebsite, setEditor, editor, setCurrentEditWebsite } = useWebsite();
    const { Logout } = useWeb3();
    const [isSaving, setIsSaving] = useState(false);
    const toast = useToast();
    const { 
        getNFTHostBlocks,
        setDOMComponents,
        setupDefaults
    } = useEditorPlugins();

    useEffect(() => {
        if (!currentEditWebsite) return;

        const blocks = getNFTHostBlocks();

        // Initialize GrapesJS
        const editor = grapesjs.init({
            container: "#editor",
            styleManager: { 
                clearProperties: 1 
            },
            autoload: false,
            autosave: false,
            storageManager: false,
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
                blocks
            }
        })

        // Fix Sector Duplication
        const desiredModels = editor.StyleManager.getSectors().models.filter((value, idx, self) => {
            return idx === self.findIndex((t) => (
                t.id === value.id && t.name === value.name
            ))
        });
        editor.StyleManager.getSectors().models = desiredModels;

        // Load Current website data
        const parsedData = ParseWebsiteData(currentEditWebsite.data);

        if (parsedData && Object.keys(parsedData).length > 2) { // Differentiate between old and new data
            editor.loadProjectData(parsedData.store);
        }
        
        setEditor(editor);

    }, [currentEditWebsite])

    const Publish = async () => {
        try {
            setIsSaving(true);

            if (!currentEditWebsite.isPremium) throw new Error('You must upgrade your website to premium to use this feature');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            const fullHtml = editor.getHtml();
            const htmlCode = fullHtml.replace('<body>', '<div>').replace('</body>', '</div>');

            const encodedData = EncodeWebsiteData({
                html: htmlCode,
                css: editor.getCss(),
                store: editor.getProjectData()
            });

            await axios.patch(`${config.serverUrl}/api/website/updateData`, {
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

    return {
        Publish,
        isSaving
    }
}