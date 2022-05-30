import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, HStack, Text, Flex, Button, 
    VStack, SlideFade, Input, Textarea,
    NumberInput, NumberInputField, NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper,
    Radio, RadioGroup, FormLabel, FormControl,
    Tag, TagCloseButton, TagLabel
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const Assets = ({ description }) => {
    const { 
        
    } = useGenerator();
    const {  } = useGenerate();

    return (
        <Box>
            <Text variant='content_subtitle'>
                Assets 
            </Text>
            <HStack>
                <AiOutlineInfoCircle />
                <Text variant='content_description' mt='0'>
                    {description}
                </Text>
            </HStack>
            <Box p='1em' mt='2em'>
                
            </Box>
        </Box>
    )
}

export default Assets