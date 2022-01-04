import { useToast, ButtonGroup, Button, IconButton, Icon, Text, Box } from '@chakra-ui/react'
import { useMoralis } from "react-moralis";  
import { FiCopy } from 'react-icons/fi'
import Sidebar from "./Sidebar"

const Layout = ({children, currentPage, setCurrentPage}) => {
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
                setCurrentPage={setCurrentPage}
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
                    justifyContent='flex-end'
                    h='81px'
                    pl='4'
                    pr='4'
                >
                    <ButtonGroup 
                        variant='outlined' 
                        justifyContent='flex-end' 
                        color='black'
                        isAttached
                    >
                        <IconButton 
                            aria-label='Copy account address' 
                            icon={<Icon as={FiCopy} />} 
                            borderWidth='1px' 
                            borderRadius='20px' 
                            onClick={handleCopyAddress} 
                        />
                        <Button 
                            ml='-px' 
                            borderWidth='1px' 
                            borderRadius='20px' 
                            onClick={handleCopyAddress}
                        >
                            <Text>{user.attributes.ethAddress}</Text>
                        </Button>
                        <Button 
                            ml='-px' 
                            borderWidth='1px'
                            borderRadius='20px' 
                            onClick={handleCopyAddress}
                        >
                            <Text>{`${user.attributes.balance.length > 6 ? user.attributes.balance.substring(0, 6) : user.attributes.balance} ETH`}</Text>
                        </Button>
                    </ButtonGroup>
                </Box>
                {children}
            </Box>
        </Box>
    )
}

export default Layout