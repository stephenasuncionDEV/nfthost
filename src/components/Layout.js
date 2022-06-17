import NextLink from 'next/link'
import { Box, Text, useColorModeValue, VStack, HStack, 
    Avatar, IconButton, Button, useColorMode, Flex
} from '@chakra-ui/react'
import ConnectWalletTag from './ConnectWalletTag'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineDashboard, MdOutlineMiscellaneousServices, 
    MdOutlineDarkMode, MdOutlineLightMode 
} from 'react-icons/md'
import { CgWebsite } from 'react-icons/cg'
import { useCore } from '@/providers/CoreProvider'

const sidebarItemArr = [
    { 
        parent: 'navigation',
        items: [ 
            { 
                name: 'Get Started', 
                link: '/getStarted', 
                icon: <MdOutlineDashboard />, 
                children: [] 
            } 
        ]
    },
    { 
        parent: 'apps',
        items: [ 
            { 
                name: 'Generator', 
                link: '/generator', 
                icon: <MdOutlineMiscellaneousServices />, 
                children: [] 
            },
            { 
                name: 'Website', 
                link: '/website', 
                icon: <CgWebsite />, 
                children: [
                    { name: 'Templates', link: '/website/templates' },
                    { name: 'Addons', link: '/website/addons' }
                ] 
            }
        ]
    },
]

const Layout = ({ children, currentApp }) => {
    const { isSidebar, setIsSidebar } = useCore();
    const { colorMode, toggleColorMode } = useColorMode();

    const sidebarBG = useColorModeValue('white', 'rgb(55,66,76)');
    const sidebarColor = useColorModeValue('#60677d', '#9097a7');
    const toolbarBG = useColorModeValue('rgb(52,140,212)', 'rgb(60,71,82)');
    const toolbarColor = useColorModeValue('rgba(255,255,255,.8)', 'white');
    const defaultColor = useColorModeValue('white', 'white');

    //https://coderthemes.com/codefox/#demos

    return (
        <>
            <HStack 
                position='fixed'
                top='0'
                w='full'
                bg={toolbarBG}
                h='70px'
                px='2em'
                justifyContent='space-between'
                zIndex='1337 !important'
            >
                <HStack spacing='2em'>
                    <NextLink href='/' shallow passHref>
                        <HStack spacing='1em' cursor='pointer' p='1em'>
                            <Avatar 
                                size='sm'
                                src='/assets/logo.png' 
                                name='NFT Host Logo' 
                                bg='transparent'
                                cursor='pointer'
                            />
                            <Text  fontSize='14pt' cursor='pointer' color={defaultColor}>
                                NFT Host
                            </Text>
                        </HStack>
                    </NextLink>
                    <IconButton 
                        bg='transparent' 
                        color={defaultColor} 
                        fontSize='16pt' 
                        _hover={{ bg: 'transparent', color: toolbarColor }}
                        onClick={() => setIsSidebar(!isSidebar)}
                    >
                        <GiHamburgerMenu />
                    </IconButton>
                </HStack>
                <HStack spacing='2em'>
                    <IconButton 
                        aria-label='Toggle Color Mode' 
                        bg='transparent'
                        color={defaultColor} 
                        _hover={{ bg: 'transparent', color: toolbarColor }}
                        onClick={toggleColorMode}
                    >
                        {colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                    </IconButton>
                    <ConnectWalletTag 
                        isUserProfile
                        isPayments
                        isCopyAddress
                    />
                </HStack>
            </HStack>
            {isSidebar && (
                <VStack
                    position='fixed'
                    top='0'
                    flexDir='column'
                    bg={sidebarBG}
                    w='245px'
                    h='full'
                    p='1.5em'
                    alignItems='flex-start'
                    mt='70px'
                    boxShadow='sm'
                    spacing='1em'
                    color={sidebarColor}
                    zIndex='1337 !important'
                >
                    {sidebarItemArr?.map((item, idx) => (
                        <VStack key={idx} spacing='1.5em' alignItems='flex-start' w='full'>
                            <Text fontSize='10pt'>
                                {item.parent.toUpperCase()}
                            </Text>
                            <VStack spacing='.25em'>
                                {item.items.map((nav, idx) => (
                                    <Box key={idx} w='full'>
                                        <NextLink href={`/dashboard${nav.link}`} shallow passHref>
                                            <Button 
                                                borderRadius='0' 
                                                leftIcon={nav.icon}
                                                w='full' 
                                                justifyContent='flex-start' 
                                                bg='transparent'
                                                _hover={{ bg: 'transparent', color: 'rgb(52,140,212)' }}
                                                color={currentApp === nav.name.replace(' ', '').toLowerCase() ? 'rgb(52,140,212)' : null}
                                            >
                                                {nav.name}
                                            </Button>
                                        </NextLink>
                                        <VStack spacing='0' pl='1.5em'>
                                            {nav.children.map((children, idx) => (
                                                <NextLink href={`/dashboard${children.link}`} shallow passHref key={idx}>
                                                    <Button 
                                                        borderRadius='0' 
                                                        w='full' 
                                                        justifyContent='flex-start' 
                                                        bg='transparent'
                                                        _hover={{ bg: 'transparent', color: 'rgb(52,140,212)' }}
                                                        fontSize='10pt'
                                                        color={currentApp === children.name.toLowerCase() ? 'rgb(52,140,212)' : null}
                                                    >
                                                        {children.name}
                                                    </Button>
                                                </NextLink>
                                            ))}
                                        </VStack>
                                    </Box>
                                ))}
                            </VStack>
                        </VStack>
                    ))}
                </VStack>
            )}
            <Flex flexDir='column' py='102px' ml={isSidebar ? '245px' : '0'} px='2rem' minH='100vh'>
                {children}
            </Flex>
        </>
    )
}

export default Layout