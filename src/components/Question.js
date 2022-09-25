import { useState } from 'react'
import { VStack, Button, Flex, HStack, Text, Divider, Heading,
    Tag, TagLabel, TagLeftIcon, Wrap, useColorModeValue
} from '@chakra-ui/react'
import { BsQuestion } from 'react-icons/bs'
import { webColor } from '@/theme/index'

const Question = (props) => {
    const { children, spacing, prompt, w, ...style } = props;
    const [isPrompt, setIsPrompt] = useState(false);

    const containerBg = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <HStack spacing={spacing || 0} position='relative'>
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
                    top='7' 
                    left='0'
                    bg={containerBg}
                    zIndex='1337'
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