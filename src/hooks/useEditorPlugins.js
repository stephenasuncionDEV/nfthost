import { useToast, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'

export const useEditorPlugins = () => {
    const { currentEditWebsite } = useWebsite();

    const borderColor = useColorModeValue('#E2E8F0', 'rgba(255, 255, 255, 0.16)');
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
        const fontProperty = editor.StyleManager.getProperty('typography', 'font-family');
        const options = fontProperty.get('options');
        options.push({ id: 'Poppins, Inter, sans-serif', label: 'Poppins' });
        fontProperty.set('options', options);
    }

    const getNFTHostBlocks = () => {
        const template1 = {
            id: 'nfthost-template1',
            label: "NFTHost Template 1",
            type: "nfthost-template1",
            category: "NFT Host",
            content: `
                <div class="row" data-gjs-droppable=".cell" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name="nfthost-template1" style="padding: 3em; min-height: 100vh; height: 100%; font-family: Poppins, Inter, sans-serif;">
                    <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                        <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex-direction: column; width: auto; height: auto; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                            <img src="${currentEditWebsite?.components?.unrevealedImage}" alt="${currentEditWebsite?.components?.title}" data-gjs-name="image" style="border-radius: 10px" />
                            <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; font-size: 50px; margin-top: 1em; color: ${textColor}">
                                ${currentEditWebsite?.components?.title}
                            </div>
                            <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">
                                ${currentEditWebsite?.components?.description}
                            </div>
                            <section id='nfthost-embed' data-gjs-name="cell" style="margin-top: 2em; border-radius: 10px; border: 3px solid ${borderColor}; padding: 1.5em; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: auto;">
                                <p data-gjs-name="text" style="font-size: 14px; font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">Mint Button will be revelead at</p>
                                <p data-gjs-name="text" style="font-size: 12px; font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">${new Date(currentEditWebsite?.revealDate)}</p>
                            </section>
                        </div>
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

        const template2 = {
            id: 'nfthost-template2',
            label: "NFTHost Template 2",
            type: "nfthost-template2",
            category: "NFT Host",
            content: `
                <div class="row" data-gjs-droppable=".cell" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name="nfthost-template2" style="padding: 3em; min-height: 100vh; height: 100%; font-family: Poppins, Inter, sans-serif;">
                    <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                        <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; width: auto; height: auto; flex-wrap: wrap; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                            <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex: 1; flex-direction: column; height: auto; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                                <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; font-size: 50px; margin-top: 1em; text-align: center; color: ${textColor}">${currentEditWebsite?.components?.title}</div>
                                <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; margin-top: .5em; text-align: center; color: ${textColor}">${currentEditWebsite?.components?.description}</div>
                                <section id='nfthost-embed' data-gjs-name="cell" style="margin-top: 2em; border-radius: 10px; border: 3px solid ${borderColor}; padding: 1.5em; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: auto;">
                                    <p data-gjs-name="text" style="font-size: 14px; font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">Mint Button will be revelead at</p>
                                    <p data-gjs-name="text" style="font-size: 12px; font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">${new Date(currentEditWebsite?.revealDate)}</p>
                                </section>
                            </div>
                            <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex: 1; flex-direction: column; height: auto; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                                <img src="${currentEditWebsite?.components?.unrevealedImage}" alt="${currentEditWebsite?.components?.title}" data-gjs-name="image" style="border-radius: 10px" />
                            </div>
                        </div>
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

        const template3 = {
            id: 'nfthost-template3',
            label: "NFTHost Template 3",
            type: "nfthost-template3",
            category: "NFT Host",
            content: `
                <div class="row" data-gjs-droppable=".cell" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name="nfthost-template3" style="padding: 3em; min-height: 100vh; height: 100%; font-family: Poppins, Inter, sans-serif;">
                    <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; width: 100%; height: 100%; flex-wrap: wrap; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                        <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; width: auto; height: auto; flex-wrap: wrap; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                            <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex: 1; flex-direction: column; height: auto; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                                <img src="${currentEditWebsite?.components?.unrevealedImage}" alt="${currentEditWebsite?.components?.title}" data-gjs-name="image" style="border-radius: 10px" />
                            </div>    
                            <div class="cell" data-gjs-draggable=".row" data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name="Cell" style="display: flex; flex: 1; flex-direction: column; height: auto; justify-content: center; align-items: center; font-family: Poppins, Inter, sans-serif;">
                                <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; font-size: 50px; margin-top: 1em; text-align: center; color: ${textColor}">${currentEditWebsite?.components?.title}</div>
                                <div data-gjs-name="text" style="font-family: Poppins, Inter, sans-serif; margin-top: .5em; text-align: center; color: ${textColor}">${currentEditWebsite?.components?.description}</div>
                                <section id='nfthost-embed' data-gjs-name="cell" style="margin-top: 2em; border-radius: 10px; border: 3px solid ${borderColor}; padding: 1.5em; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: auto;">
                                    <p data-gjs-name="text" style="font-size: 14px; font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">Mint Button will be revelead at</p>
                                    <p data-gjs-name="text" style="font-size: 12px; font-family: Poppins, Inter, sans-serif; margin-top: .5em; color: ${textColor}">${new Date(currentEditWebsite?.revealDate)}</p>
                                </section>
                            </div>
                        </div>
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

        let componentsArr = [];

        const isTemplate = (template) => currentEditWebsite.components.templates.includes(template)

        if (isTemplate('Template1')) componentsArr.push(template1);
        if (isTemplate('Template2')) componentsArr.push(template2);
        if (isTemplate('Template3')) componentsArr.push(template3);

        return componentsArr
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

        editor.DomComponents.addType("nfthost-template1", { model });
        editor.DomComponents.addType("nfthost-template2", { model });
        editor.DomComponents.addType("nfthost-template3", { model });
    }

    return {
        setupDefaults,
        getNFTHostBlocks,
        setDOMComponents
    }
}