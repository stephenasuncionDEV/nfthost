import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useLayer = () => {
    const toast = useToast();
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
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
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