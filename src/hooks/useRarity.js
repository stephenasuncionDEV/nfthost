import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useRarity = () => {
    const toast = useToast();
    const { layers, setLayers, currentLayer, setIsRarityModal } = useGenerator();

    const OpenRarityModal = () => {
        try {
            if (!layers[currentLayer].images.length) throw new Error(`You must add images to ${layers[currentLayer].name} layer`);
            setIsRarityModal(true);
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

    const ChangeRarityValue = (value, imageIdx) => {
        setLayers(prevLayers => {
            // Change Value
            prevLayers[currentLayer].images[imageIdx].rarity.value = value;

            // Get Max
            let max = 0; 
            prevLayers[currentLayer].images.forEach((image) => {
                max += image.rarity.value;
            })

            // Change Max and Percentage
            const newImages = prevLayers[currentLayer].images.map((image) => {
                image.rarity.max = max;
                image.rarity.percentage = image.rarity.value / max * 100;
                return image;
            })
            prevLayers[currentLayer].images = newImages;

            return [...prevLayers];
        })
    }

    return {
        OpenRarityModal,
        ChangeRarityValue
    }
}