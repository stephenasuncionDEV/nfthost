import { useToast, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'

export const useEditorPlugins = () => {
    const { currentEditWebsite } = useWebsite();

    const bodyColor = useColorModeValue('rgb(250,251,251)', 'rgb(18,22,30)');

    const setupDefaults = (editor) => {

        // Add default background color to body
        editor.on('load', () => {
            const body = editor.getWrapper();
            if (!body.rule) {      
                body.set('style', { 'background-color': bodyColor });
            }
        })

        // Add custom fonts
        const typographySector = editor.StyleManager.getSector('typography');
        const fontProperty = editor.StyleManager.getProperty('typography', 'font-family');
        const options = fontProperty.get('options');
        options.push({ id: 'Poppins, Inter, sans-serif', label: 'Poppins' });
        fontProperty.set('options', options);


        //
       // const block = editor.BlockManager.get('column1');
        //console.log(block)
        // block.set('content', `<div class="row" data-gjs-droppable=".cell" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name="Row"><div  class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell"></div></div><style>.row { display: table; padding: 10px; width: 100%; } @media (max-width: 768px) { .cell, .cell30, .cell70 { width: 100%;  display: block; } } .cell {      width: 100%;      display: table-cell;      height: 75px;    }        </style>`);
        // console.log(block)
    }

    const getNFTHostComponents = () => {
        return [
            {
                id: 'nfthost-image',
                label: "NFTHost Image",
                type: "image",
                category: "NFT Host",
                content: `<img data-gjs-type="nfthost-image" src="${currentEditWebsite?.components?.unrevealedImage}" alt="${currentEditWebsite?.components?.title}" />`,
                media: '<img src="https://www.nfthost.app/assets/logo.svg" alt="NFT Host Component"/>'
            },
            {
                id: 'nfthost-title',
                label: "NFTHost Title",
                type: "text",
                category: "NFT Host",
                content: `<div data-gjs-type="nfthost-title" style="font-size:50px; font-family: Poppins, Inter, sans-serif">${currentEditWebsite?.components?.title}</div>`,
                media: '<img src="https://www.nfthost.app/assets/logo.svg" alt="NFT Host Component"/>'
            },
            {
                id: 'nfthost-description',
                label: "NFTHost Description",
                type: "text",
                category: "NFT Host",
                content: `<div data-gjs-type="nfthost-description" style="font-family: Poppins, Inter, sans-serif">${currentEditWebsite?.components?.description}</div>`,
                media: '<img src="https://www.nfthost.app/assets/logo.svg" alt="NFT Host Component"/>'
            },
            {
                id: 'nfthost-embed',
                label: "Thirdweb Embed",
                type: "iframe",
                category: "NFT Host",
                content: `<div data-gjs-type="nfthost-embed" style="padding: 2em">${currentEditWebsite?.components?.embed}</div>`,
                media: '<img src="https://www.nfthost.app/assets/logo.svg" alt="NFT Host Component"/>'
            },
        ]
    }

    const setDOMComponents = (editor) => {
        const model = {
            defaults: {
                selectable: true,
                draggable: true,
                removable: true,
                activate: true,
                resizable: true,
                traits: []
            }
        };

        editor.DomComponents.addType("nfthost-title", { model });
        editor.DomComponents.addType("nfthost-description", { model });
        editor.DomComponents.addType("nfthost-image", { model });
        editor.DomComponents.addType("nfthost-embed", { model });
    }

    return {
        setupDefaults,
        getNFTHostComponents,
        setDOMComponents
    }
}