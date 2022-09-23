import { Modal, ModalOverlay, ModalContent, ModalFooter,
    ModalHeader, ModalBody, ModalCloseButton, Text, Avatar, 
    Box, Grid, GridItem, NumberInput, NumberIncrementStepper, 
    NumberDecrementStepper, NumberInputStepper, NumberInputField
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from '@/components/AutoSizer'
import { useRarity } from '@/hooks/services/generator/useRarity'

const Row = ({ index, style, data } )=> {
    return (
        <Grid key={index} h='48px' templateColumns='repeat(6, 1fr)' gap={1} alignItems='center' style={style}>
            <GridItem>
                <Avatar size='sm' name={data.images[index].name} src={data.images[index].preview} bg='none'/>
            </GridItem>
            <GridItem w='150px'>
                <Text fontSize='11pt' noOfLines='1'>
                    {data.images[index].name}
                </Text>
            </GridItem>
            <GridItem w='120px'>
                <Text fontSize='11pt'>
                    {data.images[index].rarity.percentage.toFixed(2)} %
                </Text>
            </GridItem>
            <GridItem w='90px'>
                <NumberInput value={data.images[index].rarity.value} min={1} max={1000} onChange={(value) => data.ChangeRarityValue(parseInt(value), index)} size='sm'>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </GridItem>
            <GridItem ml='1.25em'>
                <Text fontSize='11pt'>
                    /
                </Text>
            </GridItem>
            <GridItem>
                <Text fontSize='11pt'>
                    {data.images[index].rarity.max}
                </Text>
            </GridItem>
        </Grid>
    )
}

const RarityModal = () => {
    const { isRarityModal, setIsRarityModal, currentLayer, layers } = useGenerator();
    const { ChangeRarityValue } = useRarity();

    return (
        <Modal onClose={() => setIsRarityModal(false)} isOpen={isRarityModal} isCentered size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Rarity Configuration
                    <Text fontSize='10pt' fontWeight='normal' mt='.5em'>
                        This will change the probability your trait will be used. It does not set how many times your trait will appear.
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box h='300px'>
                        <AutoSizer>
                            {({ width, height }) => (
                                <List 
                                    width={width}
                                    height={height}
                                    itemSize={48} 
                                    itemCount={layers[currentLayer]?.images.length} 
                                    itemData={{ images: layers[currentLayer]?.images, ChangeRarityValue: ChangeRarityValue }}
                                >
                                    {Row}
                                </List>
                            )}
                        </AutoSizer>
                    </Box>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default RarityModal