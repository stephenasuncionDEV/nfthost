import { useState, useEffect } from 'react'
import { VStack, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import DynamicInput from '@/components/DynamicInput'
import { webColor } from '@/theme/index'
import { convertDateToLocal } from '@/utils/tools'

const Advanced = () => {
    const { editingWebsite } = useWebsite();
    const { 
        updateIsPublished,
        updateRevealDate,
        isUpdatingWebsite
    } = useWebsiteControls();
    const [isPublished, setIsPublished] = useState(false);
    const [revealDate, setRevealDate] = useState('');

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    useEffect(() => {
        if (!editingWebsite) return;
        setIsPublished(editingWebsite.isPublished);
        setRevealDate(convertDateToLocal(editingWebsite.revealDate) || '');

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
                opacity={editingWebsite?.isExpired ? '.2' : '1'}
                pointerEvents={editingWebsite?.isExpired ? 'none' : 'all'}
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Publish</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Toggle to make your website viewable or not. Don&apos;t Forget to press Save.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='publish'
                        name='publish'
                        type='switch'
                        placeholder='Subdomain'
                        value={isPublished.toString()}
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
                        disabled={editingWebsite?.isExpired || isUpdatingWebsite || isPublished === editingWebsite?.isPublished}
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
                opacity={editingWebsite?.isExpired ? '.2' : '1'}
                pointerEvents={editingWebsite?.isExpired ? 'none' : 'all'}
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Embed Reveal Date</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Date and time to reveal the embed code
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='revealdate'
                        name='revealdate'
                        type='date'
                        value={revealDate}
                        onChange={setRevealDate}
                        mt='1em'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateRevealDate(revealDate)}
                        disabled={editingWebsite?.isExpired || isUpdatingWebsite || !revealDate.length || revealDate === convertDateToLocal(editingWebsite?.revealDate)}
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

export default Advanced