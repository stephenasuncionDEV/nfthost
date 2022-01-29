import { useToast, ButtonGroup, Button, IconButton, Icon, Text, Box, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useMoralis } from "react-moralis";  
import { FiCopy } from 'react-icons/fi'
import { MdOutlineDarkMode } from 'react-icons/md'
import Sidebar from "./Sidebar"

const Layout = ({children, currentPage}) => {
    const { user } = useMoralis();
    const alert = useToast();
    const bg = useColorModeValue('rgb(255, 255, 255)', 'rgb(65,71,85)');
    const txt = useColorModeValue('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
    const { colorMode, toggleColorMode } = useColorMode();

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(user.attributes.ethAddress);
        alert({
            title: 'Your address has been copied.',
            description: "",
            status: 'info',
            duration: 3000,
        })
    }

    const handleCopyBalance = () => {
        navigator.clipboard.writeText(user.attributes.balance);
        alert({
            title: 'Your balanace has been copied.',
            description: "",
            status: 'info',
            duration: 3000,
        })
    }

    return (
        <Box
            h='full'
            display='flex'
            bg={bg}
        >
            <Sidebar 
                currentPage={currentPage}
            />
            <Box
                w='full'
                h='full'
                ml='100px'
                display='flex'
                flexDir='column'
            >
                <Box 
                    display='flex'
                    alignItems='center'
                    pl='4'
                    pr='4'
                    justifyContent='space-between'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                    >
                        <ButtonGroup 
                            h='81px'
                            variant='outlined' 
                            alignItems='center'
                            color={txt}
                            isAttached
                        >
                            <IconButton 
                                variant='solid'
                                aria-label='Copy account address' 
                                icon={<Icon as={FiCopy} />} 
                                borderWidth='1px' 
                                borderRadius='20px' 
                                size='sm'
                                onClick={handleCopyAddress} 
                            />
                            <Button 
                                variant='solid'
                                ml='-px' 
                                borderWidth='1px' 
                                borderRadius='20px' 
                                size='sm'
                                onClick={handleCopyAddress}
                            >
                                <Text>{user.attributes.ethAddress}</Text>
                            </Button>
                        </ButtonGroup>
                        <Button 
                            variant='solid'
                            ml='.5em' 
                            borderWidth='1px'
                            borderRadius='20px' 
                            size='sm'
                            onClick={handleCopyBalance}
                        >
                            <Text>{`${user.attributes.balance && user.attributes.balance.length > 6 ? user.attributes.balance.substring(0, 6) : user.attributes.balance} ETH`}</Text>
                        </Button>
                        <IconButton 
                            ml='.5em'
                            aria-label='Toggle Color Mode' 
                            icon={<MdOutlineDarkMode />} 
                            onClick={toggleColorMode} 
                        />
                    </Box>
                    <a href="https://www.producthunt.com/posts/nft-host?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nft-host" target="_blank">
                        <img src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=326763&theme=${colorMode === 'light' ? "light" : "dark"}`} alt='NFT Host - Generate and Host your NFT Collection in under 10 minutes | Product Hunt'/>
                    </a>
                </Box>
                {children}
            </Box>
        </Box>
    )
}

export default Layout