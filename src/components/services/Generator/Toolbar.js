import NextLink from "next/link";
import {
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGenerator } from "@/providers/GeneratorProvider";
import { useGenerate } from "@/hooks/services/generator/useGenerate";
import { useToolbar } from "@/hooks/services/generator/useToolbar";
import { HiOutlineChevronDown } from "@react-icons/all-files/hi/HiOutlineChevronDown";
import { HiOutlineDesktopComputer } from "@react-icons/all-files/hi/HiOutlineDesktopComputer";
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import { FaDownload } from "@react-icons/all-files/fa/FaDownload";
import { useRarity } from "@/hooks/services/generator/useRarity";
import { webColor } from "@/theme/index";

const Toolbar = () => {
  const { isGenerated, setIsDownloadModal } = useGenerator();
  const { Generate } = useGenerate();
  const { OpenComputer, Save } = useToolbar();
  const { OpenRarityModal } = useRarity();

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  return (
    <HStack
      px=".75em"
      py=".5em"
      bg={containerColor}
      borderRadius="5px"
      justifyContent="space-between"
      border="1px solid rgb(117,63,229)"
    >
      <HStack>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<HiOutlineChevronDown />}
            size="sm"
          >
            Open
          </MenuButton>
          <MenuList>
            <Button
              leftIcon={<HiOutlineDesktopComputer />}
              w="full"
              justifyContent="flex-start"
              bg="transparent"
              cursor="pointer"
              borderRadius="0"
            >
              <input
                type="file"
                id="my-file"
                onClick={(e) => (e.target.value = null)}
                onChange={OpenComputer}
                hidden
                accept="application/JSON"
              />
              <label htmlFor="my-file" style={{ cursor: "pointer" }}>
                Computer
              </label>
            </Button>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<HiOutlineChevronDown />}
            size="sm"
          >
            Save
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<HiOutlineDesktopComputer />}
              onClick={() => Save()}
            >
              Computer
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
          size="sm"
          leftIcon={<FaPlay />}
          color="green.500"
          onClick={Generate}
        >
          Generate
        </Button>
        <NextLink href="/dashboard/generator/metadata" shallow passHref>
          <Button leftIcon={<MdSettings />} size="sm">
            Metadata
          </Button>
        </NextLink>
        <Button leftIcon={<MdSettings />} size="sm" onClick={OpenRarityModal}>
          Rarity
        </Button>
        {isGenerated && (
          <Button
            leftIcon={<FaDownload />}
            size="sm"
            onClick={() => setIsDownloadModal(true)}
            variant="primary"
          >
            Download
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default Toolbar;
