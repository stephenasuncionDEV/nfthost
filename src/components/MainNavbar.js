import NextLink from 'next/link'
import { Box, Text, HStack, Avatar, Button, IconButton, 
    useColorMode, MenuButton, MenuList, Menu, MenuItem, 
    MenuDivider 
} from '@chakra-ui/react'
import { useNavbar } from '@/hooks/useNavbar'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import { FaTiktok, FaDiscord, FaTwitter } from 'react-icons/fa'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useMediaQuery } from 'react-responsive'

const Navbar = ({ isSocial, isLanding, isColorMode, isWallet }) => {
    const { Twitter, Tiktok, Discord } = useNavbar();
    const { colorMode, toggleColorMode } = useColorMode();

    const isTouchingLogo = useMediaQuery({ query: '(max-width: 630px)' });

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
                                src='/assets/logo.png' 
                                name='NFT Host Logo' 
                                bg='transparent'
                            />
                            <Text fontWeight='bold' fontSize='14pt'>
                                NFT Host
                            </Text>
                        </HStack>
                    </NextLink>
                    {!isTouchingLogo ? (
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
                                        aria-label='NFT Host Discord'
                                        icon={<FaDiscord />}
                                        borderRadius='50%'
                                        size='sm'
                                        bg='transparent'
                                        onClick={Discord}
                                    />
                                    <IconButton 
                                        aria-label='NFT Host Tiktok'
                                        icon={<FaTiktok />}
                                        borderRadius='50%'
                                        size='sm'
                                        bg='transparent'
                                        onClick={Tiktok}
                                    />
                                </HStack>
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
                    ) : (
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<GiHamburgerMenu />}
                                variant='outline'
                            />
                            <MenuList>
                                {isWallet && (
                                    <MenuItem closeOnSelect={false} justifyContent='center'>
                                        <ConnectWalletTag />
                                    </MenuItem>
                                )}
                                {isColorMode && (
                                    <MenuItem icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} onClick={toggleColorMode}>
                                        {colorMode === 'light' ? 'Dark Mode' : 'Light Mode' } 
                                    </MenuItem>
                                )}
                                {isSocial && (
                                    <>
                                        <MenuDivider />
                                        <MenuItem icon={<FaTwitter />} onClick={Twitter}>
                                            Twitter
                                        </MenuItem>
                                        <MenuItem icon={<FaDiscord />} onClick={Discord}>
                                            Discord
                                        </MenuItem>
                                        <MenuItem icon={<FaTiktok />} onClick={Tiktok}>
                                            Tiktok
                                        </MenuItem>
                                    </>
                                )}
                            </MenuList>
                        </Menu>
                    )}
                </Box>
            </Box>
        </nav>
    )
}

export default Navbar;