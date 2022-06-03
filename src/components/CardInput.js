import { Box, Button, useColorModeValue } from '@chakra-ui/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCore } from '@/providers/CoreProvider'
import { usePayment } from '@/hooks/usePayment'
import { useUser } from '@/providers/UserProvider'

const CardInput = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { paymentData, isPaying } = useCore();
    const { PayWithStripe } = usePayment();
    const { user } = useUser();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <Box bg={containerColor} borderRadius='10px' p='5' w='full'>
            <CardElement options={{ 
                hidePostalCode: true, 
                style: { 
                    base: {
                        color: 'white'
                    }
                } 
            }} />
            <Button 
                w='full' 
                mt='1em' 
                bg='green.500' 
                color='black' 
                onClick={() => PayWithStripe(stripe, elements, user._id, CardElement)} 
                _hover={{ bg: 'green.400' }}
                disabled={isPaying}
            >
                Pay ${paymentData?.price.toFixed(2)} USD
            </Button>
        </Box>
    )
}

export default CardInput