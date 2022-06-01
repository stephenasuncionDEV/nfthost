import { Box, HStack, Text, Flex, Button, VStack, 
    Input, Textarea, NumberInput, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper, 
    NumberDecrementStepper, Radio, RadioGroup, 
    FormLabel, FormControl, Tag, TagCloseButton, 
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useMetadata } from '@/hooks/useMetadata'
import { AiOutlineInfoCircle } from 'react-icons/ai'

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

    return (
        <Modal isOpen={isMetadataModal} onClose={() => setIsMetadataModal(false)} isCentered size='3xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose a service</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Text variant='content_subtitle'>
                            Metadata
                        </Text>
                        <HStack>
                            <AiOutlineInfoCircle />
                            <Text variant='content_description' mt='0'>
                                General information of your new NFT collection
                            </Text>
                        </HStack>
                        <VStack alignItems='flex-start' mt='1em'>
                            <Input 
                                id='collectionName' 
                                placeholder='Name'
                                maxW='265px' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <Textarea id='collectionDescription' placeholder='Description' w='full' rows='7' value={desc} onChange={(e) => setDescription(e.target.value)}/>
                            <Input id='collectionUrl' placeholder='Image Storage URL' w='full' value={externalURL} onChange={(e) => setExternalURL(e.target.value)}/>
                            <HStack spacing='1em' justifyContent='space-between' w='full'>
                                <Text>
                                    Collection Size:
                                </Text>
                                <NumberInput min={1} max={10000} maxW='110px' value={collectionSize} onChange={setCollectionSize}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </HStack>
                            <HStack spacing='1em' justifyContent='space-between' w='full'>
                                <Text>
                                    Metadata Type:
                                </Text>
                                <RadioGroup id='collectionStandardType' value={standardType} onChange={setStandardType} position='relative'>
                                    <HStack>
                                        <Radio value='eth'>Ethereum/Polygon</Radio>
                                        <Radio value='sol'>Solana</Radio>
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                        </VStack>
                        {standardType === 'sol' && (
                            <VStack alignItems='flex-start' mt='3em' maxW='700px'>
                                <Text variant='content_subtitle'>
                                    Solana Settings
                                </Text>
                                <HStack alignItems='flex-end' w='full'>
                                    <Input 
                                        id='collectionSymbol' 
                                        placeholder='Symbol'
                                        value={symbol} 
                                        onChange={(e) => setSymbol(e.target.value)}
                                        flex='1'
                                    />
                                    <FormControl isRequired flex='1'>
                                        <FormLabel htmlFor='collectionSellerFee'>Seller Fee Basis Points</FormLabel>
                                        <NumberInput id='collectionSellerFee' min={1} max={1000} value={sellerFee} onChange={setSellerFee}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </HStack>
                                <HStack w='full'>
                                    <Input 
                                        id='collectionCreatorAddress' 
                                        placeholder='Creator Wallet Address'
                                        value={creatorAddress} 
                                        onChange={(e) => setCreatorAddress(e.target.value)} 
                                        flex='1'
                                    />
                                    <HStack>
                                        <NumberInput id='collectionCreatorShare' min={1} max={100} w='100px' value={creatorShare} onChange={setCreatorShare}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Text>
                                            %
                                        </Text>
                                    </HStack>
                                    <Button w='80px' onClick={AddCreator}>
                                        Add
                                    </Button>
                                </HStack>
                                <Text>
                                    Creators:
                                </Text>
                                <Flex flexDir='column' justifyContent='center' w='full'>
                                    {creators?.map((creator, idx) => (
                                        <Tag key={idx} mb='.5em' justifyContent='space-between'>
                                            <HStack justifyContent='space-between' w='full'>
                                                <Text noOfLines='1'>
                                                    Address: {creator.address}
                                                </Text>
                                                <Text>
                                                    Share: {creator.share}%
                                                </Text>
                                            </HStack>
                                            <TagCloseButton onClick={() => DeleteCreator(idx)}/>
                                        </Tag>
                                    ))}
                                </Flex>
                            </VStack>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default Metadata