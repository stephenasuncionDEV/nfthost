import { useState, useEffect } from "react";
import {
  VStack,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useWebsite } from "@/providers/WebsiteProvider";
import { useWebsiteControls } from "@/hooks/services/website/useWebsiteControls";
import DynamicInput from "@/components/DynamicInput";
import { webColor } from "@/theme/index";
import config from "@/config/index";

const Domain = () => {
  const { editingWebsite } = useWebsite();
  const { updateRoute, isUpdatingWebsite, editInputState } =
    useWebsiteControls();
  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );
  const [route, setRoute] = useState("");

  useEffect(() => {
    if (!editingWebsite) return;
    setRoute(editingWebsite.route);
  }, [editingWebsite]);

  return (
    <VStack mt="1em" flex="1" alignItems="flex-start" spacing="2em">
      <Flex
        flexDir="column"
        bg={containerColor}
        p="1em"
        borderRadius=".25em"
        maxW="865px"
        w="full"
        border="1px solid rgb(117,63,229)"
        opacity={editingWebsite?.isExpired ? ".2" : "1"}
        pointerEvents={editingWebsite?.isExpired ? "none" : "all"}
      >
        <Flex flexDir="column">
          <VStack spacing=".25em" alignItems="flex-start">
            <Text>Subdomain</Text>
            <Text fontSize="10pt" variant="subtle">
              Where your NFT minters can navigate to mint your NFTs.
            </Text>
          </VStack>
          <DynamicInput
            id="subdomain"
            name="subdomain"
            type="text"
            placeholder="Subdomain"
            value={route}
            onChange={setRoute}
            mt="1em"
            maxW="380px"
            addonRight
            addonRightText={`.${config?.frontendUrl}`}
            isInvalid={editInputState?.route?.status}
            errorText={editInputState?.route?.message}
            textTransform="lowercase"
          />
        </Flex>
        <Flex justifyContent="flex-end" mt="1em">
          <Button
            variant="primary"
            onClick={() => updateRoute(route)}
            disabled={
              editingWebsite?.isExpired ||
              isUpdatingWebsite ||
              !route.length ||
              route === editingWebsite.route
            }
            isLoading={isUpdatingWebsite}
            loadingText="Saving"
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default Domain;
