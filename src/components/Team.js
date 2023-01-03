import {
  Text,
  Flex,
  VStack,
  useColorModeValue,
  Wrap,
  Link,
  Avatar,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { teamArr } from "@/utils/json";
import { webColor } from "@/theme/index";
import posthog from "posthog-js";

const Team = () => {
  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  const borderColor = useColorModeValue(
    webColor.borderColor[0],
    webColor.borderColor[1],
  );

  return (
    <Wrap spacing="2em">
      {teamArr?.map((member, idx) => (
        <Wrap
          spacing="2em"
          maxW="340px"
          p="1em"
          bg={containerColor}
          borderRadius=".25em"
          alignItems="flex-start"
          key={idx}
          border={`1px solid ${borderColor}`}
        >
          <VStack>
            <Avatar
              src="/assets/team/stephen.png"
              name="Stephen Asuncion"
              size="lg"
            />
          </VStack>
          <VStack alignItems="flex-start" flex="1">
            <Flex flexDir="column">
              <Text>{member.name}</Text>
              <Text fontSize="8pt">{member.position}</Text>
              <HStack spacing="1em" mt="2em">
                {member.socials.twitter && (
                  <Link isExternal href={member.socials.twitter}>
                    <IconButton
                      icon={<FaTwitter />}
                      size="sm"
                      onClick={() =>
                        posthog?.capture("User visited team twitter", {
                          name: member.name,
                        })
                      }
                    />
                  </Link>
                )}
                {member.socials.linkedin && (
                  <Link isExternal href={member.socials.linkedin}>
                    <IconButton
                      icon={<FaLinkedin />}
                      size="sm"
                      onClick={() =>
                        posthog?.capture("User visited team linkedin", {
                          name: member.name,
                        })
                      }
                    />
                  </Link>
                )}
                {member.socials.youtube && (
                  <Link isExternal href={member.socials.youtube}>
                    <IconButton
                      icon={<FaYoutube />}
                      size="sm"
                      onClick={() =>
                        posthog?.capture("User visited team youtube", {
                          name: member.name,
                        })
                      }
                    />
                  </Link>
                )}
                {member.socials.facebook && (
                  <Link isExternal href={member.socials.facebook}>
                    <IconButton
                      icon={<FaFacebook />}
                      size="sm"
                      onClick={() =>
                        posthog?.capture("User visited team facebook", {
                          name: member.name,
                        })
                      }
                    />
                  </Link>
                )}
                {member.socials.instagram && (
                  <Link isExternal href={member.socials.instagram}>
                    <IconButton
                      icon={<FaInstagram />}
                      size="sm"
                      onClick={() =>
                        posthog?.capture("User visited team instagram", {
                          name: member.name,
                        })
                      }
                    />
                  </Link>
                )}
              </HStack>
            </Flex>
            <Text fontSize="10pt"></Text>
          </VStack>
        </Wrap>
      ))}
    </Wrap>
  );
};

export default Team;
