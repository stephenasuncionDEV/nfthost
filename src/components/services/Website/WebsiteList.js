import { Box, HStack, Text, Flex, Button, VStack, Input, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useLayer } from '@/hooks/useLayer'
import { MdOutlineAdd  } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'

const WebsiteList = () => {

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <VStack 
            id='website-list'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='10px'
            boxShadow='md'
            h='100%'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text variant='content_subtitle' mt='0'>
                    Your Websites
                </Text>
                <Text fontSize='10pt'>
                    List of mint websites you own
                </Text>
            </VStack>
        </VStack>
    )
}

export default WebsiteList