import { Text, Flex, VStack, useColorModeValue, Image, 
    Tag, TagLeftIcon, Wrap, Button, Box, Menu, MenuButton, 
    MenuList, MenuItem, MenuDivider
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCore } from '@/providers/CoreProvider'
import { useTemplate } from '@/hooks/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { MdSettings } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { HiLink } from 'react-icons/hi'

const CurrentTemplate = () => {
    const { 
        currentTemplate,
        currentEditWebsite, 
    } = useWebsite();
    const { RemoveAddon } = useTemplate();
    const { setIsAreYouSureModal, setAreYouSureData, setIsAddonSettingsModal, setAddonSettingsData } = useCore();

    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    return (
        <VStack
            p='1.5em'
            bg={componentColor}
            borderRadius='10px'
            alignItems='flex-start'
            h='100%'
        >
            <Text fontSize='10pt' mt='.25em'>
                Current Template
            </Text>
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
                    <Text noOfLines='1'>
                        {currentTemplate?.key}
                    </Text>
                    <Text fontSize='9pt' noOfLines='1'>
                        by {currentTemplate?.creator}
                    </Text>
                </Box>
                {currentEditWebsite?.components?.addons?.length > 0 && (
                    <Box>
                        <Text fontSize='10pt' mb='.25em'>
                            Addons:
                        </Text>
                        <Wrap w='full'>
                            {currentEditWebsite?.components?.addons?.map((addon, idx) => (
                                <Menu key={idx}>
                                    <MenuButton 
                                        as={Button} 
                                        variant='outline' 
                                        borderColor='rgb(52,140,212)' 
                                        color='rgb(52,140,212)'
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
                                        {(addon === 'Navbar' || addon === 'Footer') && (
                                            <>
                                                <MenuItem size='sm' icon={<HiLink />} onClick={() => {
                                                    setAddonSettingsData({
                                                        item: 'socials',
                                                        addon
                                                    })
                                                    setIsAddonSettingsModal(true);
                                                }}>
                                                    Socials
                                                </MenuItem>
                                                <MenuDivider/>
                                            </>
                                        )}
                                        <MenuItem size='sm' icon={<FaTrash />} onClick={() => {
                                            setAreYouSureData({
                                                item: 'addon',
                                                action: 'Remove',
                                                icon: <FaTrash />,
                                                button: 'danger',
                                                callback: () => {
                                                    RemoveAddon(addon);
                                                }
                                            });
                                            setIsAreYouSureModal(true);
                                        }}>Remove</MenuItem>
                                    </MenuList>
                                </Menu>
                            ))}
                        </Wrap>
                    </Box>
                )}
            </VStack>
        </VStack> 
    )
}

export default CurrentTemplate