import { useRef } from "react"
import { useToast, Box, Text, IconButton, List, ListItem, Avatar, Button, Input } from '@chakra-ui/react'
import { MdLayers, MdClose, MdAdd, MdCode } from 'react-icons/md'
import ScriptDialog from "./ScriptDialog"
import style from "../../../styles/Container.module.scss"

const LayerContainer = ({layerList, layerIndex, setLayerList, setLayerIndex}) => {
    const alert = useToast();
    const scriptDialogRef = useRef();

    const onTitleChange = (e) => {
        let newLayerList = [...layerList];
        newLayerList[layerIndex].name = e.target.value;
        setLayerList(newLayerList);
    }

    const handleAddLayer = () => {
        if (layerList.length >= 6) return;
        const newLayer = {
            name: "New Layer",
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

    const handleOpenScript = (e) => {
        e.stopPropagation();
        scriptDialogRef.current.show();
    }

    return (
        <Box
            maxW='300px'
            flex='1'
            mt='4'
            bg='white' 
            p='5'
            ml='4'
            className={style.box}
        >
            <ScriptDialog 
                ref={scriptDialogRef}
                layerList={layerList} 
                setLayerList={setLayerList}
            />

            <Text fontSize='16pt'>
                Layers
            </Text>
            <List mt='2'>
                <ListItem>
                    <Button 
                        justifyContent='space-between'
                        variant='solid'
                        w='full'
                        h='70px'
                        className={style.box}
                        onClick={handleAddLayer}
                    >
                        <Avatar
                            icon={<MdAdd />}
                        />
                        <Box
                            display='flex'
                            flexDir='column'
                            alignItems='flex-start'
                        >
                            <Text>Add Layer</Text>
                            <Text fontSize='10pt'>{layerList.length} Layers</Text>
                        </Box>
                        <IconButton
                            icon={<MdCode />}
                            onClick={handleOpenScript}
                        />
                    </Button>
                </ListItem>
                {layerList.map((layer, idx) => (
                    <ListItem key={idx} mt='4'>
                        <Button
                            justifyContent='space-between'
                            variant='solid'
                            w='full'
                            h='70px'
                            className={style.box}
                            borderBottomWidth='3px'
                            borderBottomColor={idx === layerIndex ? 'blackAlpha.500' : 'black.500'}
                            onClick={() => handleLayerClick(idx)}
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
                        <IconButton
                            icon={<MdClose />}
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handleDeleteLayer(idx);
                            }}
                        />
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default LayerContainer