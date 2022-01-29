import { useRef } from "react";
import { useToast, Box, Text, IconButton, List, ListItem, Avatar, Button, Input, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useColorModeValue } from '@chakra-ui/react'
import { MdLayers, MdAdd, MdSettings } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaBalanceScale } from 'react-icons/fa'
import RarityDialog from './RarityDialog';
import style from "../../../../styles/Container.module.scss"

const LayerContainer = ({layerList, layerIndex, setLayerList, setLayerIndex}) => {
    const rarityDialogRef = useRef();
    const alert = useToast();
    const containerColor = useColorModeValue('transparent', 'rgb(50, 55, 67)');

    const onTitleChange = (e) => {
        let newLayerList = [...layerList];
        newLayerList[layerIndex].name = e.target.value;
        setLayerList(newLayerList);
    }

    const handleAddLayer = () => {
        const newLayer = {
            name: `Layer ${layerList.length + 1}`,
            images: []
        }
        setLayerList([...layerList, newLayer]);
        setLayerIndex(layerList.length);
    }

    const handleLayerClick = (index) => {
        setLayerIndex(index);
    }

    const handleDeleteLayer = (index) => {
        if (layerList.length == 1) {
            alert({
                title: 'Error',
                description: "You cannot delete the first layer.",
                status: 'error',
                duration: 3000,
            })
            return;
        }
        let newLayerList = [...layerList];
        newLayerList.splice(index, 1);
        setLayerList(newLayerList);
        setLayerIndex(layerList.length - 2);
    }

    const handleSettings = (index) => {
        if (layerList[index].images == 0) {
            alert({
                title: 'Error',
                description: "Selected layer must have images",
                status: 'error',
                duration: 3000,
            })
            return;
        }

        rarityDialogRef.current.show(layerList, index);
    }

    return (
        <Box
            maxW='300px'
            flex='1'
            mt='4'
            p='5'
            ml='4'
            borderRadius='5px'
            bg={containerColor}
        >
            <RarityDialog
                ref={rarityDialogRef} 
                layerList={layerList} 
                setLayerList={setLayerList}
            />
            <Text fontSize='16pt'>
                Layers
            </Text>
            <List mt='2'>
                <ListItem>
                    <Button
                        as='label'
                        justifyContent='flex-start'
                        variant='solid'
                        w='full'
                        h='70px'
                        onClick={handleAddLayer}
                    >
                        <Avatar
                            icon={<MdAdd />}
                        />
                        <Box
                            ml='5'
                            display='flex'
                            flexDir='column'
                            alignItems='flex-start'
                        >
                            <Text>Add Layer</Text>
                            <Text fontSize='10pt'>{layerList.length} Layers</Text>
                        </Box>
                    </Button>
                </ListItem>
                {layerList.map((layer, idx) => (
                    <ListItem key={idx} mt='4'>
                        <Button
                            as='label'
                            justifyContent='space-between'
                            variant='solid'
                            w='full'
                            h='70px'
                            borderBottomWidth='3px'
                            borderBottomColor={idx === layerIndex ? 'blackAlpha.500' : 'black.500'}
                            onClick={() => handleLayerClick(idx)}
                            cursor='pointer'
                        >
                            <Avatar
                                icon={<MdLayers />}
                                bg='rgb(255,103,35)'
                            />
                            <Box
                                display='flex'
                                flexDir='column'
                                alignItems='flex-start'
                                ml='5'
                            >
                                <Input variant='unstyled' value={layer.name} onChange={onTitleChange} />
                                <Text fontSize='10pt'>{layer.images.length} Images</Text>
                            </Box>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Layer Settings'
                                    icon={<MdSettings />}
                                    variant='outline'
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <MenuList>
                                    <MenuItem icon={<FaBalanceScale />} onClick={(e) => {
                                        e.stopPropagation();
                                        handleSettings(idx);
                                    }}>
                                        Rarity
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem icon={<AiOutlineDelete />} onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteLayer(idx)
                                    }}>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default LayerContainer