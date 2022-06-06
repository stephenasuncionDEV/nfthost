import { Box, HStack, Text, Flex, Button, VStack, Input, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useLayer } from '@/hooks/useLayer'
import { MdOutlineAdd  } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'

const Sites = () => {

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
            alignItems='flex-start'
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

export default Sites