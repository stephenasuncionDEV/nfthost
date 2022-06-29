import { Box, HStack, Text, Flex, Button, VStack, 
    Input, Textarea, NumberInput, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper, 
    NumberDecrementStepper, Radio, RadioGroup, 
    FormLabel, FormControl, Tag, TagCloseButton, 
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton,
    FormHelperText, useColorModeValue, Wrap, Image
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useMetadata } from '@/hooks/useMetadata'
import MetadataInput from './MetadataInput'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { metadataStandardsArr } from '@/utils/json'

const Metadata = () => {
    const { 
        name,
        setName,
        description: desc,
        setDescription,
        externalURL,
        setExternalURL,
        standardType,
        setStandardType,
        collectionSize,
        setCollectionSize,
        symbol,
        setSymbol,
        creatorAddress,
        setCreatorAddress,
        sellerFee,
        setSellerFee,
        creatorShare,
        setCreatorShare,
        creators,
        isMetadataModal,
        setIsMetadataModal
    } = useGenerator();
    const { AddCreator, DeleteCreator } = useMetadata();

    const bgColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
    const buttonDefaultColor = useColorModeValue('gray.100', 'whiteAlpha.200');
    const helperColor = useColorModeValue('gray.500', 'whiteAlpha.600');

    return (
        <Modal isOpen={isMetadataModal} onClose={() => setIsMetadataModal(false)} isCentered size='5xl' closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Metadata Settings
                    <Text fontWeight='normal' fontSize='10pt'>
                        General information of your new NFT collection
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir='column'>
                        <Text fontSize='10pt'>
                            Select a Metadata Standard
                        </Text>
                        <Wrap spacing='.5em' my='1em' p='.5em' bg={bgColor} borderRadius='10px'>
                            {metadataStandardsArr?.map((standard, idx) => (
                                <Button 
                                    key={idx} 
                                    h='60px' 
                                    minW='120px' 
                                    justifyContent='flex-start' 
                                    onClick={() => setStandardType(standard.name.toLowerCase())}
                                    bg={standardType.toLowerCase() === standard.name.toLowerCase() ? 'blue.500' : buttonDefaultColor}
                                >
                                    <VStack justifyContent='center' alignItems='center' w='full' h='full' p='.5em'>
                                        {standard.name !== 'Other' && <Image src={standard.image} alt={standard.name} w='25px' h='25px' />}
                                        <Text fontSize='10pt' textAlign='start'>
                                            {standard.name}
                                        </Text>
                                    </VStack>
                                </Button>
                            ))}
                        </Wrap>
                        <MetadataInput />
                    </Flex>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default Metadata