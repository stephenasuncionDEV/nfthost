import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCore } from '@/providers/CoreProvider'
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import { useWeb3 } from './useWeb3'

export const useWebsiteEditor = () => {
    const { setIsAreYouSureModal, setAreYouSureData } = useCore();
    const { currentEditWebsite, setEditor, editor } = useWebsite();
    const { Logout } = useWeb3();
    const [isSaving, setIsSaving] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { websiteId } = router.query;

    const bodyColor = useColorModeValue('rgb(250,251,251)', 'rgb(18,22,30)');

    useEffect(() => {
        if (!currentEditWebsite) return;

        // Initialize GrapesJS
        const editor = grapesjs.init({
            container: "#editor",
            styleManager: { clearProperties: 1 },
            plugins: [
                gjsPresetWebpage
            ],
            pluginOpts: {
                gjsPresetWebpage: {}
            },
            autoload: false,
            autosave: true,
            blockManager: {
                blocks: [
                    {
                        id: 'nfthost-image',
                        label: "NFTHost Image",
                        type: "image",
                        category: "NFT Host",
                        content: `<img data-gjs-type="nfthost-image" src="${currentEditWebsite?.components?.unrevealedImage}" alt="${currentEditWebsite?.components?.title}" />`,
                        media: 'https://www.nfthost.app/assets/logo.svg'
                    },
                    {
                        id: 'nfthost-title',
                        label: "NFTHost Title",
                        type: "text",
                        category: "NFT Host",
                        content: `<div data-gjs-type="nfthost-title" style="font-size:50px; font-family:'Lucida Sans Unicode'">${currentEditWebsite?.components?.title}</div>`,
                        media: 'https://www.nfthost.app/assets/logo.svg'
                    },
                    {
                        id: 'nfthost-description',
                        label: "NFTHost Description",
                        type: "text",
                        category: "NFT Host",
                        content: `<div data-gjs-type="nfthost-description" style="font-family:'Lucida Sans Unicode'">${currentEditWebsite?.components?.description}</div>`,
                        media: 'https://www.nfthost.app/assets/logo.svg'
                    },
                    {
                        id: 'nfthost-iframe',
                        label: "Thirdweb Iframe",
                        type: "iframe",
                        category: "NFT Host",
                        content: `<div data-gjs-type="nfthost-embed">${currentEditWebsite?.components?.embed}`,
                        media: 'https://www.nfthost.app/assets/logo.svg'
                    },
                ]
            },
        })

        // Add Custom Components
        editor.DomComponents.addType("nfthost-iframe", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    resizable: true,
                    traits: []
                }
            }
        })

        editor.DomComponents.addType("nfthost-header", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    traits: []
                }
            }
        })

        editor.DomComponents.addType("nfthost-description", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    traits: []
                }
            }
        })

        editor.DomComponents.addType("nfthost-image", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    resizable: true,
                    traits: []
                }
            }
        })

        const desiredModels = editor.StyleManager.getSectors().models.filter((value, idx, self) => {
            return idx === self.findIndex((t) => (
                t.id === value.id && t.name === value.name
            ))
        });

        editor.StyleManager.getSectors().models = desiredModels;

        setEditor(editor);

    }, [currentEditWebsite])

    useEffect(() => {
        if (!editor) return;
        editor.on('load', () => {
            const body = editor.getWrapper();
            body.set('style', { 'background-color': bodyColor });
        })
    }, [editor])

    const SaveAndPublish = async () => {
        try {
            setIsSaving(true);

            setIsSaving(false);
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
        SaveAndPublish,
        isSaving,
        ReturnToDashboard
    }
}