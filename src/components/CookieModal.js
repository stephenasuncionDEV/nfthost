import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Image, Avatar, Button, Flex, IconButton, Link } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaHeart, FaTiktok, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { useCookie } from '@/hooks/useCookie'

const CookieModal = () => {
    const { isCookieModal, setIsCookieModal } = useCore();
    const { onAccept } = useCookie();

    return isCookieModal && (
        <Flex 
            position='fixed' 
            bottom='3em' 
            right='3em'
            h='250px' 
            bg='white' 
            w='400px'
            p='2em'
            fontWeight='bold'
            borderRadius='10px'
            flexDir='column'
            justifyContent='center'
            boxShadow='0px 0px 50px -11px rgba(0,0,0,0.3)'
        >
            <HStack justifyContent='space-between'>
                <Text variant='content_subtitle'>
                    Cookies &#38; Privacy
                </Text>
                <IconButton onClick={() => setIsCookieModal(false)}>
                    <IoMdClose />
                </IconButton>
            </HStack>
            <Text mt='1.5em'>
                This website uses cookies to ensure you
            </Text>
            <Text>
                get the best experience on our website.
            </Text>
            <Flex w='full' justifyContent='flex-end' alignItems='flex-end' mt='2em'>
                <Link href='/about/privacy-policy#cookies' isExternal>
                    <Text variant='link' fontSize='10pt'>
                        More Information
                    </Text>
                </Link>
                <Button ml='1em' onClick={onAccept}>
                    Accept
                </Button>
            </Flex>
        </Flex>
    )
}

export default CookieModal