import { Text, Flex, VStack, useColorModeValue, Tag, 
    TagLeftIcon, HStack, Wrap, Divider, FormControl,
    Input, FormHelperText, FormErrorMessage, Button, Box
} from '@chakra-ui/react'
import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'
import { useWebsiteEditor } from '@/hooks/useWebsiteEditor'
import Meta from '@/components/Meta'

const WebsiteEditor = () => {
    const { editor } = useWebsiteEditor();

    return (
        <Flex flexDir='column' minH='100vh'>
            <Meta title='Website Editor | NFTHost' />
            <div id='editor'></div>
        </Flex>
    )
}

export default WebsiteEditor