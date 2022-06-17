import { Box, Button, useColorModeValue } from '@chakra-ui/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCore } from '@/providers/CoreProvider'
import { usePayment } from '@/hooks/usePayment'

const CardInput = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { paymentData, isPaying } = useCore();
    const { PayWithStripe } = usePayment();

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
                variant='primary'
                w='full' 
                mt='1em' 
                onClick={() => PayWithStripe(stripe, elements, CardElement)} 
                isLoading={isPaying} 
                loadingText='Paying'
            >
                Pay ${paymentData?.price.toFixed(2)} USD
            </Button>
        </Box>
    )
}

export default CardInput