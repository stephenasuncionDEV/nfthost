import { useEffect, useRef } from "react";
import NextLink from "next/link";
import {
  Wrap,
  Flex,
  useColorModeValue,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import { webColor } from "@/theme/index";
import { useWebsiteControls } from "@/hooks/services/website/useWebsiteControls";
import { useWebsite } from "@/providers/WebsiteProvider";

const Domain = () => {
  const { editingWebsite } = useWebsite();
  const { updateDomain, isUpdatingWebsite } = useWebsiteControls();
  const domainInput = useRef();

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  useEffect(() => {
    if (!editingWebsite) return;
    domainInput.current.value = editingWebsite.custom.domain;
  }, [editingWebsite]);

  return (
    <>
      {editingWebsite ? (
        <Wrap>
          <Flex
            bg={containerColor}
            border="1px solid rgb(117,63,229)"
            p="1em"
            flexDir="column"
          >
            <Text fontWeight="bold" fontSize="10pt">
              Domain
            </Text>
            <Text fontSize="10pt">
              Connect your custom domain to our website
            </Text>
            <HStack mt="1em">
              <Input
                id="domain"
                name="domain"
                type="text"
                ref={domainInput}
                placeholder="example.com"
              />
              <Button
                variant="primary"
                onClick={() => {
                  if (
                    domainInput.current.value === editingWebsite?.custom?.domain
                  )
                    return;
                  updateDomain(domainInput.current.value);
                }}
                loadingText="Saving"
                isLoading={isUpdatingWebsite}
                isDisabled={isUpdatingWebsite}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Wrap>
      ) : (
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          flex="1"
        >
          <Flex flexDir="column" alignItems="center" mt=".5em">
            <Text fontWeight="bold" fontSize="10pt">
              Error
            </Text>
            <Text fontSize="10pt" variant="subtle">
              Please create or select a website first.
            </Text>
          </Flex>
          <NextLink href={`/dashboard/website`} shallow passHref>
            <Button
              leftIcon={<AiOutlineArrowLeft />}
              color="white"
              variant="primary"
              mt="1.5em"
            >
              See Website List
            </Button>
          </NextLink>
        </Flex>
      )}
    </>
  );
};

export default Domain;
