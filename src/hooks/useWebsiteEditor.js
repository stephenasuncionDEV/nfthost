import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import grapesjs from 'grapesjs'

export const useWebsiteEditor = () => {
    const { currentEditWebsite, setEditor } = useWebsite();
    const toast = useToast();
    const router = useRouter();
    const { websiteId } = router.query;

    useEffect(() => {
        if (!currentEditWebsite) return;

        // Initialize GrapesJS
        const editor = grapesjs.init({
            container: "#editor",
            // plugins: [gjsPresetWebpage],
            // pluginOpts: {
            //     gjsPresetWebpage: {},
            // },
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

        setEditor(editor);

    }, [currentEditWebsite])

    return {
        
    }
}