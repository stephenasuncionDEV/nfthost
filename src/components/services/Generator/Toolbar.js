import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, useColorModeValue } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { HiOutlineChevronDown, HiOutlineDesktopComputer } from 'react-icons/hi'
import { MdSettings } from 'react-icons/md'

const Toolbar = () => {
    const { setIsMetadataModal } = useGenerator();
    const { Open, Save } = useGenerate();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <HStack 
            id='toolbar'
            px='.75em'
            py='.5em'
            bg={containerColor}
            borderRadius='10px'
        >
            <Menu>
                <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />} size='sm'>
                    Open
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<HiOutlineDesktopComputer />} onClick={() => Open()}>Computer</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />} size='sm'>
                    Save
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<HiOutlineDesktopComputer />} onClick={() => Save()}>Computer</MenuItem>
                </MenuList>
            </Menu>
            <Button rightIcon={<MdSettings />} size='sm' onClick={() => setIsMetadataModal(true)}>
                Metadata
            </Button>
            <Button rightIcon={<MdSettings />} size='sm'>
                Rarity
            </Button>
        </HStack>
    )
}

export default Toolbar