import { useState, useRef } from "react";
import { useToast, Box, Text, Button, IconButton, Switch, useColorModeValue } from '@chakra-ui/react'
import { BsImageFill } from 'react-icons/bs'
import { MdCode } from 'react-icons/md'
import ImageDialog from "./ImageDialog";
import ScriptDialog from "./ScriptDialog"
import style from "../../../../styles/Container.module.scss"

const LayerDisplay = ({layerList, layerIndex, setLayerList}) => {
    const [fileOverState, setFileOverState] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const imageDialogRef = useRef();
    const scriptDialogRef = useRef();
    const alert = useToast();
    const bg = useColorModeValue('transparent', 'rgb(33, 37, 41)');
    const containerColor = useColorModeValue('transparent', 'rgb(50, 55, 67)');
    const containerColor2 = useColorModeValue('rgb(243, 243, 243)', 'rgb(33, 37, 41)');

    const fileHandler = (files) => {
        let newImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.match(/image.png/)) {
                alert({
                    title: 'Error',
                    description: "Please upload PNG files only",
                    status: 'error',
                    duration: 3000,
                })
                return;
            }
            newImages.push({
                url: URL.createObjectURL(file),
                name: file.name.substring(0, file.name.lastIndexOf('.')),
                value: -1,
                maxValue: -1,
                percentage: -1,
                type: file.type.substring(file.type.indexOf('/') + 1)
            });
        }
        let newLayerList = [...layerList];
        const oldImageList = newLayerList[layerIndex].images;
        newLayerList[layerIndex].images = oldImageList.length == 0 ? newImages : [...oldImageList, ...newImages];

        newLayerList[layerIndex].images.forEach((image, idx, array) => {
            array[idx].value = 50;
            array[idx].maxValue = array.length * 50;
            array[idx].percentage = (100 / array.length).toFixed(2);
        });

        setLayerList(newLayerList);
    }

    const onEditableChange = (e) => {
        setIsEditable(e.target.checked);
    };

    const onDragLeave = (e) => {
        setFileOverState(false);
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setFileOverState(true);
    }

    const onDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setFileOverState(false);
        fileHandler(e.dataTransfer.files);
    }

    const handleUploadClick = (e) => {
        fileHandler(e.target.files);
    }

    const handleDeleteItem = (index) => {
        let newLayerList = [...layerList];
        newLayerList[layerIndex].images.splice(index, 1);
        setLayerList(newLayerList);
    }

    const handleItemClick = (index) => {
        imageDialogRef.current.show(index);
    }

    const handleOpenScript = () => {
        scriptDialogRef.current.show();
    }

    return (
        <Box
            flex='1'
            mt='4'
            p='5'
            borderRadius='5px'
            bg={containerColor}
        >
            <ScriptDialog 
                ref={scriptDialogRef}
                layerList={layerList} 
                setLayerList={setLayerList}
            />
            <ImageDialog 
                ref={imageDialogRef}
                onDeleteItem={handleDeleteItem}
            />
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Text fontSize='16pt'>
                    {layerList[layerIndex] && layerList[layerIndex].name} Images
                </Text>
                <Box>
                    <IconButton
                        aria-label='Open script dialog' 
                        icon={<MdCode />}
                        onClick={handleOpenScript}
                    />
                </Box>
            </Box>
            <Box
                position='relative'
                mt='2'
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    flexWrap='wrap'
                    minH='11.7em'
                    bg={containerColor2}
                    borderRadius='5px'
                    p='1'
                >
                    {layerList[layerIndex] && layerList[layerIndex].images.map((image, idx) => (
                        <Button 
                            key={idx}
                            ml='2'
                            mb='2'
                            bg='rgb(230, 230, 230)'
                            w='100px'
                            h='100px'
                            p='1'
                            style={{ borderRadius: '5px' }}
                            onClick={() => handleItemClick(idx)}
                        >
                            <img src={image.url} alt={image.name}/>
                        </Button>
                    ))}
                </Box>
                {!isEditable && (
                    <Button
                        position='absolute'
                        top='0'
                        w='full'
                        h='full'
                        display='flex'
                        flexDir='column'
                        as='label'
                        opacity='80%'
                        bg={bg}
                        borderRadius='5px'
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        cursor='pointer'
                    >
                        <BsImageFill />
                        <Text>Drag and drop images here!</Text>
                        <Text>(image/png, Max size: 10MB)</Text>
                        <input type="file" accept="image/png" name='files[]' onChange={handleUploadClick} multiple hidden/>
                    </Button>
                )}
            </Box>
            <Box
                mt='2'
                display='flex'
                justifyContent='flex-end'
                alignItems='center'
            >
                <Switch 
                    mt='1' 
                    size='md' 
                    isChecked={isEditable}
                    onChange={onEditableChange}
                />
                <Text ml='2'>Edit</Text>
            </Box>
        </Box>
    )
}

export default LayerDisplay