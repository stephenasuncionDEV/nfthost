import { useToast, ButtonGroup, Button, IconButton, Icon, Text, Box } from '@chakra-ui/react'
import { useMoralis } from "react-moralis";  
import { FiCopy } from 'react-icons/fi'
import Sidebar from "./Sidebar"

const Layout = ({children, currentPage}) => {
    const { user } = useMoralis();
    const alert = useToast();

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(user.attributes.ethAddress);
        alert({
            title: 'Your address has been copied.',
            description: "",
            status: 'info',
            duration: 3000,
        })
    }

    return (
        <Box
            h='full'
            display='flex'
        >
            <Sidebar 
                currentPage={currentPage}
            />
            <Box
                w='full'
                h='full'
                ml='300px'
                display='flex'
                flexDir='column'
            >
                <Box 
                    display='flex'
                    alignItems='center'
                    pl='4'
                    pr='4'
                >
                    <ButtonGroup 
                        h='81px'
                        variant='outlined' 
                        alignItems='center'
                        color='black'
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
                        <Button 
                            variant='solid'
                            ml='-px' 
                            borderWidth='1px'
                            borderRadius='20px' 
                            size='sm'
                            onClick={handleCopyAddress}
                        >
                            <Text>{`${user.attributes.balance && user.attributes.balance.length > 6 ? user.attributes.balance.substring(0, 6) : user.attributes.balance} ETH`}</Text>
                        </Button>
                    </ButtonGroup>
                </Box>
                {children}
            </Box>
        </Box>
    )
}

export default Layout