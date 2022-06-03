import { useCore } from '@/providers/CoreProvider'
import posthog from 'posthog-js'

export const usePayment = () => {
    const { paymentMethodStep, setPaymentMethodStep } = useCore();

    const Accept = () => {
        
    }

    return {
        Accept
    }
}