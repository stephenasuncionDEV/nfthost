import { useRef } from "react";
import { useMoralis } from "react-moralis"
import { Flex, Avatar, Text, Button, List, ListItem, Icon, Container, Box} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import { MdDashboard, MdLogout, MdPayments } from 'react-icons/md'
import { BsInfoSquareFill, BsDiscord } from 'react-icons/bs'
import ConfirmationDialog from "./ConfirmationDialog"

const menuItems = [
    {name: "Home", icon: 0},
    {name: "Dashboard", icon: 1},
    {name: "Payments", icon: 2},
    {name: "About", icon: 3},
];

const Sidebar = ({currentPage}) => {
    const { logout } = useMoralis();
    const router = useRouter();
    const confirmationDialogRef = useRef();

    const handleTabClick = (tabName) => {
        if (localStorage.getItem("isRendering") === "true") {
            confirmationDialogRef.current.show({
                description: "Your NFT collection is currently rendering. Do you want to go to another page and lose all your work?",
                button: "Proceed",
                buttonColor: "blue",
                data: tabName
            });
            return;
        }
        onChangeTabs(tabName);
    }

    const onChangeTabs = (tabName) => {
        router.query.page = tabName.toLowerCase();
        router.push({ 
            pathname: '/console',
            query: { ...router.query } }, 
            undefined, 
            {}
        )
        localStorage.setItem("isRendering", false);
    }

    const handleLogoClick = () => {
        location.href = "/";
    }

    const handleDiscordClick = () => {
        window.open("https://discord.gg/BMZZXZMnmv");
    }

    return (
        <Container 
            w='100px'
            h='100%'
            p='0'
            borderRightWidth='1px'
            display='flex'
            flexDir='column'
            alignItems='flex-start'
            pos='fixed'
        >
            <ConfirmationDialog 
                ref={confirmationDialogRef}
                onConfirm={onChangeTabs}
            />
            <Box borderBottomWidth='1px' w='full' p='5'>
                <Button bg='white.500' onClick={handleLogoClick} isFullWidth>
                    <Flex align="center">
                        <Avatar name='NFT Host Logo' src='/logo.png' bg='white.500'/>
                        {/* <Text ml='5' fontSize='14pt' >NFT Host</Text> */}
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
                            <Button variant='solid' w='100%' h='100%' borderBottomWidth='3px' borderBottomColor={idx === currentPage ? 'blackAlpha.500' : 'black.500'} onClick={() => handleTabClick(menu.name)}>
                                <Flex align='center' w='100%' justifyContent='center'>
                                    {menu.icon === 0 && <Icon as={AiFillHome} w='6' h='6' />}
                                    {menu.icon === 1 && <Icon as={MdDashboard} w='6' h='6' />}
                                    {menu.icon === 2 && <Icon as={MdPayments} w='6' h='6' />}
                                    {menu.icon === 3 && <Icon as={BsInfoSquareFill} w='5' h='5' />}
                                    {/* <Flex direction='column' grow='1'>
                                        {menu.name}
                                    </Flex> */}
                                </Flex>
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <List spacing='2'>
                    <ListItem h='50'>
                        <Button variant='solid' w='100%' h='100%' borderBottomWidth='3px' borderBottomColor='black.500' onClick={handleDiscordClick}>
                            <Flex align='center' w='100%' justifyContent='center'>
                                <Icon as={BsDiscord} w='6' h='6' />
                                {/* <Flex direction='column' grow='1'>
                                    Discord
                                </Flex> */}
                            </Flex>
                        </Button>
                    </ListItem>
                    <ListItem h='50'>
                        <Button variant='solid' w='100%' h='100%' borderBottomWidth='3px' borderBottomColor='black.500' onClick={logout}>
                            <Flex align='center' w='100%' justifyContent='center'>
                                <Icon as={MdLogout} w='6' h='6' />
                                {/* <Flex direction='column' grow='1'>
                                    Logout
                                </Flex> */}
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