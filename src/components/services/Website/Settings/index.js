import { useState } from "react";
import {
  VStack,
  Button,
  Flex,
  HStack,
  Text,
  Divider,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Wrap,
  Link,
} from "@chakra-ui/react";
import { FaCircle } from "@react-icons/all-files/fa/FaCircle";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { useWebsite } from "@/providers/WebsiteProvider";
import Question from "@/components/Question";
import General from "./General";
import Domain from "./Domain";
import Advanced from "./Advanced";
import Design from "./Design";
import { websiteSettingsArr } from "@/utils/json";
import config from "@/config/index";

const Settings = () => {
  const { editingWebsite } = useWebsite();
  const [currentSettingsIdx, setCurrentSettingsIdx] = useState(0);

  return (
    <Flex flexDir="column" mt="1em" p="1em">
      <HStack alignItems="center" w="full">
        <Text fontSize="10pt">Website Settings</Text>
        <Divider flex="1" />
      </HStack>
      <HStack mt="1em" alignItems="center" spacing="1em">
        <Heading as="h2" fontSize="2em" fontWeight="500">
          {editingWebsite?.components?.title}
        </Heading>
        <Wrap spacing="1em" mt="1em" overflow="visible">
          <Question
            prompt={
              editingWebsite?.isPremium
                ? "This minting website is subscribed to the premium plan."
                : "This minting website is subscribed to the free plan called Hobby."
            }
          >
            <Tag alignItems="center" size="sm">
              <TagLeftIcon
                color={
                  editingWebsite?.isPremium ? "rgb(255,167,1)" : "gray.500"
                }
              >
                <FaCircle fontSize="16pt" />
              </TagLeftIcon>
              <TagLabel fontSize="10pt">
                {editingWebsite?.isPremium ? "Premium" : "Hobby"}
              </TagLabel>
            </Tag>
          </Question>
          <Question
            prompt={
              editingWebsite?.isPublished
                ? "This website is viewable to your minters."
                : "This website is NOT viewable to your minters. Go to Advanced tab to publish."
            }
          >
            <Tag alignItems="center" size="sm">
              <TagLeftIcon
                color={editingWebsite?.isPublished ? "green.500" : "gray.500"}
              >
                <FaCircle fontSize="16pt" />
              </TagLeftIcon>
              <TagLabel fontSize="10pt">
                {editingWebsite?.isPublished ? "Published" : "Not Published"}
              </TagLabel>
            </Tag>
          </Question>
        </Wrap>
      </HStack>
      <VStack mt="2em" spacing="1.5em" alignItems="flex-start">
        <HStack spacing="3em">
          <Flex flexDir="column">
            <Question prompt="Unique ID correlated to your minting website.">
              <Text fontSize="10pt" variant="subtle">
                ID
              </Text>
            </Question>
            <Text fontSize="9pt">{editingWebsite?._id}</Text>
          </Flex>
          <Flex flexDir="column">
            <Question prompt="Current design template of your website. Go to Templates tab to change.">
              <Text fontSize="10pt" variant="subtle">
                CURRENT TEMPLATE
              </Text>
            </Question>
            <Text fontSize="9pt">{editingWebsite?.components?.template}</Text>
          </Flex>
          <Flex flexDir="column">
            <Question prompt="The link of your minting website.">
              <Text fontSize="10pt" variant="subtle">
                SUBDOMAIN
              </Text>
            </Question>
            <HStack>
              <Text fontSize="9pt">
                http{process.env.NODE_ENV === "production" ? "s" : ""}://
                {editingWebsite?.route}.{config?.frontendUrl}
              </Text>
              <Link
                href={`http${
                  process.env.NODE_ENV === "production" ? "s" : ""
                }://${editingWebsite?.route}.${config?.frontendUrl}`}
                isExternal
              >
                <FaExternalLinkAlt />
              </Link>
            </HStack>
          </Flex>
        </HStack>
        {editingWebsite?.premiumEndDate && (
          <Flex flexDir="column">
            <Question prompt="The expiration date of your premium website subscription.">
              <Text fontSize="10pt" variant="subtle">
                Subscription Expiry Date
              </Text>
            </Question>
            <Text fontSize="9pt">
              {new Date(editingWebsite?.premiumEndDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Text>
          </Flex>
        )}
      </VStack>
      <Flex mt="3em" gap="2em">
        <VStack alignItems="flex-start" flex="1" maxW="255px" mt="1em">
          {websiteSettingsArr?.map((setting, idx) => (
            <Button
              key={idx}
              bg="transparent"
              w="full"
              justifyContent="flex-start"
              fontSize="10pt"
              onClick={() => setCurrentSettingsIdx(idx)}
              color={idx === currentSettingsIdx ? "rgb(52,140,212)" : "white"}
              pointerEvents={currentSettingsIdx === idx ? "none" : "all"}
            >
              {setting.name}
            </Button>
          ))}
        </VStack>
        <Flex flexDir="column" flex="1">
          <Text fontSize="16pt">
            {websiteSettingsArr[currentSettingsIdx]?.name}
          </Text>
          {
            {
              general: <General />,
              design: <Design />,
              domain: <Domain />,
              advanced: <Advanced />,
            }[websiteSettingsArr[currentSettingsIdx]?.name?.toLowerCase()]
          }
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Settings;
