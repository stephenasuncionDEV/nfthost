import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, HStack, Text, Flex, Button, 
    VStack, SlideFade, Input, Textarea,
    NumberInput, NumberInputField, NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper,
    Radio, RadioGroup, FormLabel, FormControl,
    Tag, TagCloseButton, TagLabel
} from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import CookieModal from '@/components/CookieModal'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useProtectPage } from '@/hooks/useProtectPage'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Metadata from './Metadata'
import Assets from './Assets'
import Layout from './Layout'

const Generator = () => {
    const { 
        
    } = useGenerator();
    const {  } = useGenerate();

    return (
        <Box>
            <Text variant='content_title'>
                Collection Generator
            </Text>
            <VStack alignItems='flex-start' mt='1em' spacing='3em'>
                <Layout>
                    <Metadata description='General information of your new NFT collection' />
                    <Assets description='Resources neccessary to create your NFT collection' />
                </Layout>
            </VStack>
        </Box>
    )
}

export default Generator