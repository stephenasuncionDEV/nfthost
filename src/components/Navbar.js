import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Image, Avatar, Button, Flex, IconButton } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { FaHeart, FaTiktok, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'

const Navbar = () => {
    const router = useRouter();
    const { onTwitter, onTiktok, onDiscord, onGithub, onSponsor } = useNavbar();

    return (
        <nav>
            <Box 
                display='flex' 
                w='full' 
                px='2em'
                py='1.5em'
                justifyContent='center'
            >
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    w='full'
                >
                    <NextLink href='/' shallow passHref>
                        <HStack spacing='1em' cursor='pointer'>
                            <Avatar 
                                size='md'
                                src='/logo.png' 
                                name='NFT Host Logo' 
                                bg='transparent'
                            />
                            <Text fontWeight='bold' fontSize='14pt'>
                                NFT Host
                            </Text>
                        </HStack>
                    </NextLink>
                    <HStack spacing='2em'>
                        <HStack>
                            <IconButton 
                                aria-label='NFT Host Twitter'
                                icon={<FaTwitter />}
                                borderRadius='50%'
                                size='sm'
                                bg='transparent'
                                onClick={onTwitter}
                            />
                            <IconButton 
                                aria-label='NFT Host Tiktok'
                                icon={<FaTiktok />}
                                borderRadius='50%'
                                size='sm'
                                bg='transparent'
                                onClick={onTiktok}
                            />
                            <IconButton 
                                aria-label='NFT Host Discord'
                                icon={<FaDiscord />}
                                borderRadius='50%'
                                size='sm'
                                bg='transparent'
                                onClick={onDiscord}
                            />
                        </HStack>
                        <NextLink href='/hub' shallow passHref>
                            <Button>
                                Get Started
                            </Button>
                        </NextLink>
                    </HStack>
                </Box>
            </Box>
        </nav>
    )
}

export default Navbar;