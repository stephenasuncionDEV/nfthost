import { useColorModeValue, Flex, Text, VStack, HStack, IconButton, Input, Link } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/useSites'
import { FaExternalLinkAlt } from 'react-icons/fa'
import config from '@/config/index'

const WebsiteInfo = () => {
    const { currentEditWebsite } = useWebsite();
    const { CopyWebsiteLink } = useSites();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return currentEditWebsite && (
        <Flex flexDir='column' alignItems='flex-end'>
            <HStack 
                bg={containerColor}
                borderRadius='.25em'
                boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                py='.5em'
                px='1em'
                alignItems='center'
                spacing='1em'
            >
                <Text fontSize='10pt'>
                    Selected Website: <span style={{ color: 'rgb(52,140,212)' }}>{currentEditWebsite?.components?.title}</span>
                </Text>
                <HStack>
                    <Input 
                        readOnly 
                        value={`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`} 
                        textAlign='center'
                        cursor='pointer' 
                        _hover={{ opacity: '.5' }} 
                        onClick={CopyWebsiteLink}
                        size='sm'
                    />
                    <Link href={`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`} isExternal>
                        <IconButton size='sm'>
                            <FaExternalLinkAlt />
                        </IconButton>
                    </Link>
                </HStack>
            </HStack>
        </Flex>
    )
}

export default WebsiteInfo