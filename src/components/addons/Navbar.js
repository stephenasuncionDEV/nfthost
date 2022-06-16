import NextLink from 'next/link'
import { Text, HStack, Avatar, IconButton, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const WebsiteNavbar = () => {
    const { userWebsite } = useWebsite();
    const { colorMode, toggleColorMode } = useColorMode();

    const containerColor = useColorModeValue('rgb(235,235,235)', 'rgb(14,17,23)');

    return (
        <HStack
            px='2em'
            py='1.5em'
            bg={containerColor}
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

export default WebsiteNavbar