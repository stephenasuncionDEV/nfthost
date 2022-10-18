import {
  Text,
  Flex,
  Button,
  VStack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { VscJson } from "@react-icons/all-files/vsc/VscJson";
import { FaRedo } from "@react-icons/all-files/fa/FaRedo";
import { AiOutlineFile } from "@react-icons/all-files/ai/AiOutlineFile";
import { useGenerator } from "@/providers/GeneratorProvider";
import { useUtils } from "@/hooks/services/utils/useUtils";
import Dropzone from "react-dropzone";

const JsonDropbox = (styles) => {
  const { jsonFiles, setJsonFiles } = useGenerator();
  const { UploadJSON } = useUtils();

  const dropContainerColor = useColorModeValue(
    "rgba(0,0,0,0.1)",
    "rgba(0,0,0,0.5)",
  );

  return (
    <Box {...styles}>
      {!jsonFiles ? (
        <Dropzone
          accept={{
            "application/JSON": [],
          }}
          multiple
          onDrop={(files) => UploadJSON(files)}
        >
          {({ getRootProps, getInputProps }) => (
            <Flex
              w="full"
              h="200px"
              bg={dropContainerColor}
              borderRadius="10px"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              cursor="pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <VStack>
                <VscJson fontSize="18pt" />
                <Text fontSize="10pt">Drag and drop Metadata Folder Here</Text>
                <Text fontSize="9pt">Supported Format: .json</Text>
              </VStack>
            </Flex>
          )}
        </Dropzone>
      ) : (
        <VStack
          w="full"
          h="200px"
          bg={dropContainerColor}
          borderRadius="10px"
          justifyContent="center"
          alignItems="center"
        >
          <AiOutlineFile fontSize="18pt" />
          <Text fontSize="10pt">Files: {jsonFiles?.length} json files</Text>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<FaRedo />}
            onClick={() => setJsonFiles(null)}
          >
            Reset
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default JsonDropbox;
