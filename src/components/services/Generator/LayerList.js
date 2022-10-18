import { Box, Text, Flex, Input, IconButton } from "@chakra-ui/react";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";
import { useGenerator } from "@/providers/GeneratorProvider";
import { useLayer } from "@/hooks/services/generator/useLayer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Layers = () => {
  const { layers, currentLayer, setLayers } = useGenerator();
  const { ChangeLayerName, PreviewLayer, DeleteLayer } = useLayer();

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!layers) return;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let layerArr = layers.slice();
    const [deletedItem] = layerArr.splice(source.index, 1);
    layerArr.splice(destination.index, 0, deletedItem);

    setLayers(layerArr);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="root">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {layers?.map((layer, idx) => (
              <Draggable
                draggableId={`${layer.name.trim().replaceAll(" ", "-")}-${idx}`}
                key={idx}
                index={idx}
              >
                {(provided) => (
                  <Box
                    style={provided.draggableProps.style}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    position="relative"
                    mt=".5em"
                  >
                    <Flex
                      w="170px"
                      h="55px"
                      borderLeftWidth={
                        idx === 0 || idx === layers.length - 1 ? "4px" : "0"
                      }
                      borderColor={idx === 0 ? "#08BDD4" : "orange"}
                      onClick={() => PreviewLayer(idx)}
                      justifyContent="center"
                      alignItems="center"
                      borderRadius="5px"
                      bg="whiteAlpha.200"
                      px="1em"
                    >
                      <Flex flexDir="column">
                        <Input
                          variant="unstyled"
                          value={layer.name}
                          fontSize="10pt"
                          onChange={(e) => ChangeLayerName(e, idx)}
                          fontWeight={currentLayer === idx ? "bold" : "normal"}
                        />
                        <Text
                          fontSize="8pt"
                          textAlign="left"
                          fontWeight="500"
                          mt=".25em"
                          pointerEvents="none"
                        >
                          Images: {layer.images.length}
                        </Text>
                      </Flex>
                    </Flex>
                    <IconButton
                      aria-label="Delete Layer"
                      position="absolute"
                      top="-2.5"
                      right="-2.5"
                      isRound
                      icon={<FaTrashAlt />}
                      size="sm"
                      onClick={() => DeleteLayer(idx)}
                      variant="primary"
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
  );
};

export default Layers;
