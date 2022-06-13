import NextLink from 'next/link'
import { Box, Text, HStack, Avatar, Button, IconButton, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { FaTiktok, FaDiscord, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import ConnectWalletTag from '@/components/ConnectWalletTag'

const UserWebsiteNavbar = () => {
    const { userWebsite } = useWebsite();
    const { colorMode, toggleColorMode } = useColorMode();

    const containerColor = useColorModeValue('white', 'rgb(14,17,23)');

    return (
        <HStack
            position='fixed'
            px='2em'
            py='1.5em'
            bg={containerColor}
            top='0'
            w='full'
            justifyContent='space-between'
        >
            <NextLink href='/' shallow passHref>
                <HStack spacing='1em' cursor='pointer'>
                    <Avatar 
                        size='md'
                        src={userWebsite?.components?.unrevealedImage}
                        name={`${userWebsite?.components?.title}'s Logo`}
                        bg='transparent'
                    />
                    <Text fontWeight='bold' fontSize='14pt'>
                        {userWebsite?.components?.title}
                    </Text>
                </HStack>
            </NextLink>
            <IconButton 
                ml='.5em'
                aria-label='Toggle Color Mode' 
                icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} 
                bg='transparent'
                onClick={toggleColorMode} 
            />
        </HStack>
    )
}

export default UserWebsiteNavbar