import { Box, useColorModeValue } from '@chakra-ui/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const CardInput = () => {
    const stripe = useStripe();
    const elements = useElements();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <Box bg={containerColor} borderRadius='10px' p='5'>
            <CardElement options={{ 
                hidePostalCode: true, 
                style: { 
                    base: {
                        color: 'white'
                    }
                } 
            }} />
        </Box>
    )
}

export default CardInput