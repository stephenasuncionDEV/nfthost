import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Avatar, 
    Button, IconButton, Tag, Menu,
    MenuButton, MenuList, MenuItem,
    Image, TagRightIcon, useColorMode
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaHeart, FaTiktok, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { HiOutlineChevronDown, HiLogout } from 'react-icons/hi'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'

const Navbar = ({ isGetStarted, isSocial, isLanding, isColorMode, isWallet }) => {
    const router = useRouter();
    const { Twitter, Tiktok, Discord, Github, Sponsor } = useNavbar();
    const { Connect, Logout } = useWeb3();
    const { setIsServiceModal } = useCore();
    const { isLoggedIn, address } = useUser();
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
                            <Menu>
                                <MenuButton as={Tag} borderWidth='1px' size='md' cursor='pointer'>
                                    {isLoggedIn ? address : 'Connect Your Wallet'}
                                    <TagRightIcon as={HiOutlineChevronDown} />
                                </MenuButton>
                                <MenuList>
                                    {isLoggedIn ? (
                                        <MenuItem icon={<HiLogout />} onClick={Logout}>Logout</MenuItem>
                                    ) : (
                                        <>
                                        <MenuItem onClick={() => Connect('metamask')}>
                                            <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'
                                                alt='Metamask Wallet Logo from wikimedia.org'
                                                mr='12px'
                                            />
                                            <span>Metamask</span>
                                        </MenuItem>
                                        <MenuItem onClick={() => Connect('phantom')}>
                                            <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src='https://www.yadawallets.com/wp-content/uploads/2021/06/Phantom-wallet-logo.png'
                                                alt='Phantom Wallet Logo from yadawallets.org'
                                                mr='12px'
                                            />
                                            <span>Phantom</span>
                                        </MenuItem>
                                        </>
                                    )}
                                </MenuList>
                            </Menu>
                        )}
                    </HStack>
                </Box>
            </Box>
        </nav>
    )
}

export default Navbar;