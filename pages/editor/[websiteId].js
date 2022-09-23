import NextLink from 'next/link'
import { Flex, HStack, Button, Box, Image, Link, useColorMode } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteEditor } from '@/hooks/services/website/useWebsiteEditor'
import Meta from '@/components/Meta'
import { MdSave } from 'react-icons/md'
import { FaExternalLinkAlt } from 'react-icons/fa'
import config from '@/config/index'

const WebsiteEditor = () => {
    const { 
        Publish,  
        isSaving
    } = useWebsiteEditor();
    const { colorMode } = useColorMode();
    const { currentEditWebsite } = useWebsite();
    
    return (
        <>
            <Meta title='Website Editor | NFTHost' />
            <Flex flexDir='column' minH='100vh'>       
                <HStack flex='1' px='1em' py='.5em' justifyContent='space-between' bg='rgb(55,66,76)'>
                    <Link href='/dashboard' style={{ textDecoration: 'none' }}>
                        <HStack spacing='1em' cursor='pointer'>
                            <Image src={colorMode === 'dark' ? '/assets/logo_full_white.png' : '/assets/logo_full_black.png'} alt='NFTHost Logo' width='140px' />
                        </HStack>
                    </Link>
                    <HStack spacing='2em'>
                        <NextLink href='/dashboard/website' shallow passHref>
                            <Button size='sm'>
                                Return to Dashboard
                            </Button>
                        </NextLink>
                        <HStack>
                            <Button size='sm' variant='primary' leftIcon={<MdSave />} onClick={Publish} disabled={isSaving} isLoading={isSaving} loadingText='Saving'>
                                Publish
                            </Button>
                            <Link href={`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`} isExternal style={{ textDecoration: 'none' }}>
                                <Button size='sm' leftIcon={<FaExternalLinkAlt />} disabled={isSaving} isLoading={isSaving} loadingText='Saving'>
                                    View Website
                                </Button>
                            </Link>
                        </HStack>
                    </HStack>
                </HStack>
                <Box id='editor'></Box>
            </Flex>
        </>
    )
}

export default WebsiteEditor