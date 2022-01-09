import { useRef } from "react"
import { useToast, Box, Button, Image, Text, Link } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { IoMdWallet } from 'react-icons/io'
import WalletDialog from "./WalletDialog";

const Login = () => {
    const { authenticate, authError } = useMoralis();
    const walletDialogRef = useRef();
    const alert = useToast();

    // Check result of Wallet Dialog
    const handleWalletChange = (index) => {
        if (index === 0) { // Metamask
            authenticate({ 
                provider: "metamask", 
                chainId: process.env.CHAIN_ID
            })
            .then(() => {
                if (authError) throw new Error(authError.message.substring(authError.message.indexOf(':') + 2));
            })
            .catch(err => {
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
        }
    }

    // Show wallet dialog
    const handleConnectWithWallet = () => {
        walletDialogRef.current.show();
    }

    return (
        <Box
            h='full'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <WalletDialog 
                ref={walletDialogRef} 
                onChange={handleWalletChange} 
            />
            <Link href='/'>
                <Image 
                    src="/logo.png" 
                    alt="NFT Host Logo" 
                    boxSize='240px'
                    objectFit='scale-down'
                />
            </Link>
            <Text 
                fontSize='32pt'
                lineHeight='32pt'
            >
                NFT Host
            </Text>
            <Button 
                mt='4'
                variant='solid' 
                py='5'
                px='6'
                rightIcon={<IoMdWallet/>} 
                colorScheme='gray' 
                borderBottomWidth='3px'
                onClick={handleConnectWithWallet}
            >
                Connect to a Wallet
            </Button>
        </Box>
    )
}

export default Login