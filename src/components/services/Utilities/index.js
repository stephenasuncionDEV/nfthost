import {
  Flex,
  Button,
  VStack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useGenerator } from "@/providers/GeneratorProvider";
import { utilsMenuArr } from "@/utils/json";
import ImageStorage from "./ImageStorage";
import AddKey from "./AddKey";
import RemoveKey from "./RemoveKey";
import { webColor } from "@/theme/index";

const Utilities = () => {
  const { utilsTab, setUtilsTab, setJsonFiles } = useGenerator();

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  return (
    <HStack alignItems="flex-start">
      <VStack p="1em">
        {utilsMenuArr?.map((menu, idx) => (
          <Flex key={idx} w="300px">
            <Button
              bg="transparent"
              leftIcon={menu.icon}
              justifyContent="flex-start"
              _hover={{ bg: "whiteAlpha.100" }}
              w="full"
              color={utilsTab === menu.key ? "#348CD4" : "white"}
              onClick={() => {
                setJsonFiles(null);
                setUtilsTab(menu.key);
              }}
              fontSize="10pt"
            >
              {menu.title}
            </Button>
          </Flex>
        ))}
      </VStack>
      <Flex
        flexDir="column"
        id="metadata"
        spacing="1.5em"
        p="1em"
        bg={containerColor}
        borderRadius=".25em"
        boxShadow="0 0 2px 0 rgb(0 0 0 / 10%)"
        alignItems="flex-start"
        w="full"
        maxW="850px"
        border="1px solid rgb(117,63,229)"
      >
        {
          {
            image: <ImageStorage />,
            add: <AddKey />,
            remove: <RemoveKey />,
          }[utilsTab]
        }
      </Flex>
    </HStack>
  );
};

export default Utilities;
