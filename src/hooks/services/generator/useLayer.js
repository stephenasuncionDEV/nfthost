import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'
import errorHandler from '@/utils/errorHandler'

export const useLayer = () => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const { 
        layers,
        setLayers,
        setCurrentLayer
    } = useGenerator();

    const ChangeLayerName = (e, idx) => {
        let newLayers = [...layers];
        newLayers[idx].name = e.target.value;
        setLayers(newLayers);
    }

    const PreviewLayer = (idx) => {
        setCurrentLayer(idx);
    }

    const DeleteLayer = (idx) => {
        try {
            if (idx === 0 && layers.length === 1) throw new Error('You must have atleast 1 layer');
            
            setLayers(prevState => {
                return prevState.filter((layer, index) => index !== idx);
            })

            PreviewLayer(layers.length - 2);
        }
        catch (err) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const AddLayer = () => {
        const newLayer = {
            name: `Layer ${layers.length + 1}`,
            images: []
        }
        setLayers([...layers, newLayer]);
        PreviewLayer(layers.length);
    }

    return {
        ChangeLayerName,
        PreviewLayer,
        DeleteLayer,
        AddLayer,
    }
}