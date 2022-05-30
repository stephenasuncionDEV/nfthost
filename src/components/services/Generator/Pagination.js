import { Text, HStack, Button, VStack } from '@chakra-ui/react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useGenerator } from '@/providers/GeneratorProvider'

const Pagination = ({ children }) => {
    const { step, setStep } = useGenerator();

    return (
        <VStack alignItems='flex-end' spacing='5em'>
            {children[step]}
            <HStack>
                <Button 
                    bg='transparent' 
                    leftIcon={<AiOutlineArrowLeft />} 
                    fontWeight='bold' 
                    onClick={() => setStep(step - 1)}
                    size='sm'
                    disabled={step === 0}
                >
                    Previous
                </Button>
                <Text fontWeight='bold' color='rgba(0,0,0,0.1)'>
                    |
                </Text>
                <Button 
                    bg='transparent' 
                    rightIcon={<AiOutlineArrowRight />} 
                    fontWeight='bold' 
                    onClick={() => setStep(step + 1)}
                    size='sm'
                    disabled={step === 1}
                >
                    Next
                </Button>
            </HStack>
        </VStack>
    )
}

export default Pagination