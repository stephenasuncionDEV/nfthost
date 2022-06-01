import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Avatar, Button, IconButton, useColorMode } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaTiktok, FaDiscord, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import ConnectWalletTag from '@/components/ConnectWalletTag'

const Navbar = ({ isGetStarted, isSocial, isLanding, isColorMode, isWallet }) => {
    const router = useRouter();
    const { Twitter, Tiktok, Discord, Github, Sponsor } = useNavbar();
    const { setIsServiceModal } = useCore();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <nav>
            <Box 
                display='flex' 
                w='full' 
                px='2em'
                py='1.5em'
                justifyContent='center'
                bg='transparent'
            >
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    w='full'
                    bg='transparent'
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
                        {isSocial && (
                            <HStack>
                                <IconButton 
                                    aria-label='NFT Host Twitter'
                                    icon={<FaTwitter />}
                                    borderRadius='50%'
                                    size='sm'
                                    bg='transparent'
                                    onClick={Twitter}
                                />
                                <IconButton 
                                    aria-label='NFT Host Tiktok'
                                    icon={<FaTiktok />}
                                    borderRadius='50%'
                                    size='sm'
                                    bg='transparent'
                                    onClick={Tiktok}
                                />
                                <IconButton 
                                    aria-label='NFT Host Discord'
                                    icon={<FaDiscord />}
                                    borderRadius='50%'
                                    size='sm'
                                    bg='transparent'
                                    onClick={Discord}
                                />
                            </HStack>
                        )}
                        {isGetStarted && (
                            <Button onClick={() => setIsServiceModal(true)} rightIcon={<AiOutlineArrowRight />}>
                                Get Started
                            </Button>
                        )}
                        {isLanding && (
                            <NextLink href='/' shallow passHref>
                                <Button rightIcon={<AiOutlineArrowLeft />}>
                                    Landing Page
                                </Button>
                            </NextLink>
                        )}
                        {isColorMode && (
                            <IconButton 
                                ml='.5em'
                                aria-label='Toggle Color Mode' 
                                icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} 
                                bg='transparent'
                                onClick={toggleColorMode} 
                            />
                        )}
                        {isWallet && (
                            <ConnectWalletTag />
                        )}
                    </HStack>
                </Box>
            </Box>
        </nav>
    )
}

export default Navbar;