import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Avatar, 
    Button, IconButton, Tag, Menu,
    MenuButton, MenuList, MenuItem,
    MenuItemOption, MenuGroup, MenuOptionGroup,
    MenuDivider, Image, Drawer, DrawerContent,
    TagRightIcon, TagLabel
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaHeart, FaTiktok, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { MdOutlineContentCopy } from 'react-icons/md'
import { HiOutlineChevronDown, HiLogout } from 'react-icons/hi'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'

const sidebarItemArr = [
    { name: '' }
]

const Sidebar = ({ children }) => {
    const { address } = useUser();
    const { onCopyAddress } = useNavbar();
    const { onLogout } = useWeb3();

    return (
        <nav>
            <Box minH='100vh' bg='white'>
                <Drawer
                    autoFocus={false}
                    isOpen={true}
                    placement="left"
                    returnFocusOnClose={false}
                    variant='alwaysOpen'
                    size='sidebar'
                >
                    <DrawerContent>
                        <NextLink href='/' shallow passHref>
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
                        </NextLink>
                        <Menu>
                            <MenuButton as={Tag} mt='1em' mx='1em' borderWidth='1px' size='md' cursor='pointer'>
                                <HStack>
                                    <Text as={TagLabel} noOfLines='1'>
                                        {address}
                                    </Text>
                                    <TagRightIcon as={HiOutlineChevronDown} />
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem icon={<MdOutlineContentCopy />} onClick={onCopyAddress}>Copy Address</MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<HiLogout />} onClick={onLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </DrawerContent>
                </Drawer>
                <Box ml='18em' px='4em' pt='2em'>
                    {children}
                </Box>
            </Box>
        </nav>
    )
}

export default Sidebar;