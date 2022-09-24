import { useState, useEffect } from 'react'
import { VStack, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import DynamicInput from '@/components/DynamicInput'
import { webColor } from '@/theme/index'

const Design = () => {
    const { editingWebsite } = useWebsite();
    const { 
        updateFavicon,
        updateLogo,
        isUpdatingWebsite,
        editInputState
    } = useWebsiteControls();
    const [favicon, setFavicon] = useState('');
    const [logo, setLogo] = useState('');

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    useEffect(() => {
        if (!editingWebsite) return;
        setFavicon(editingWebsite.meta.favicon);
        setLogo(editingWebsite.components.unrevealedImage);
    }, [editingWebsite])

    return (
        <VStack mt='1em' flex='1' alignItems='flex-start' spacing='2em'>
            <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em' 
                maxW='865px' 
                w='full'
                border='1px solid rgb(117,63,229)'
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Favicon URL</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            An external link to an Icon file representing your website. This will be displayed on your browser's tab.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='favicon'
                        name='favicon'
                        type='text'
                        placeholder='Favicon URL'
                        value={favicon}
                        onChange={setFavicon}
                        isInvalid={editInputState?.favicon?.status}
                        errorText={editInputState?.favicon?.message}
                        mt='1em'
                        flex='1'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateFavicon(favicon)}
                        disabled={isUpdatingWebsite || !favicon.length || favicon === editingWebsite?.meta?.favicon}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em' 
                maxW='865px' 
                w='full'
                border='1px solid rgb(117,63,229)'
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Logo URL</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            An external link to an Icon file representing your website. This will be displayed on your browser's tab.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='logo'
                        name='logo'
                        type='text'
                        placeholder='Logo URL'
                        value={logo}
                        onChange={setLogo}
                        isInvalid={editInputState?.logo?.status}
                        errorText={editInputState?.logo?.message}
                        mt='1em'
                        flex='1'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateLogo(logo)}
                        disabled={isUpdatingWebsite || !logo.length || logo === editingWebsite?.components?.unrevealedImage}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default Design