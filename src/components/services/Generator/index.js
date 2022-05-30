import { Box, HStack, Text, VStack, 
    Button, Menu, MenuButton, MenuList, MenuItem,
    MenuItemOption, MenuGroup, MenuOptionGroup,
    MenuDivider, } from '@chakra-ui/react'
import Metadata from './Metadata'
import Assets from './Assets'
import Pagination from './Pagination'
import { HiOutlineChevronDown, HiOutlineDesktopComputer } from 'react-icons/hi'
import { useGenerate } from '@/hooks/useGenerate'

const Generator = () => {
    const { onOpen, onSave } = useGenerate();

    return (
        <Box px='4em' pt='2em'>
            <HStack alignItems='flex-end' spacing='2em'>
                <Text variant='content_title'>
                    Collection Generator
                </Text>
                <HStack borderRadius='5px' bg='blackAlpha.100' px='.25em' py='.25em' mt='.5em'>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />} size='sm'>
                            Open
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<HiOutlineDesktopComputer />} onClick={() => onOpen()}>Computer</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />} size='sm'>
                            Save
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<HiOutlineDesktopComputer />} onClick={() => onSave()}>Computer</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </HStack>
            <VStack alignItems='flex-start' mt='1em' spacing='3em'>
                <Pagination>
                    <Metadata description='General information of your new NFT collection' />
                    <Assets description='Resources neccessary to create your NFT collection' />
                </Pagination>
            </VStack>
        </Box>
    )
}

export default Generator