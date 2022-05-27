import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Avatar, 
    Button, IconButton, Tag, Menu,
    MenuButton, MenuList, MenuItem,
    MenuItemOption, MenuGroup, MenuOptionGroup,
    MenuDivider, Image, Drawer, DrawerContent,
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaHeart, FaTiktok, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { HiLogout } from 'react-icons/hi'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'

const Sidebar = ({ children }) => {
    const { address } = useUser();
    const { onCopyAddress } = useNavbar();

    return (
        <nav>
            <Box minH='100vh' bg='white'>
                <Drawer
                    autoFocus={false}
                    isOpen={true}
                    placement="left"
                    returnFocusOnClose={false}
                >
                    <DrawerContent>
                        <HStack spacing='.5em' cursor='pointer' justifyContent='center' p='1.5em'>
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
                        <Tag mt='1em' mx='1em' borderWidth='1px' size='md' cursor='pointer' onClick={onCopyAddress}>
                            <Text noOfLines='1'>
                                {address}
                            </Text>
                        </Tag>
                    </DrawerContent>
                </Drawer>
                <Box ml='4em' p='2em'>
                    {children}
                </Box>
            </Box>
        </nav>
    )
}

export default Sidebar;