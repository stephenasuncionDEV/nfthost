import { Text, Flex, VStack, useColorModeValue, Tag, 
    TagLeftIcon, HStack, Wrap, Divider, FormControl,
    Input, FormHelperText, FormErrorMessage, Button
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCore } from '@/providers/CoreProvider'
import { useCurrentTemplate } from '@/hooks/useCurrentTemplate'
import CurrentTemplate from './CurrentTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { MdSave, MdVerified } from 'react-icons/md'
import { FaRedo, FaEdit } from 'react-icons/fa'
import { useTemplate } from '@/hooks/useTemplate'

const Design = () => {
    const { 
        currentEditWebsite, 
        newErrors,
        newBackgroundImage,
        setNewBackgroundImage,
        newBackgroundColor,
        setNewBackgroundColor,
        newRevealDate,
        setNewRevealDate
    } = useWebsite();
    const { setIsAreYouSureModal, setAreYouSureData } = useCore();
    const { SaveStyle, ResetStyle } = useCurrentTemplate();
    const { EditWebsiteTemplate } = useTemplate();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <VStack 
            id='currentTemplate'
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
                <HStack spacing='2em' justifyContent='space-between' w='full'>
                    <VStack alignItems='flex-start' spacing='0'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            Design
                        </Text>
                        <Text fontSize='10pt'>
                            Mint Website: <span style={{ color: 'rgb(52,140,212)' }}>{currentEditWebsite?.components?.title}</span>
                        </Text>
                    </VStack>
                    {currentEditWebsite?.isPremium && (
                        <Tag>
                            <TagLeftIcon as={MdVerified} color='#08BDD4' />
                            <Text color='#08BDD4'>
                                Premium Website
                            </Text>
                        </Tag>
                    )}
                </HStack>
                <VStack mt='1em' alignItems='flex-start' w='full'>
                    <Wrap spacing='1em' w='full'>
                        <VStack maxW='300px' alignItems='center' flex='1'>
                            <CurrentTemplate />
                            <Button size='sm' variant='primary' leftIcon={<FaEdit />} mt='1em' onClick={EditWebsiteTemplate}>
                                Edit Website Template
                            </Button>
                        </VStack>
                        <VStack p='1em' flex='1' spacing='2em'>
                            <VStack w='full' spacing='1.5em'>
                                {/* <VStack w='full'>
                                    <HStack justifyContent='flex-start' w='full'>
                                        <Text fontSize='10pt' >
                                            Style
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
                                    <HStack w='full'>
                                        <FormControl isInvalid={newErrors?.bgColor?.status} flex='1'>
                                            <Input placeholder='rgba(255,255,255,1) or #ffffff' value={newBackgroundColor} onChange={(e) => setNewBackgroundColor(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                                            {!newErrors?.bgColor?.status ? <FormHelperText fontSize='9pt'>Background color of your website</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.bgColor?.message}</FormErrorMessage>}
                                        </FormControl>
                                        <FormControl isInvalid={newErrors?.bgImage?.status} flex='1'>
                                            <Input placeholder='Background Image Link' value={newBackgroundImage} onChange={(e) => setNewBackgroundImage(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                                            {!newErrors?.bgImage?.status ? <FormHelperText fontSize='9pt'>Background image of your website</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.bgImage?.message}</FormErrorMessage>}
                                        </FormControl>
                                    </HStack>
                                </VStack> */}
                                <VStack w='full'>
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
                                    <HStack w='full'>
                                        <FormControl isInvalid={newErrors?.revealDate?.status} flex='1'>
                                            <Input type='datetime-local' placeholder='Reveal Date' value={newRevealDate} onChange={(e) => setNewRevealDate(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                                            {!newErrors?.revealDate?.status ? <FormHelperText fontSize='9pt'>Embed Reveal Date</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.revealDate?.message}</FormErrorMessage>}
                                        </FormControl>
                                    </HStack>
                                </VStack>
                            </VStack>
                            <HStack justifyContent='space-between' w='full'>
                                <Button
                                    variant='danger'
                                    leftIcon={<FaRedo />}
                                    onClick={() => {
                                        setAreYouSureData({
                                            item: 'style',
                                            action: 'Reset',
                                            icon: <FaRedo />,
                                            button: 'danger',
                                            callback: () => {
                                                ResetStyle();
                                            }
                                        })
                                        setIsAreYouSureModal(true);
                                    }}
                                    disabled={!currentEditWebsite?.isPremium}
                                    size='sm'
                                >
                                    Reset Style
                                </Button>
                                <Button
                                    variant='primary'
                                    leftIcon={<MdSave />}
                                    onClick={SaveStyle}
                                    disabled={!currentEditWebsite?.isPremium}
                                    size='sm'
                                >
                                    Save
                                </Button>
                            </HStack>
                        </VStack>
                    </Wrap>
                </VStack>
            </Flex>
        </VStack>
    )
}

export default Design