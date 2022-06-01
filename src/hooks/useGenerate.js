import { useRouter } from 'next/router'
import { useCore } from '@/providers/CoreProvider'
import { useUser } from '@/providers/UserProvider'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'
import { useWeb3 } from './useWeb3'

export const useGenerate = () => {
    const toast = useToast();
    const router = useRouter();
    const { setPaymentData } = useCore();
    const { 
        layers, 
        collectionSize, 
        imageDimension 
    } = useGenerator();
    const { address } = useUser();
    const { getUserByAddress, AddGenerationCount, DeductGeneration } = useWeb3();

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

    const Generate = async () => {
        try {
            layers.forEach((layer) => {
                if (!layer.images.length) throw new Error(`Layer ${layer.name} cannot have 0 traits. Please add a trait or remove the layer`);
            })

            if(imageDimension.width <= 0 || imageDimension.height <= 0) throw new Error("Image width or length must be greater than 0");

            let possibleCombination = 1;
            layers.forEach((layer) => possibleCombination *= layer.images.length);

            if (possibleCombination < collectionSize) throw new Error(`Possible combination is under the desired collection count (${possibleCombination}/${collectionSize}). You must add more images to your layer(s).`);
        
            const user = await getUserByAddress(address);

            const generationCount = user.services.generator.generationCount;
            const freeGeneration = user.services.generator.freeGeneration;

            if (collectionSize > 100 && freeGeneration === 0) {
                setPaymentData({
                    service: 'generator'
                })
                return;
            }
            else if(collectionSize > 100 && freeGeneration > 0) {
                const DECREMENT_VALUE = 1;
                await DeductGeneration(DECREMENT_VALUE);
            }
            
            const INCREMENT_VALUE = 1;
            await AddGenerationCount(INCREMENT_VALUE);

            console.log('generate bitch')
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
        RandomPreview,
        Generate
    }
}