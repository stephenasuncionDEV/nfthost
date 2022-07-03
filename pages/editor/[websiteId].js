import NextLink from 'next/link'
import { Text, Flex, VStack, useColorModeValue, Tag, 
    TagLeftIcon, HStack, Wrap, Divider, FormControl,
    Input, FormHelperText, FormErrorMessage, Button, Box,
    Image, Link, useColorMode
} from '@chakra-ui/react'
import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'
import { MdSave } from 'react-icons/md'
import { useWebsiteEditor } from '@/hooks/useWebsiteEditor'
import Meta from '@/components/Meta'
import AreYouSureModal from '@/components/AreYouSureModal'
import { useCore } from '@/providers/CoreProvider'
import { useRouter } from 'next/router'

const WebsiteEditor = () => {
    const router = useRouter();
    const { editor, SaveAndPublish, isSaving, ReturnToDashboard } = useWebsiteEditor();
    const { colorMode } = useColorMode();
    
    return (
        <>
            <Meta title='Website Editor | NFTHost' />
            <AreYouSureModal />
            <Flex flexDir='column' minH='100vh'>       
                <HStack flex='1' px='1em' py='.5em' justifyContent='space-between'>
                    <Link href='/dashboard' style={{ textDecoration: 'none' }}>
                        <HStack spacing='1em' cursor='pointer'>
                            <Image src={colorMode === 'dark' ? '/assets/logo_full_white.png' : '/assets/logo_full_black.png'} alt='NFTHost Logo' width='140px' />
                        </HStack>
                    </Link>
                    <HStack>
                        <Button size='sm' variant='primary' leftIcon={<MdSave />} onClick={SaveAndPublish} disabled={isSaving} isLoading={isSaving} loadingText='Saving'>
                            Save &#38; Publish
                        </Button>
                        <Button size='sm' onClick={ReturnToDashboard}>
                            Return to Dashboard
                        </Button>
                    </HStack>
                </HStack>
                <Box flex='1'>
                    <Box id='editor' style={{ height: '100%' }}></Box>
                </Box>
            </Flex>
        </>
    )
}

export default WebsiteEditor