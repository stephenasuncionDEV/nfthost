import { useColorModeValue, Flex, Text, HStack, 
    IconButton, Input, Link, Menu, MenuButton, MenuList, 
    MenuItem, Button, Avatar
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/useSites'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { HiOutlineChevronDown } from 'react-icons/hi'
import config from '@/config/index'

const WebsiteInfo = () => {
    const { websites, currentEditWebsite } = useWebsite();
    const { CopyWebsiteLink, EditWebsite } = useSites();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return currentEditWebsite && (
        <Flex flexDir='column' alignItems='flex-end'>
            <Menu>
                <HStack 
                    bg={containerColor}
                    borderRadius='.25em'
                    boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                    py='.5em'
                    px='1em'
                    alignItems='center'
                    spacing='1em'
                >
                    <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />} bg='transparent' size='sm' px='.5em'>
                        <Text fontSize='10pt'>
                            Selected Website: <span style={{ color: 'rgb(52,140,212)' }}>{currentEditWebsite?.components?.title}</span>
                        </Text>
                    </MenuButton>
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
                <MenuList>
                    {websites?.map((website, idx) => (
                        <MenuItem size='sm' key={idx} justifyContent='flex-start' onClick={() => EditWebsite(website)}>
                            <HStack justifyContent='flex-start'>
                                <Avatar src={website.components.unrevealedImage} name={`${website.components.title}'s Logo`} size='sm' bg='transparent' />
                                <Text fontSize='10pt'>
                                    {website.components.title}
                                </Text>
                            </HStack>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default WebsiteInfo