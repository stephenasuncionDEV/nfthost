import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider';
import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'
import { useWeb3 } from './useWeb3';

export const useGenerate = () => {
    const toast = useToast();
    const router = useRouter();
    const { 
        layers, 
        collectionSize, 
        imageDimension 
    } = useGenerator();
    const { address } = useUser();
    const { getUserByAddress } = useWeb3();

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

            console.log(user)
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