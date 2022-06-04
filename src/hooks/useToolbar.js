import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useToolbar = () => {
    const toast = useToast();
    const { layers } = useGenerator();

    const Open = (type = 'computer') => {
        try {
            if (type === 'computer') {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    const projectJson = JSON.parse(fileReader.result);

                    if (projectJson.layers.length != layers.length) throw new Error('Imported Rarity Setting does not match current layers');

                    projectJson.forEach((data, idx) => {
                        if(data.length != layers[idx].images.length) throw new Error('Imported Rarity Setting does not match current layer images');
                    })

                    const newLayers = layers.map((layer, layerIdx) => {
                        return {
                            name: projectJson.layers[layerIdx].name,
                            images: layer.images.map((image, imageIdx) => {
                                return {
                                    ...image,
                                    rarity: raritySettingJson[layerIdx][imageIdx]
                                }
                            })
                        }
                    })

                    setLayers(newLayers);

                    toast({
                        title: 'Success',
                        description: 'Imported project settings',
                        status: 'success',
                        isClosable: true,
                        position: 'bottom-center'
                    })
                };
                fileReader.readAsText(e.target.files[0]);
            }
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const Save = (type = 'computer') => {
        try {
            if (type === 'computer') {
                let projectJson = {
                    layers: [],
                    rarity: [],
                    createdAt: new Date()
                }

                layers.forEach((layer) => {
                    // Get all layer names
                    projectJson.layers.push(layer.name);

                    // Get all rarity
                    projectJson.rarity.push(layer.images.map((img) => {
                        return img.rarity;
                    }));
                })

                const blob = new Blob([JSON.stringify(projectJson, null, 2)], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "NFTHost Generator Project.json");
            }
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        Open,
        Save
    }
}