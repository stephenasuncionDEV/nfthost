import NextLink from "next/link";
import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Heading,
  IconButton,
  Button,
  useColorMode,
  Flex,
  Link,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
// import { BiSun } from "@react-icons/all-files/bi/BiSun";
// import { BiMoon } from "@react-icons/all-files/bi/BiMoon";
import { useCore } from "@/providers/CoreProvider";
import ConnectWalletTag from "./ConnectWalletTag";
import { sidebarArr } from "@/utils/json";
import { webColor } from "@/theme/index";
import { useEffect, useState } from "react";

const Layout = ({ children, currentApp }) => {
  const { isSidebar, setIsSidebar } = useCore();
  const [deviceIsMobile, setDeviceIsMobile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDeviceIsMobile(true);
    } else {
      setDeviceIsMobile(false);
    }
  }, []);

  const sidebarBG = useColorModeValue(
    webColor.sidebarBg[0],
    webColor.sidebarBg[1],
  );
  const sidebarColor = useColorModeValue("#60677d", "#9097a7");
  const toolbarBG = useColorModeValue(
    webColor.toolbarBg[0],
    webColor.toolbarBg[1],
  );
  const defaultColor = useColorModeValue("rgba(0,0,0,0.7)", "white");

  return (
    <>
      <HStack
        position="fixed"
        top="0"
        w="full"
        bg={toolbarBG}
        h="70px"
        px="2em"
        justifyContent="space-between"
        zIndex="1337 !important"
        boxShadow="sm"
      >
        <HStack spacing="2em">
          <Link
            href="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack spacing=".5em" cursor="pointer" flex="1">
              <Image src="/assets/logo.png" alt="NFT Host Logo" w="50px" />
              <Heading
                as="h1"
                fontWeight="bold"
                fontFamily="inter"
                fontSize="16pt"
              >
                NFT Host
              </Heading>
            </HStack>
          </Link>
          <IconButton
            bg="transparent"
            color={defaultColor}
            fontSize="16pt"
            _hover={{ bg: "transparent", color: defaultColor }}
            onClick={() => { deviceIsMobile === false ? setIsSidebar(!isSidebar) : onOpen() }}
          >
            <GiHamburgerMenu />
          </IconButton>
        </HStack>
        <HStack spacing="2em">
          {/* <IconButton
            aria-label='Toggle Color Mode'
            bg='transparent'
            color={defaultColor}
            _hover={{ bg: 'transparent', color: defaultColor }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <BiMoon /> : <BiSun />}
          </IconButton> */}
          <ConnectWalletTag isUserProfile isPayments isCopyAddress />
        </HStack>
      </HStack >
      {isSidebar && deviceIsMobile === false && (
        <VStack
          position="fixed"
          top="0"
          flexDir="column"
          bg={sidebarBG}
          w="245px"
          h="full"
          p="1.5em"
          alignItems="flex-start"
          mt="70px"
          boxShadow="sm"
          spacing="1em"
          color={sidebarColor}
          zIndex="1337 !important"
        >
          {sidebarArr?.map((item, idx) => (
            <VStack key={idx} alignItems="flex-start" w="full">
              <Text fontSize="10pt" color={"#D4D4D4"}>{item.parent.toUpperCase()}</Text>
              <VStack spacing=".25em" w="full" >
                {item.items.map((nav, idx) => (
                  <Box key={idx} w="full" >
                    {!nav.isExternal ? (
                      <NextLink href={`/dashboard${nav.link}`} shallow passHref>
                        <Button
                          borderRadius="0"
                          leftIcon={nav.icon}
                          w="full"
                          justifyContent="flex-start"
                          bg="transparent"
                          _hover={{
                            bg: "transparent",
                            color: "rgb(52,140,212)",
                          }}
                          _focus={{ bg: "transparent" }}
                          color={
                            currentApp ===
                              nav.name.replace(" ", "").toLowerCase()
                              ? "rgb(52,140,212)"
                              : null
                          }
                        >
                          {nav.name}
                        </Button>
                      </NextLink>
                    ) : (
                      <Link
                        href={nav.link}
                        isExternal
                        style={{ textDecoration: "none" }}
                        color="inherit"
                      >
                        <Button
                          borderRadius="0"
                          leftIcon={nav.icon}
                          w="full"
                          justifyContent="flex-start"
                          bg="transparent"
                          _hover={{
                            bg: "transparent",
                            color: "rgb(52,140,212)",
                          }}
                          _focus={{ bg: "transparent" }}
                          color={
                            currentApp ===
                              nav.name.replace(" ", "").toLowerCase()
                              ? "rgb(52,140,212)"
                              : null
                          }
                        >
                          {nav.name}
                        </Button>
                      </Link>
                    )}
                    <VStack spacing="0" pl="1.4em"  >
                      {nav.children.map((children, idx) => (
                        <NextLink
                          href={`/dashboard${children.link}`}
                          shallow
                          passHref
                          key={idx}
                          style={{ width: '100%', borderLeft: 'solid 2px #2D2F39', position: 'relative' }}
                        >
                          <Button
                            borderRadius="0"
                            w="full"
                            justifyContent="flex-start"
                            bg="transparent"
                            fontSize="10pt"
                            _hover={{
                              bg: "transparent",
                              color: "rgb(52,140,212)",
                            }}
                            _focus={{ bg: "transparent" }}
                            color={
                              currentApp === children.name.toLowerCase()
                                ? "rgb(52,140,212)"
                                : null
                            }
                          >
                            <div style={{ position: 'absolute', left: '-2px', transform: 'translate(0px, -2px)' }}>
                              <svg width="13" height="8" viewBox="0 0 13 8" fill="#2D2F39" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 6C4.68629 6 2 3.31371 2 0H0C0 4.41828 3.58172 8 8 8H13V6H8Z" fill="#2D2F39" />
                              </svg>
                            </div>
                            <span style={{ paddingLeft: '2px' }}>{children.name}</span>
                          </Button>
                        </NextLink>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
      )}
      {deviceIsMobile &&
        <>
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size="full"
          >
            <DrawerOverlay />
            <DrawerContent
              bg={sidebarBG}
            >
              <DrawerCloseButton />
              <DrawerBody>
                {sidebarArr?.map((item, idx) => (
                  <VStack key={idx} alignItems="flex-start" w="full">
                    <Text fontSize="10pt" color={"#D4D4D4"}>{item.parent.toUpperCase()}</Text>
                    <VStack spacing=".25em" w="full" >
                      {item.items.map((nav, idx) => (
                        <Box key={idx} w="full" >
                          {!nav.isExternal ? (
                            <NextLink href={`/dashboard${nav.link}`} shallow passHref>
                              <Button
                                borderRadius="0"
                                leftIcon={nav.icon}
                                w="full"
                                justifyContent="flex-start"
                                bg="transparent"
                                _hover={{
                                  bg: "transparent",
                                  color: "rgb(52,140,212)",
                                }}
                                _focus={{ bg: "transparent" }}
                                color={
                                  currentApp ===
                                    nav.name.replace(" ", "").toLowerCase()
                                    ? "rgb(52,140,212)"
                                    : null
                                }
                              >
                                {nav.name}
                              </Button>
                            </NextLink>
                          ) : (
                            <Link
                              href={nav.link}
                              isExternal
                              style={{ textDecoration: "none" }}
                              color="inherit"
                            >
                              <Button
                                borderRadius="0"
                                leftIcon={nav.icon}
                                w="full"
                                justifyContent="flex-start"
                                bg="transparent"
                                _hover={{
                                  bg: "transparent",
                                  color: "rgb(52,140,212)",
                                }}
                                _focus={{ bg: "transparent" }}
                                color={
                                  currentApp ===
                                    nav.name.replace(" ", "").toLowerCase()
                                    ? "rgb(52,140,212)"
                                    : null
                                }
                              >
                                {nav.name}
                              </Button>
                            </Link>
                          )}
                          <VStack spacing="0" pl="1.4em"  >
                            {nav.children.map((children, idx) => (
                              <NextLink
                                href={`/dashboard${children.link}`}
                                shallow
                                passHref
                                key={idx}
                                style={{ width: '100%', borderLeft: 'solid 2px #2D2F39', position: 'relative' }}
                              >
                                <Button
                                  borderRadius="0"
                                  w="full"
                                  justifyContent="flex-start"
                                  bg="transparent"
                                  fontSize="10pt"
                                  _hover={{
                                    bg: "transparent",
                                    color: "rgb(52,140,212)",
                                  }}
                                  _focus={{ bg: "transparent" }}
                                  color={
                                    currentApp === children.name.toLowerCase()
                                      ? "rgb(52,140,212)"
                                      : null
                                  }
                                >
                                  <div style={{ position: 'absolute', left: '-2px', transform: 'translate(0px, -2px)' }}>
                                    <svg width="13" height="8" viewBox="0 0 13 8" fill="#2D2F39" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 6C4.68629 6 2 3.31371 2 0H0C0 4.41828 3.58172 8 8 8H13V6H8Z" fill="#2D2F39" />
                                    </svg>
                                  </div>
                                  <span style={{ paddingLeft: '2px' }}>{children.name}</span>
                                </Button>
                              </NextLink>
                            ))}
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                ))}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      }
      <Flex
        flexDir="column"
        pt="80px"
        pb="102px"
        ml={(isSidebar && deviceIsMobile === false) ? "245px" : "0"}
        px="2rem"
        minH="100vh"
      >
        {children}
      </Flex>
    </>
  );
};

export default Layout;
