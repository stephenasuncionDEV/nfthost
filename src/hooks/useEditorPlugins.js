import { useToast, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'

export const useEditorPlugins = () => {
    const { currentEditWebsite } = useWebsite();

    const bodyColor = useColorModeValue('rgb(250,251,251)', 'rgb(18,22,30)');
    const textColor = useColorModeValue('black', 'white');

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
                id: 'nfthost-template1',
                label: "NFTHost Template 1",
                type: "nfthost-template1",
                category: "NFT Host",
                content: `
                    <div class="row" data-gjs-droppable=".cell" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name="Row" style="padding: 3em; min-height: 100vh; height: 100%; font-family: Poppins, Inter, sans-serif;">
                        <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                            <img src="${currentEditWebsite?.components?.unrevealedImage}" alt="${currentEditWebsite?.components?.title}" data-gjs-name="image" />
                            <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; font-size: 50px; margin-top: 1em; color: ${textColor}">${currentEditWebsite?.components?.title}</div>
                            <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">${currentEditWebsite?.components?.description}</div>
                            <div data-gjs-name="cell" style="padding: 2em">${currentEditWebsite?.components?.embed}</div>
                        </div>
                    </div>
                    <style> 
                        .row {
                            display: table;
                            padding: 10px;
                            width: 100%;
                        }
                        @media (max-width: 768px) {
                            .cell, .cell30, .cell70 {
                                width: 100%;
                                display: block;
                            }
                        }
                        .cell {
                            width: 8%;
                            display: table-cell;
                            height: 75px;
                        }
                    </style>
                `,
                media: '<img src="https://www.nfthost.app/assets/logo.svg" alt="NFT Host Component"/>'
            }
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

        console.log(editor.BlockManager.get('image'))

        editor.DomComponents.addType("nfthost-template1", { model });
        // editor.DomComponents.addType("nfthost-title", { model });
        // editor.DomComponents.addType("nfthost-description", { model });
        // editor.DomComponents.addType("nfthost-image", { model });
        // editor.DomComponents.addType("nfthost-embed", { model });
    }

    return {
        setupDefaults,
        getNFTHostComponents,
        setDOMComponents
    }
}