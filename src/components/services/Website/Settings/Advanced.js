import { useState, useEffect } from 'react'
import { VStack, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import DynamicInput from '@/components/DynamicInput'
import { webColor } from '@/theme/index'

const Advanced = () => {
    const { editingWebsite } = useWebsite();
    const { 
        updateIsPublished,
        isUpdatingWebsite
    } = useWebsiteControls();
    const [isPublished, setIsPublished] = useState(false);

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    useEffect(() => {
        if (!editingWebsite) return;
        setIsPublished(editingWebsite.isPublished);
    }, [editingWebsite])

    return (
        <Flex flexDir='column' mt='1em' flex='1'>
            <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em'
                maxW='865px'
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Publish</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Toggle to make your website viewable or not. Don't Forget to press Save.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='publish'
                        name='publish'
                        type='switch'
                        placeholder='Subdomain'
                        isChecked={isPublished}
                        onChange={setIsPublished}
                        mt='1em'
                        maxW='380px'
                        addonRight
                        addonRightText='.nfthost.app'
                        textTransform='lowercase'
                        size='lg'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateIsPublished(isPublished)}
                        disabled={isUpdatingWebsite || isPublished === editingWebsite?.isPublished}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Advanced