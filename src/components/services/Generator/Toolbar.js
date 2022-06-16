import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { useToolbar } from '@/hooks/useToolbar'
import { HiOutlineChevronDown, HiOutlineDesktopComputer } from 'react-icons/hi'
import { MdSettings } from 'react-icons/md'
import { FaPlay, FaDownload } from 'react-icons/fa'
import { useRarity } from '@/hooks/useRarity'

const Toolbar = () => {
    const { setIsMetadataModal, isGenerated, setIsDownloadModal } = useGenerator();
    const { Generate } = useGenerate();
    const { OpenComputer, Save } = useToolbar();
    const { OpenRarityModal } = useRarity();
    const { colorMode, toggleColorMode } = useColorMode();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <HStack 
            id='toolbar'
            px='.75em'
            py='.5em'
            bg={containerColor}
            borderRadius='5px'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            justifyContent='space-between'
        >
            <HStack>
                <Menu>
                    <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />} size='sm'>
                        Open
                    </MenuButton>
                    <MenuList>
                        <Button leftIcon={<HiOutlineDesktopComputer />} w='full' justifyContent='flex-start' bg='transparent' cursor='pointer' borderRadius='0'>
                            <input 
                                type="file" 
                                id="my-file" 
                                onClick={(e) => e.target.value = null}
                                onChange={OpenComputer} 
                                hidden 
                                accept='application/JSON'
                            /> 
                            <label htmlFor="my-file" style={{ cursor: 'pointer' }}>
                                Computer
                            </label>
                        </Button>
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
                <Button size='sm' leftIcon={<FaPlay />} color='green.500' onClick={Generate}>
                    Generate
                </Button>
                <Button rightIcon={<MdSettings />} size='sm' onClick={() => setIsMetadataModal(true)}>
                    Metadata
                </Button>
                <Button rightIcon={<MdSettings />} size='sm' onClick={OpenRarityModal}>
                    Rarity
                </Button>
                {isGenerated && (
                    <Button rightIcon={<FaDownload />} size='sm' onClick={() => setIsDownloadModal(true)}>
                        Download
                    </Button>
                )}
            </HStack>
        </HStack>
    )
}

export default Toolbar