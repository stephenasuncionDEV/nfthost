import NextLink from "next/link";
import {
  Flex,
  HStack,
  Button,
  IconButton,
  useColorMode,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Image,
  Heading,
  Link,
  MenuGroup,
} from "@chakra-ui/react";
import { SiTiktok } from "@react-icons/all-files/si/SiTiktok";
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { SunIcon, MoonIcon } from "@chakra-ui/icons/";
import { MdPeople } from "@react-icons/all-files/md/MdPeople";
import { MdFeaturedPlayList } from "@react-icons/all-files/md/MdFeaturedPlayList";
import { GiPriceTag } from "@react-icons/all-files/gi/GiPriceTag";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";

import { useMediaQuery } from "react-responsive";

const Navbar = ({ isLanding, isColorMode, isSocial }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navbarButton = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const defaultColor = useColorModeValue("black", "white");
  const isCollapse = useMediaQuery({ query: "(max-width: 840px)" });

  return (
    <Flex as="nav" justifyContent="space-between" px="2em" py="1.5em">
      <NextLink href="/" shallow passHref>
        <HStack spacing=".5em" cursor="pointer" flex="1">
          <Image src="/assets/logo.png" alt="NFT Host Logo" w="50px" />
          <Heading as="h1" fontWeight="bold" fontFamily="inter" fontSize="20pt">
            NFT Host
          </Heading>
        </HStack>
      </NextLink>
      {!isCollapse ? (
        <>
          {isLanding && (
            <HStack>
              <NextLink href="/#features" shallow passHref>
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                >
                  Features
                </Button>
              </NextLink>
              <NextLink href="/#testimonials" shallow passHref>
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                >
                  Testimonials
                </Button>
              </NextLink>
              <NextLink href="/#pricing" shallow passHref>
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                >
                  Pricing
                </Button>
              </NextLink>
            </HStack>
          )}
          {isSocial && (
            <HStack flex="1" justifyContent="flex-end">
              <Link
                href="https://discord.gg/2BDzCvSTVc"
                isExternal
                style={{ color: defaultColor }}
              >
                <IconButton
                  aria-label="NFT Host Discord"
                  icon={<FaDiscord />}
                  borderRadius="50%"
                  size="sm"
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                />
              </Link>
              <Link
                href="https://github.com/stephenasuncionDEV/nfthost"
                isExternal
                style={{ color: defaultColor }}
              >
                <IconButton
                  aria-label="NFT Host Github"
                  icon={<FaGithub />}
                  borderRadius="50%"
                  size="sm"
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                />
              </Link>
              <Link
                href="https://www.tiktok.com/@nfthostofficial"
                isExternal
                style={{ color: defaultColor }}
              >
                <IconButton
                  aria-label="NFT Host Tiktok"
                  icon={<SiTiktok />}
                  borderRadius="50%"
                  size="sm"
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                />
              </Link>
              {isColorMode && (
                <IconButton
                  ml=".5em"
                  aria-label="Toggle Color Mode"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  bg="transparent"
                  _hover={{ bg: "transparent", color: navbarButton }}
                  onClick={toggleColorMode}
                />
              )}
            </HStack>
          )}
        </>
      ) : (
        <Menu>
          <MenuButton _hover={{ bg: "transparent", color: navbarButton }}>
            <IconButton
              aria-label="NFT Host Menu"
              icon={<GiHamburgerMenu />}
              borderRadius="50%"
              size="sm"
              bg="transparent"
            />
          </MenuButton>
          <MenuList>
            {isLanding && (
              <MenuGroup title="Landing">
                <NextLink href="/#features" shallow passHref>
                  <MenuItem icon={<MdFeaturedPlayList />}>Features</MenuItem>
                </NextLink>
                <NextLink href="/#testimonials" shallow passHref>
                  <MenuItem icon={<MdPeople />}>Testimonials</MenuItem>
                </NextLink>
                <NextLink href="/#pricing" shallow passHref>
                  <MenuItem icon={<GiPriceTag />}>Pricing</MenuItem>
                </NextLink>
              </MenuGroup>
            )}
            {isSocial && (
              <MenuGroup title="Social">
                <Link
                  href="https://discord.gg/2BDzCvSTVc"
                  isExternal
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem icon={<FaDiscord />}>Discord</MenuItem>
                </Link>
                <Link
                  href="https://github.com/stephenasuncionDEV/nfthost"
                  isExternal
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem icon={<FaGithub />}>Github</MenuItem>
                </Link>
                <Link
                  href="https://www.tiktok.com/@nfthostofficial"
                  isExternal
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem icon={<SiTiktok />}>Tiktok</MenuItem>
                </Link>
              </MenuGroup>
            )}
            {isColorMode && (
              <>
                <MenuDivider />
                <MenuItem
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default Navbar;
