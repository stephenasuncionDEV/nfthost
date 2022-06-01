import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Avatar, 
    Button, IconButton, Tag, Menu,
    MenuButton, MenuList, MenuItem,
    MenuItemOption, MenuGroup, MenuOptionGroup,
    MenuDivider, Image, Drawer, Slide,
    TagRightIcon, TagLabel, Flex, useColorModeValue
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useNavbar } from '@/hooks/useNavbar'
import { MdOutlineContentCopy } from 'react-icons/md'
import { HiOutlineChevronDown, HiLogout } from 'react-icons/hi'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'

const sidebarItemArr = [
    { name: '' }
]

const Sidebar = ({ children }) => {
    const { isSidebar, setIsSidebar } = useCore();
    const { address } = useUser();
    const { CopyAddress } = useNavbar();
    const { Logout } = useWeb3();

    const sidebarColor = useColorModeValue('white', 'rgb(12, 15, 20)');

    return (
        <Box minH='100vh'>
            <nav>
                <Slide in={isSidebar} direction='left' unmountOnExit>
                    <Box
                        position='fixed'
                        maxW='260px'
                        bg={sidebarColor}
                        h='100vh'
                        boxShadow='lg'
                    >
                        <Box 
                            position='absolute' 
                            top='15px'
                            left='250px' 
                            p='.5em' 
                            cursor='pointer' 
                            borderRadius='5px' 
                            bg={sidebarColor} 
                            boxShadow='md'
                            onClick={() => setIsSidebar(false)}
                        >
                            <GiHamburgerMenu />
                        </Box>
                        <Flex flexDir='column'>
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
                                    <MenuItem icon={<MdOutlineContentCopy />} onClick={CopyAddress}>Copy Address</MenuItem>
                                    <MenuDivider />
                                    <MenuItem icon={<HiLogout />} onClick={Logout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Box>
                </Slide>
            </nav>
            {!isSidebar && (
                <Box 
                    position='absolute' 
                    top='15px'
                    left='-5px'
                    p='.5em' 
                    cursor='pointer' 
                    borderRadius='5px' 
                    bg={sidebarColor} 
                    boxShadow='md'
                    onClick={() => setIsSidebar(true)}
                >
                    <GiHamburgerMenu />
                </Box>
            )}
            <Box ml={isSidebar ? '16em' : '0'} minH='100vh'>
                {children}
            </Box>
        </Box>
    )
}

export default Sidebar;