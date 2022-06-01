import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, useColorMode, IconButton } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { HiOutlineChevronDown, HiOutlineDesktopComputer, HiLogout } from 'react-icons/hi'
import { MdSettings, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import ConnectWalletTag from '@/components/ConnectWalletTag'

const Toolbar = () => {
    const { setIsMetadataModal } = useGenerator();
    const { Open, Save } = useGenerate();
    const { colorMode, toggleColorMode } = useColorMode();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <HStack 
            id='toolbar'
            px='.75em'
            py='.5em'
            bg={containerColor}
            borderRadius='10px'
            justifyContent='space-between'
        >
            <HStack>
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
            <HStack>
                <ConnectWalletTag isCopyAddress />
                <IconButton 
                    ml='.5em'
                    aria-label='Toggle Color Mode' 
                    icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} 
                    onClick={toggleColorMode} 
                    size='sm'
                />
            </HStack>
        </HStack>
    )
}

export default Toolbar