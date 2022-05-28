import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, HStack, Text, Flex, Button, 
    VStack, SlideFade, Input, Textarea,
    NumberInput, NumberInputField, NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper,
    Radio, RadioGroup, FormLabel, FormControl,
    Tag, TagCloseButton, TagLabel
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const Metadata = ({ description }) => {
    const { 
        collectionName,
        setCollectionName,
        collectionDescription,
        setCollectionDescription,
        collectionURL,
        setCollectionURL,
        collectionType, 
        setCollectionType,
        collectionSize,
        setCollectionSize,
        collectionSymbol,
        setCollectionSymbol,
        collectionSellerFee,
        setCollectionSellerFee,
        collectionCreatorAddress,
        setCollectionCreatorAddress,
        collectionCreatorShare,
        setCollectionCreatorShare,
        creators
    } = useGenerator();
    const { onAddCreator, onDeleteCreator } = useGenerate();

    return (
        <Box>
            <Text variant='content_subtitle'>
                Metadata
            </Text>
            <HStack>
                <AiOutlineInfoCircle />
                <Text variant='content_description' mt='0'>
                    {description}
                </Text>
            </HStack>
            <VStack alignItems='flex-start' mt='1em' maxW='700px'>
                <Input 
                    id='collectionName' 
                    placeholder='Name'
                    maxW='265px' 
                    value={collectionName} 
                    onChange={(e) => setCollectionName(e.target.value)} 
                />
                <Textarea id='collectionDescription' placeholder='Description' w='full' rows='7' value={collectionDescription} onChange={(e) =>  setCollectionDescription(e.target.value)}/>
                <Input id='collectionUrl' placeholder='Image Storage URL' w='full' value={collectionURL} onChange={(e) => setCollectionURL(e.target.value)}/>
                <HStack w='full' justifyContent='space-between'>
                    <HStack spacing='1em'>
                        <Text>
                            Collection Size
                        </Text>
                        <NumberInput min={1} max={10000} maxW='110px' value={collectionSize} onChange={setCollectionSize}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                    <HStack spacing='1em'>
                        <Text>
                            Collection Type
                        </Text>
                        <RadioGroup onChange={setCollectionType} value={collectionType}>
                            <HStack>
                                <Radio value='eth'>Ethereum/Polygon</Radio>
                                <Radio value='sol'>Solana</Radio>
                            </HStack>
                        </RadioGroup>
                    </HStack>
                </HStack>
            </VStack>
            {collectionType === 'sol' && (
                <VStack alignItems='flex-start' mt='2em' maxW='700px'>
                    <HStack alignItems='flex-end' w='full'>
                        <Input 
                            id='collectionSymbol' 
                            placeholder='Symbol'
                            value={collectionSymbol} 
                            onChange={(e) => setCollectionSymbol(e.target.value)}
                            flex='1'
                        />
                        <FormControl isRequired flex='1'>
                            <FormLabel htmlFor='collectionSellerFee'>Seller Fee Basis Points</FormLabel>
                            <NumberInput min={1} max={1000} value={collectionSellerFee} onChange={setCollectionSellerFee}>
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
                            value={collectionCreatorAddress} 
                            onChange={(e) => setCollectionCreatorAddress(e.target.value)} 
                            flex='1'
                        />
                        <HStack>
                            <NumberInput min={1} max={1000} w='100px' value={collectionCreatorShare} onChange={setCollectionCreatorShare}>
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
                        <Button w='80px' onClick={onAddCreator}>
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
                                <TagCloseButton onClick={() => onDeleteCreator(idx)}/>
                            </Tag>
                        ))}
                    </Flex>
                </VStack>
            )}
        </Box>
    )
}

export default Metadata