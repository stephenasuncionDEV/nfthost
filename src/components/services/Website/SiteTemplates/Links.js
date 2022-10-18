import { HStack, IconButton, Link } from "@chakra-ui/react";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { SiTiktok } from "@react-icons/all-files/si/SiTiktok";
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaReddit } from "@react-icons/all-files/fa/FaReddit";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { GiSailboat } from "@react-icons/all-files/gi/GiSailboat";
import { useWebsite } from "@/providers/WebsiteProvider";

const Links = ({ sx, bx }) => {
  const { userWebsite } = useWebsite();

  return (
    <HStack spacing="1em" {...sx}>
      {userWebsite?.externalLinks?.twitter?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.twitter} isExternal>
          <IconButton size="sm" {...bx}>
            <FaTwitter />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.opensea?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.opensea} isExternal>
          <IconButton size="sm" {...bx}>
            <GiSailboat />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.discord?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.discord} isExternal>
          <IconButton size="sm" {...bx}>
            <FaDiscord />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.reddit?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.reddit} isExternal>
          <IconButton size="sm" {...bx}>
            <FaReddit />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.tiktok?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.tiktok} isExternal>
          <IconButton size="sm" {...bx}>
            <SiTiktok />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.youtube?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.youtube} isExternal>
          <IconButton size="sm" {...bx}>
            <FaYoutube />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.instagram?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.instagram} isExternal>
          <IconButton size="sm" {...bx}>
            <FaInstagram />
          </IconButton>
        </Link>
      )}
      {userWebsite?.externalLinks?.facebook?.length > 0 && (
        <Link href={userWebsite?.externalLinks?.facebook} isExternal>
          <IconButton size="sm" {...bx}>
            <FaFacebook />
          </IconButton>
        </Link>
      )}
    </HStack>
  );
};

export default Links;
