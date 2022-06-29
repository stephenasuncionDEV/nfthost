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
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { metadataStandardsArr } from '@/utils/json'
import { capitalizeFirstLetter } from '@/utils/tools'

const MetadataInput = () => {
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
        <Flex flexDir='column'>
            <Text fontSize='10pt'>
                {capitalizeFirstLetter(standardType)} Metadata
            </Text>
            <Wrap mt='1em'>
                <Flex flexDir='column' flex='1'>
                    <Text fontSize='10pt' textAlign='center'>
                        Configuration
                    </Text>
                </Flex>
                <Flex flexDir='column' flex='1'>
                    <Text fontSize='10pt' textAlign='center'>
                        Preview
                    </Text>
                </Flex>
            </Wrap>
        </Flex>
    )
}

export default MetadataInput