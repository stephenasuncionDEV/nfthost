import { Box, HStack, Text, Flex, Button, VStack, 
    Input, Textarea, NumberInput, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper, 
    NumberDecrementStepper, Radio, RadioGroup, 
    FormLabel, FormControl, Tag, TagCloseButton, 
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton,
    FormHelperText, useColorModeValue
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

    const helperColor = useColorModeValue('gray.500', 'whiteAlpha.600');

    return (
        <Modal isOpen={isMetadataModal} onClose={() => setIsMetadataModal(false)} isCentered size='3xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Metadata Settings
                    <HStack fontSize='11pt'>
                        <AiOutlineInfoCircle />
                        <Text fontWeight='normal'>
                            General information of your new NFT collection
                        </Text>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Flex flexDir='column'>
                            <FormControl>
                                <Input 
                                    id='collectionName' 
                                    placeholder='Name*'
                                    maxW='265px' 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    size='sm'
                                />
                                <FormHelperText fontSize='9pt'>Name of your NFT Collection</FormHelperText>
                            </FormControl>
                            <FormControl mt='.5em'>
                                <Textarea size='sm' id='collectionDescription' placeholder='Description*' w='full' rows='7' value={desc} onChange={(e) => setDescription(e.target.value)}/>
                                <FormHelperText fontSize='9pt'>Short Description of your NFT Collection</FormHelperText>
                            </FormControl>
                            <FormControl mt='.5em'>
                                <Input size='sm' id='collectionUrl' placeholder='Image Storage URL' w='full' value={externalURL} onChange={(e) => setExternalURL(e.target.value)}/>
                                <FormHelperText fontSize='9pt'>IPFS URL or any Extenal Image Storage URL of your NFT Collection</FormHelperText>
                                <Text fontSize='9pt' color={helperColor} fontWeight='hairline'>
                                    Example: https://gateway.pinata.cloud/ipfs/QmYEfNYNBe9KMJ25uBnQHT1Nc7Lo5uGPhcokHzGo9Rv3cf
                                </Text>
                            </FormControl>
                            <HStack spacing='1em' justifyContent='space-between' w='full' mt='2em'>
                                <Text fontSize='10pt'>
                                    Collection Size:
                                </Text>
                                <NumberInput min={1} max={10000} maxW='110px' value={collectionSize} onChange={setCollectionSize} size='sm'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </HStack>
                            <HStack spacing='1em' justifyContent='space-between' w='full' mt='.5em'>
                                <Text fontSize='10pt'>
                                    Metadata Type:
                                </Text>
                                <RadioGroup id='collectionStandardType' value={standardType} onChange={setStandardType} position='relative' size='sm'>
                                    <HStack>
                                        <Radio value='eth'>Ethereum/Polygon</Radio>
                                        <Radio value='sol'>Solana</Radio>
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                        </Flex>
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
                                        size='sm'
                                    />
                                    <FormControl isRequired flex='1'>
                                        <FormLabel htmlFor='collectionSellerFee'>Seller Fee Basis Points</FormLabel>
                                        <NumberInput id='collectionSellerFee' min={1} max={1000} value={sellerFee} onChange={setSellerFee} size='sm'>
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
                                        size='sm'
                                    />
                                    <HStack>
                                        <NumberInput id='collectionCreatorShare' min={1} max={100} w='100px' value={creatorShare} onChange={setCreatorShare} size='sm'>
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
                                    <Button w='80px' onClick={AddCreator} size='sm' variant='primary'>
                                        Add
                                    </Button>
                                </HStack>
                                <Text fontSize='10pt'>
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