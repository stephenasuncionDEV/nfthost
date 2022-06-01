import { useRouter } from 'next/router'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useGenerate = () => {
    const toast = useToast();
    const router = useRouter();
    const { 
        layers
    } = useGenerator();

    const Open = (type = 'computer') => {
        try {

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

    const RandomPreview = () => {
        try {
            layers.forEach((layer) => {
                if (!layer.images.length) throw new Error(`Layer ${layer.name} cannot have 0 traits. Please add a trait or remove the layer`);
            })

            router.push('/service/generator', undefined, { shallow: true });
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
        Save,
        RandomPreview
    }
}