import {
  Text,
  HStack,
  Button,
  Flex,
  IconButton,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { useCore } from "@/providers/CoreProvider";
import { useCookie } from "@/hooks/useCookie";
import { webColor } from "@/theme/index";

const CookieModal = () => {
  const { isCookieModal, setIsCookieModal } = useCore();
  const { Accept } = useCookie();

  const borderColor = useColorModeValue(
    webColor.borderColor[0],
    webColor.borderColor[1],
  );

  return (
    isCookieModal && (
      <Flex
        position="fixed"
        bottom="3em"
        right="3em"
        h="220px"
        bg="#000616"
        w="400px"
        p="2em"
        borderRadius="10px"
        flexDir="column"
        justifyContent="center"
        boxShadow="0px 0px 50px -11px rgba(0,0,0,0.3)"
        zIndex="1337"
        border={`1px solid ${borderColor}`}
      >
        <HStack justifyContent="space-between">
          <Text variant="content_subtitle">Cookies &#38; Privacy</Text>
          <IconButton
            onClick={() => setIsCookieModal(false)}
            variant="transparent"
          >
            <IoMdClose />
          </IconButton>
        </HStack>
        <Text mt="1.5em" fontSize="10pt">
          This website uses cookies to ensure you
        </Text>
        <Text fontSize="10pt">get the best experience on our website.</Text>
        <Flex w="full" justifyContent="flex-end" alignItems="flex-end" mt="2em">
          <Link href="/about/privacy-policy#cookies" isExternal>
            <Text variant="link" fontSize="10pt">
              More Information
            </Text>
          </Link>
          <Button ml="1em" onClick={Accept} variant="outline" size="sm">
            Accept
          </Button>
        </Flex>
      </Flex>
    )
  );
};

export default CookieModal;
