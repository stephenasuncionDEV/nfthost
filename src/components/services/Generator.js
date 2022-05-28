import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, HStack, Text, Flex, Button, 
    VStack, SlideFade, Input, Textarea,
    NumberInput, NumberInputField, NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper,
    Radio, RadioGroup, FormLabel, FormControl
} from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useGenerator } from '@/providers/GeneratorProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import CookieModal from '@/components/CookieModal'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useProtectPage } from '@/hooks/useProtectPage'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'

const Generator = () => {
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
        setCollectionSize
    } = useGenerator();

    return (
        <Box>
            <Text variant='content_title'>
                Collection Generator
            </Text>
            <Text variant='content_description'>
                Fill up all the required fields
            </Text>
            <VStack alignItems='flex-start' mt='1em'>
                <Input 
                    id='collectionName' 
                    placeholder='Name'
                    maxW='265px' 
                    value={collectionName} 
                    onChange={(e) => setCollectionName(e.target.value)} 
                />
                <Textarea id='collectionDescription' placeholder='Description' maxW='700px' rows='7' value={collectionDescription} onChange={(e) =>  setCollectionDescription(e.target.value)}/>
                <Input id='collectionUrl' placeholder='Image Storage URL' maxW='700px' value={collectionURL} onChange={(e) => setCollectionURL(e.target.value)}/>
                <HStack spacing='1em'>
                    <HStack>
                        <Text>
                            Collection Size
                        </Text>
                        <NumberInput defaultValue={1} min={1} max={10000} maxW='110px' value={collectionSize} onChange={setCollectionSize}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                    <HStack>
                        <Text>
                            Collection Type
                        </Text>
                        <RadioGroup onChange={setCollectionType} value={collectionType}>
                            <HStack>
                                <Radio value='eth'>ETH</Radio>
                                <Radio value='sol'>SOL</Radio>
                            </HStack>
                        </RadioGroup>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Generator