import { useState } from 'react'
import { Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { BsQuestion } from '@react-icons/all-files/bs/BsQuestion'
import { webColor } from '@/theme/index'

const Question = (props) => {
    const { children, spacing, prompt, w, top, left, flex, right, ...style } = props;
    const [isPrompt, setIsPrompt] = useState(false);

    const containerBg = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <HStack spacing={spacing || 0} position='relative' flex={flex}>
            {children}
            <BsQuestion 
                color='rgb(89,109,141)' 
                {...style} 
                onMouseOver={() => setIsPrompt(true)} 
                onMouseOut={() => setIsPrompt(false)} 
            />
            {(prompt?.length > 0 && isPrompt) && (
                <Flex 
                    flexDir='column' 
                    position='absolute' 
                    p='.5em' 
                    top={top || '7'} 
                    left={left || '0'}
                    bg={containerBg}
                    zIndex='2'
                    w={w || '200px'}
                    boxShadow='lg'
                >
                    <Text fontSize='9pt'>
                        {prompt}
                    </Text>
                </Flex>
            )}
        </HStack>
    )
}

export default Question