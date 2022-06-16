import { Text, Flex, VStack, useColorModeValue, Image, 
    Tag, TagLeftIcon, HStack, Wrap, Divider, FormControl,
    Input, FormHelperText, FormErrorMessage, Button, Box,
    Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCurrentTemplate } from '@/hooks/useCurrentTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { MdSave, MdVerified, MdSettings } from 'react-icons/md'
import { FaRedo } from 'react-icons/fa'
import { useTemplate } from '@/hooks/useTemplate'

const CurrentTemplate = () => {
    const { 
        currentTemplate,
        currentEditWebsite, 
        newErrors,
        newBackgroundImage,
        setNewBackgroundImage,
        newBackgroundColor,
        setNewBackgroundColor,
        newRevealDate,
        setNewRevealDate
    } = useWebsite();
    const { SaveStyle, ResetStyle } = useCurrentTemplate();
    const { RemoveAddon } = useTemplate();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const itemColor = useColorModeValue('whiteAlpha.400', 'blackAlpha.400');

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
        >
            <Flex flexDir='column' alignItems='flex-start' w='full'>
                <HStack spacing='2em'>
                    <VStack alignItems='flex-start' spacing='0'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            Current Template
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
                        <VStack
                            p='1.5em'
                            bg={itemColor}
                            borderRadius='10px'
                            w='290px'
                            alignItems='flex-start'
                            borderWidth='2px'
                            borderStyle='dashed'
                            h='100%'
                        >
                            <Flex
                                h='180px'
                                w='240px'
                                overflow='hidden'
                                position='relative'
                                borderRadius='5px'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Image 
                                    position='absolute'
                                    src={`/assets/templates/${currentTemplate?.key}.png`}
                                    objectFit='cover' 
                                    boxSize='250px'
                                    opacity='.6' 
                                />
                                <Tag position='absolute' top='2' right='2'>
                                    {currentTemplate?.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />}
                                    <Text>
                                        {currentTemplate?.sub === 'premium' ? 'Premium' : 'Free'}
                                    </Text>
                                </Tag>
                            </Flex>
                            <VStack spacing='1em' alignItems='flex-start'>
                                <Box>
                                    <Text fontSize='12pt' noOfLines='1'>
                                        {currentTemplate?.key}
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        by {currentTemplate?.creator}
                                    </Text>
                                </Box>
                                {currentEditWebsite?.components?.addons?.length > 0 && (
                                    <Box>
                                        <Text fontSize='10pt'>
                                            Addons:
                                        </Text>
                                        <Wrap w='full'>
                                            {currentEditWebsite?.components?.addons?.map((addon, idx) => (
                                                <Menu key={idx}>
                                                    <MenuButton 
                                                        as={Button} 
                                                        variant='outline' 
                                                        colorScheme='blue' 
                                                        rightIcon={<MdSettings />} 
                                                        size='sm' 
                                                        h='1.75rem' 
                                                        minW='1.5rem' 
                                                        px='.65em' 
                                                        fontSize='10pt'
                                                    >
                                                        {addon}
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem onClick={() => RemoveAddon(addon)}>Remove</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            ))}
                                        </Wrap>
                                    </Box>
                                )}
                            </VStack>
                        </VStack> 
                        <VStack p='1em' flex='1' justifyContent='justify-between' spacing='2em'>
                            <VStack w='full' spacing='1.5em'>
                                <VStack w='full'>
                                    <HStack justifyContent='flex-start' w='full'>
                                        <Text fontSize='10pt' >
                                            Style
                                        </Text>
                                        {!currentEditWebsite.isPremium && (
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
                                            {!newErrors?.bgColor?.status ? <FormHelperText>Background color of your website</FormHelperText> : <FormErrorMessage>{newErrors?.bgColor?.message}</FormErrorMessage>}
                                        </FormControl>
                                        <FormControl isInvalid={newErrors?.bgImage?.status} flex='1'>
                                            <Input placeholder='Background Image Link' value={newBackgroundImage} onChange={(e) => setNewBackgroundImage(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                                            {!newErrors?.bgImage?.status ? <FormHelperText>Background image of your website</FormHelperText> : <FormErrorMessage>{newErrors?.bgImage?.message}</FormErrorMessage>}
                                        </FormControl>
                                    </HStack>
                                </VStack>
                                <VStack w='full'>
                                    <HStack justifyContent='flex-start' w='full'>
                                        <Text fontSize='10pt' >
                                            Settings
                                        </Text>
                                        {!currentEditWebsite.isPremium && (
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
                                            {!newErrors?.revealDate?.status ? <FormHelperText>Embed Reveal Date</FormHelperText> : <FormErrorMessage>{newErrors?.revealDate?.message}</FormErrorMessage>}
                                        </FormControl>
                                    </HStack>
                                </VStack>
                            </VStack>
                            <Flex w='full' justifyContent='flex-end'>
                                <HStack>
                                    <Button
                                        bg='red.500' 
                                        _hover={{ bg: 'red.400' }} 
                                        rightIcon={<FaRedo />}
                                        onClick={ResetStyle}
                                        disabled={!currentEditWebsite?.isPremium}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        bg='orange.500' 
                                        _hover={{ bg: 'orange.400' }} 
                                        rightIcon={<MdSave />}
                                        onClick={SaveStyle}
                                        disabled={!currentEditWebsite?.isPremium}
                                    >
                                        Save
                                    </Button>
                                </HStack>
                            </Flex>
                        </VStack>
                    </Wrap>
                </VStack>
            </Flex>
        </VStack>
    )
}

export default CurrentTemplate