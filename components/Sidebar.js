import { useMoralis } from "react-moralis"
import { Flex, Avatar, Text, Button, List, ListItem, Icon, Container, Box} from '@chakra-ui/react'
import { AiFillHome } from 'react-icons/ai'
import { MdDashboard, MdLogout } from 'react-icons/md'
import { BsInfoSquareFill, BsDiscord } from 'react-icons/bs'

const menuItems = [
    {name: "Home", icon: 0},
    {name: "Dashboard", icon: 1},
    {name: "About", icon: 2},
];

const Sidebar = ({currentPage, setCurrentPage}) => {
    const { logout } = useMoralis();

    const handleMinimize = () => {
        console.log("Test")
    }

    const handleLogoClick = () => {
        location.href = "/";
    }

    const handleDiscordClick = () => {
        window.open("https://discord.gg/BMZZXZMnmv");
    }

    return (
        <Container 
            w='300px'
            h='100%'
            p='0'
            borderRightWidth='1px'
            display='flex'
            flexDir='column'
            alignItems='flex-start'
            pos='fixed'
        >
            <Box borderBottomWidth='1px' w='full' p='5'>
                <Button bg='white.500' onClick={handleLogoClick} isFullWidth>
                    <Flex align="center">
                        <Avatar name='NFT Host Logo' src='/logo.png' bg='white.500'/>
                        <Text ml='5' fontSize='14pt' >NFT Host</Text>
                    </Flex>
                </Button>
            </Box>
            <Container 
                h='full'
                display='flex'
                flexDir='column'
                justifyContent='space-between'
                p='5'
            >
                <List spacing='2' w='full'>
                    {menuItems.map((menu, idx) => (
                        <ListItem key={idx} h='50'>
                            <Button variant='solid' w='100%' h='100%' borderBottomWidth='3px' borderBottomColor={idx === currentPage ? 'blackAlpha.500' : 'black.500'} onClick={() => setCurrentPage(idx)}>
                                <Flex align='center' w='100%'>
                                    {menu.icon === 0 && <Icon as={AiFillHome} w='6' h='6' />}
                                    {menu.icon === 1 && <Icon as={MdDashboard} w='6' h='6' />}
                                    {menu.icon === 2 && <Icon as={BsInfoSquareFill} w='5' h='5' />}
                                    <Flex direction='column' grow='1'>
                                        {menu.name}
                                    </Flex>
                                </Flex>
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <List spacing='2'>
                    <ListItem h='50'>
                        <Button variant='solid' w='100%' h='100%' borderBottomWidth='3px' borderBottomColor='black.500' onClick={handleDiscordClick}>
                            <Flex align='center' w='100%'>
                                <Icon as={BsDiscord} w='6' h='6' />
                                <Flex direction='column' grow='1'>
                                    Discord
                                </Flex>
                            </Flex>
                        </Button>
                    </ListItem>
                    <ListItem h='50'>
                        <Button variant='solid' w='100%' h='100%' borderBottomWidth='3px' borderBottomColor='black.500' onClick={logout}>
                            <Flex align='center' w='100%'>
                                <Icon as={MdLogout} w='6' h='6' />
                                <Flex direction='column' grow='1'>
                                    Logout
                                </Flex>
                            </Flex>
                        </Button>
                    </ListItem>
                </List>
            </Container>
            <Box p='5' w='full' borderTopWidth='1px'>
                <Text flexGrow='1' fontSize='xs' color='grey' textAlign='center'>Made with 💖 by Stephen Asuncion</Text>
            </Box>
        </Container>
    )
}

export default Sidebar