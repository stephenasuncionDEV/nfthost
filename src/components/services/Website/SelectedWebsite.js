import {
  useColorModeValue,
  Flex,
  Text,
  HStack,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { HiOutlineChevronDown } from "@react-icons/all-files/hi/HiOutlineChevronDown";
import { useWebsite } from "@/providers/WebsiteProvider";
import { useWebsiteControls } from "@/hooks/services/website/useWebsiteControls";
import { useCopy } from "@/hooks/useCopy";
import { webColor } from "@/theme/index";
import config from "@/config/index";

const SelectedWebsite = ({ isCollapse }) => {
  const { websites, editingWebsite } = useWebsite();
  const { editWebsite } = useWebsiteControls();
  const { onCopy: onCopyWebsiteLink } = useCopy({
    text: `${editingWebsite?.route}.${config?.frontendUrl}`,
  });

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  return (
    <>
      {editingWebsite && (
        <>
          {!isCollapse ? (
            <Flex flexDir="column" alignItems="flex-end">
              <Menu>
                <HStack
                  bg={containerColor}
                  borderRadius=".25em"
                  boxShadow="0 0 2px 0 rgb(0 0 0 / 10%)"
                  py=".5em"
                  px="1em"
                  alignItems="center"
                  spacing="1em"
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<HiOutlineChevronDown />}
                    bg="transparent"
                    size="sm"
                    px=".5em"
                  >
                    <Text fontSize="10pt">
                      Selected Website:{" "}
                      <span style={{ color: "rgb(52,140,212)" }}>
                        {editingWebsite?.components?.title}
                      </span>
                    </Text>
                  </MenuButton>
                  <HStack>
                    <Input
                      readOnly
                      value={`${editingWebsite?.route}.${config?.frontendUrl}`}
                      textAlign="center"
                      cursor="pointer"
                      _hover={{ opacity: ".5" }}
                      onClick={onCopyWebsiteLink}
                      size="sm"
                    />
                    <Link
                      href={`https://${editingWebsite?.route}.${config?.frontendUrl}`}
                      isExternal
                    >
                      <IconButton size="sm">
                        <FaExternalLinkAlt />
                      </IconButton>
                    </Link>
                  </HStack>
                </HStack>
                <MenuList>
                  {websites?.map((website, idx) => (
                    <MenuItem
                      size="sm"
                      key={idx}
                      justifyContent="flex-start"
                      onClick={() => editWebsite(website)}
                      pointerEvents={
                        editingWebsite?._id === website._id ? "none" : "all"
                      }
                    >
                      <HStack justifyContent="flex-start">
                        <Avatar
                          src={website.components.unrevealedImage}
                          name={`${website.components.title}'s Logo`}
                          size="sm"
                          bg="transparent"
                        />
                        <Text fontSize="10pt">{website.components.title}</Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiOutlineChevronDown />}
                size="sm"
              />
              <MenuList>
                <MenuItem size="sm">
                  <Text fontSize="10pt">
                    Selected Website:{" "}
                    <span style={{ color: "rgb(52,140,212)" }}>
                      {editingWebsite?.components?.title}
                    </span>
                  </Text>
                </MenuItem>
                {websites?.map((website, idx) => (
                  <MenuItem
                    size="sm"
                    key={idx}
                    justifyContent="flex-start"
                    onClick={() => EditWebsite(website)}
                  >
                    <HStack justifyContent="flex-start">
                      <Avatar
                        src={website.components.unrevealedImage}
                        name={`${website.components.title}'s Logo`}
                        size="sm"
                        bg="transparent"
                      />
                      <Text fontSize="10pt">{website.components.title}</Text>
                    </HStack>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </>
      )}
    </>
  );
};

export default SelectedWebsite;
