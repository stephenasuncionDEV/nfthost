import { HStack, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { HiOutlineChevronDown, HiOutlineDesktopComputer } from 'react-icons/hi'
import { MdSettings } from 'react-icons/md'

const Toolbar = () => {
    const { setIsMetadataModal } = useGenerator();
    const { onOpen, onSave } = useGenerate();

    return (
        <HStack 
            id='toolbar'
            position='absolute'
            right='0'
            mr='1em'
            px='.75em'
            py='.5em'
            bg='whiteAlpha.900' 
            borderRadius='10px'
            boxShadow='md'
        >
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