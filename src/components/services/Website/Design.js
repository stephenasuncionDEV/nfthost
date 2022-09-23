import { Text, Flex, VStack, useColorModeValue, Tag, 
    TagLeftIcon, HStack, Wrap, Divider, FormControl,
    Input, FormHelperText, FormErrorMessage, Button
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useDesign } from '@/hooks/services/website/useDesign'
import DesignInfo from '@/components/services/Website/DesignInfo'
import { GiCutDiamond } from 'react-icons/gi'
import { MdSave } from 'react-icons/md'
import { webColor } from '@/theme/index'

const Design = () => {
    const { 
        currentEditWebsite, 
        newErrors,
        newRevealDate,
        setNewRevealDate
    } = useWebsite();
    const { SaveStyle, isSaving } = useDesign();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <VStack 
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            h='100%'
            alignItems='flex-start'
            flex='1'
        >
            <Flex flexDir='column' alignItems='flex-start' w='full'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Design
                </Text>
                <Flex flexDir='column' mt='1em' w='full'>
                    <Wrap spacing='1em' w='full'>
                        <Flex flexDir='column' maxW='300px' flex='1'>
                            <DesignInfo />
                        </Flex>
                        <Flex flexDir='column' p='1em' flex='1'>
                            <Flex flexDir='column' w='full'>
                                <HStack justifyContent='flex-start' w='full'>
                                    <Text fontSize='10pt' >
                                        Settings
                                    </Text>
                                    {!currentEditWebsite?.isPremium && (
                                        <Tag>
                                            <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />
                                            <Text>
                                                Premium Only
                                            </Text>
                                        </Tag>
                                    )}
                                    <Divider flex='1' />
                                </HStack>
                                <HStack w='full' mt='1em'>
                                    <FormControl isInvalid={newErrors?.revealDate?.status} flex='1'>
                                        <Input type='datetime-local' placeholder='Reveal Date' value={newRevealDate} onChange={(e) => setNewRevealDate(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                                        {!newErrors?.revealDate?.status ? <FormHelperText fontSize='9pt'>Embed Reveal Date</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.revealDate?.message}</FormErrorMessage>}
                                    </FormControl>
                                </HStack>
                            </Flex>
                            <Flex justifyContent='flex-end' w='full'>
                                <Button
                                    variant='primary'
                                    leftIcon={<MdSave />}
                                    onClick={SaveStyle}
                                    disabled={!currentEditWebsite?.isPremium || isSaving}
                                    isLoading={isSaving}
                                    loadingText='Saving'
                                    size='sm'
                                >
                                    Save
                                </Button>
                            </Flex>
                        </Flex>
                    </Wrap>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default Design