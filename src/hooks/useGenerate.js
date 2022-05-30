import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useGenerate = () => {
    const toast = useToast();
    const { 
        creators, 
        setCreators, 
        creatorAddress, 
        creatorShare,
        setCreatorAddress,
        setCreatorShare
    } = useGenerator();

    const onAddCreator = () => {
        try {
            if (!creatorAddress.trim().length) throw new Error('You must enter a creator address');
            if (!creatorShare) throw new Error('Creator share must be greater than 0');
            if (creatorShare > 100) throw new Error('Creator share must be less than or equal to 100');

            let maxShare = 0;
            creators.forEach((creator) => {
                maxShare += parseInt(creator.share);
            })

            if ((maxShare + parseInt(creatorShare)) > 100) throw new Error('All creator share must add up to 100%');

            const newCreator = {
                address: creatorAddress,
                share: creatorShare
            }

            setCreators([...creators, newCreator]);
            setCreatorAddress('');
            setCreatorShare(100);
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
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const onOpen = (type = 'computer') => {
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

    const onSave = (type = 'computer') => {
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

    return {
        onAddCreator,
        onDeleteCreator,
        onOpen,
        onSave
    }
}