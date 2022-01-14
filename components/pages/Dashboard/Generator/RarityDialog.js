import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Box, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalBody, 
    ModalCloseButton, ModalFooter, Button, 
    Input, List, ListItem, Avatar, Text,
    NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, NumberInput, HStack } from '@chakra-ui/react'

const RarityDialog = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {layerList, setLayerList} = props;
    const [layerIndex , setLayerIndex] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [imageRarityList, setImageRarityList] = useState([]);

    useImperativeHandle(ref, () => ({
        show(layerList, index) {  
            setLayerIndex(index);  
            let tempRarityListArray = [];
            layerList[index].images.forEach((image) => {
                tempRarityListArray.push({value: image.percentage, tempValue: image.value});
            });
            setMaxValue(layerList[index].images[0].maxValue);
            setImageRarityList(tempRarityListArray);
            onOpen();
        }
    }), [])

    const onChangeValue = (value, index) => {
        let tempRarityList = [...imageRarityList];
        tempRarityList[index].tempValue = value;

        let max = 0;
        tempRarityList.forEach((data) => {
            max += parseInt(data.tempValue);
        })
        setMaxValue(max);

        tempRarityList.forEach((data, idx) => {
            tempRarityList[idx].value = (data.tempValue / max * 100).toFixed(2);
        })

        setImageRarityList(tempRarityList);
    };

    const handleSaveClick = () => {
        let tempLayerList = [...layerList];

        tempLayerList[layerIndex].images.forEach((image, idx, array) => {
            array[idx].value = imageRarityList[idx].tempValue;
            array[idx].maxValue = maxValue;
            array[idx].percentage = imageRarityList[idx].value;
        });

        setLayerList(tempLayerList);
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rarity Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {layerList[layerIndex] && (
                        <Box
                            display='flex'
                            justifyContent='space-between'
                        >
                            <List>
                                {layerList[layerIndex].images.map((image, idx) => (
                                    <ListItem mt='2' key={idx}>
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                        >
                                            <Avatar
                                                alt={image.name}
                                                src={image.url}
                                            />
                                            <Text ml='2'>{image.name}</Text>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <List
                                mt='2'
                                display='flex'
                                flexDir='column'
                                justifyContent='space-between'
                            >
                                {imageRarityList.map((data, idx) => (
                                    <ListItem 
                                        key={idx} 
                                        h='48px'
                                    >
                                        <HStack
                                            spacing='24px'
                                        >
                                            <Text w='70px'>
                                                {data.value}%
                                            </Text>
                                            <NumberInput step={1} value={data.tempValue} min={1} onChange={(value) => onChangeValue(value, idx)} w='100px'>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Text>out of</Text>
                                            <Input 
                                                variant='outline' 
                                                value={maxValue} 
                                                disabled
                                                w='80px'
                                            />
                                        </HStack>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant='solid' colorScheme='gray' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button ml='2' variant='solid' colorScheme='blue' onClick={handleSaveClick}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(RarityDialog)