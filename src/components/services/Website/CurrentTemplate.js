import { Text, VStack, useColorModeValue, Wrap, Button, 
    Box, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Tag
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useCore } from '@/providers/CoreProvider'
import { useTemplate } from '@/hooks/services/website/useTemplate'
import { MdSettings } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { HiLink } from 'react-icons/hi'

const CurrentTemplate = () => {
    const { 
        currentEditWebsite
    } = useWebsite();
    const { RemoveAddon, RemoveTemplate } = useTemplate();
    const { setIsAreYouSureModal, setAreYouSureData, setIsAddonSettingsModal, setAddonSettingsData } = useCore();

    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    return (
        <VStack
            p='1.5em'
            bg={componentColor}
            borderRadius='10px'
            alignItems='flex-start'
            h='100%'
            w='full'
        >
            <VStack spacing='1em' alignItems='flex-start'>
                <Box>
                    <Text fontSize='10pt' mb='.25em'>
                        Template(s):
                    </Text>
                    <Wrap w='full'>
                        {currentEditWebsite?.components?.templates?.length > 0 ? (
                            <>
                            {currentEditWebsite?.components?.templates?.map((template, idx) => (
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
                                        {template}
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem size='sm' icon={<FaTrash />} onClick={() => {
                                            setAreYouSureData({
                                                item: 'template',
                                                action: 'Remove',
                                                icon: <FaTrash />,
                                                button: 'danger',
                                                callback: () => {
                                                    RemoveTemplate(template);
                                                }
                                            });
                                            setIsAreYouSureModal(true);
                                        }}>Remove</MenuItem>
                                    </MenuList>
                                </Menu>
                            ))}
                            </>
                        ) : (
                            <Tag size='sm' variant='outline' px='.65em' h='1.75rem'>
                                Default
                            </Tag>
                        )}
                    </Wrap>
                </Box>
                <Box>
                    <Text fontSize='10pt' mb='.25em'>
                        Addon(s):
                    </Text>
                    <Wrap w='full'>
                        {currentEditWebsite?.components?.addons?.length > 0 ? (
                            <>
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
                            </>
                        ) : (
                            <Tag size='sm' variant='outline' px='.65em' h='1.75rem'>
                                None
                            </Tag>
                        )}
                    </Wrap>
                </Box>
            </VStack>
        </VStack> 
    )
}

export default CurrentTemplate