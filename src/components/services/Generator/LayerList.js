import { useState } from 'react'
import { Box, Text, Flex, Button, Input, IconButton } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useLayer } from '@/hooks/services/generator/useLayer'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Layers = () => {
    const { layers, currentLayer, setLayers } = useGenerator();
    const { 
        ChangeLayerName, 
        PreviewLayer, 
        DeleteLayer,
    } = useLayer();
    const [placeholderProps, setPlaceholderProps] = useState({});

    const getDraggedDom = (draggableId) => {
        const domQuery = `[data-rbd-drag-handle-draggable-id='${draggableId}']`;
        const draggedDOM = document.querySelector(domQuery);
        return draggedDOM;
    };

    const onDragStart = (e) => {
        const draggedDOM = getDraggedDom(e.draggableId);
        if (!draggedDOM) return;

        const { clientHeight, clientWidth } = draggedDOM;
        const sourceIndex = e.source.index;

        let clientY =
        parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
        [...draggedDOM.parentNode.children]
            .slice(0, sourceIndex)
            .reduce((total, curr) => {
                const style = curr.currentStyle || window.getComputedStyle(curr);
                const marginBottom = parseFloat(style.marginBottom);
                return total + curr.clientHeight + marginBottom;
            }, 0);

        setPlaceholderProps({
            clientHeight,
            clientWidth,
            clientY,
            clientX: parseFloat(
                window.getComputedStyle(draggedDOM.parentNode).paddingLeft
            )
        });
    }

    const onDragUpdate = (e) => {
        const draggedDOM = getDraggedDom(e.draggableId);
        if (!draggedDOM) return;

        const { clientHeight, clientWidth } = draggedDOM;
        const destinationIndex = e.destination.index;
        const sourceIndex = e.source.index;

        const childrenArray = [...draggedDOM.parentNode.children];

        const movedItem = childrenArray[sourceIndex];
        childrenArray.splice(sourceIndex, 1);

        const updatedArray = [
            ...childrenArray.slice(0, destinationIndex),
            movedItem,
            ...childrenArray.slice(destinationIndex + 1)
        ];
    
        let clientY =
        parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
        updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
                const style = curr.currentStyle || window.getComputedStyle(curr);
                const marginBottom = parseFloat(style.marginBottom);
                return total + curr.clientHeight + marginBottom;
        }, 0);

        setPlaceholderProps({
            clientHeight,
            clientWidth,
            clientY,
            clientX: parseFloat(
                window.getComputedStyle(draggedDOM.parentNode).paddingLeft
            )
        });
    }

    const onDragEnd = (result) => {
        const { destination, source } = result;

        setPlaceholderProps({});

        if (!layers) return;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let layerArr = layers.slice();
        const [deletedItem] = layerArr.splice(source.index, 1);
        layerArr.splice(destination.index, 0, deletedItem);

        setLayers(layerArr);
    }

    return (
        <DragDropContext 
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
        >
            <Droppable droppableId='root'>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {layers?.map((layer, idx) => (
                            <Draggable
                                draggableId={`${layer.name.trim().replaceAll(' ', '-')}-${idx}`}
                                key={layer.name.trim().replaceAll(' ', '-')}
                                index={idx}
                            >
                                {(provided, snapshot) => (
                                    <Box 
                                        style={provided.draggableProps.style}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        position='relative' 
                                        mt='.5em'
                                    >
                                        <Flex
                                            w='170px' 
                                            h='55px' 
                                            borderLeftWidth={idx === 0 || idx === layers.length - 1 ? '4px' : '0'} 
                                            borderColor={idx === 0 ? '#08BDD4' : 'orange'}
                                            onClick={() => PreviewLayer(idx)}
                                            justifyContent='center'
                                            alignItems='center'
                                            borderRadius='5px'
                                            bg='whiteAlpha.200'
                                            px='1em'
                                        >
                                            <Flex flexDir='column'>
                                                <Input 
                                                    variant='unstyled' 
                                                    value={layer.name} 
                                                    fontSize='10pt' 
                                                    onChange={(e) => ChangeLayerName(e, idx)} 
                                                    fontWeight={currentLayer === idx ? 'bold' : 'normal'}
                                                />
                                                <Text fontSize='8pt' textAlign='left' fontWeight='500' mt='.25em' pointerEvents='none'>
                                                    Images: {layer.images.length}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        <IconButton 
                                            aria-label='Delete Layer' 
                                            position='absolute'
                                            top='-2.5'
                                            right='-2.5'
                                            isRound
                                            icon={<FaTrashAlt />}
                                            size='sm'
                                            onClick={() => DeleteLayer(idx)}
                                            variant='primary'
                                        />
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}   
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Layers