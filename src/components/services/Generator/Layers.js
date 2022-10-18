import {
  Box,
  HStack,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { useLayer } from "@/hooks/services/generator/useLayer";
import LayerList from "@/components/services/Generator/LayerList";
import { webColor } from "@/theme/index";

const Layers = () => {
  const { AddLayer } = useLayer();

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  return (
    <VStack
      spacing="1.5em"
      p="1em"
      bg={containerColor}
      borderRadius=".25em"
      h="100%"
      border="1px solid rgb(117,63,229)"
    >
      <HStack spacing="2em">
        <Text fontWeight="bold" fontSize="10pt">
          Layers
        </Text>
        <Button
          size="sm"
          rightIcon={<MdAdd />}
          onClick={AddLayer}
          variant="primary"
        >
          Add Layer
        </Button>
      </HStack>
      <VStack alignItems="flex-start" w="full">
        <HStack>
          <Box borderRadius="5px" bg="orange" p=".25em" />
          <Text fontSize="10pt">Top Layer</Text>
        </HStack>
        <HStack>
          <Box borderRadius="5px" bg="#08BDD4" p=".25em" />
          <Text fontSize="10pt">Bottom Layer</Text>
        </HStack>
      </VStack>
      <Flex w="full">
        <LayerList />
      </Flex>
    </VStack>
  );
};

export default Layers;
