import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useGenerate = () => {
    const toast = useToast();
    const { creators, 
        setCreators, 
        collectionCreatorAddress, 
        collectionCreatorShare,
        setCollectionCreatorAddress,
        setCollectionCreatorShare
    } = useGenerator();

    const onAddCreator = () => {
        try {
            if (!collectionCreatorAddress.length) throw new Error('You must enter a creator address');
            if (!collectionCreatorShare) throw new Error('Creator share must be greater than 0');
            if (collectionCreatorShare > 100) throw new Error('Creator share must be less than or equal to 100');

            let maxShare = 0;
            creators.forEach((creator) => {
                maxShare += parseInt(creator.share);
            })

            if ((maxShare + parseInt(collectionCreatorShare)) > 100) throw new Error('All creator share must add up to 100%');

            const newCreator = {
                address: collectionCreatorAddress,
                share: collectionCreatorShare
            }

            setCreators([...creators, newCreator]);
            setCollectionCreatorAddress('');
            setCollectionCreatorShare(100);
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

    const onDeleteCreator = (creatorIdx) => {
        try {
            let newCreators = [...creators];
            newCreators.splice(creatorIdx, 1);
            setCreators(newCreators);
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true
            })
        }
    }

    return {
        onAddCreator,
        onDeleteCreator
    }
}