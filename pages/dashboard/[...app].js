import { useRouter } from "next/router";
import {
  useColorModeValue,
  Flex,
  Text,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import { FaLink } from "@react-icons/all-files/fa/FaLink";
import { useUser } from "@/providers/UserProvider";
import { useReAuthenticate } from "@/hooks/useReAuthenticate";
import Meta from "@/components/Meta";
import Layout from "@/components/Layout";
import GetStarted from "@/components/GetStarted";
import Generator from "@/components/services/Generator";
import Website from "@/components/services/Website";
import Templates from "@/components/services/Website/Templates";
import SelectedWebsite from "@/components/services/Website/SelectedWebsite";
import Analytics from "@/components/services/Website/Analytics";
import ConnectWalletTag from "@/components/ConnectWalletTag";
import Partners from "@/components/Partners";
import Payments from "@/components/Payments";
import Team from "@/components/Team";
import Utilities from "@/components/services/Utilities";
import MetadataEditor from "@/components/services/Generator/MetadataEditor";
import ProfileModal from "@/components/ProfileModal";
import AreYouSureModal from "@/components/AreYouSureModal";
import Domain from "@/components/services/Website/Domain";
import { webColor } from "@/theme/index";

const Page = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const app = router.query.app || [];
  const currentApp = app[app.length === 2 ? 1 : 0]?.toLowerCase();
  useReAuthenticate();

  const bgColor = useColorModeValue(
    webColor.dashboardBg[0],
    webColor.dashboardBg[1],
  );
  const isRemoveStepper = useMediaQuery({ query: "(max-width: 1300px)" });
  const isCollapse = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <main style={{ background: bgColor, minHeight: "100vh" }}>
      <Meta title="Dashboard | NFT Host" />
      <Layout currentApp={currentApp}>
        {currentApp === "team" || currentApp === "partners" || isLoggedIn ? (
          <>
            <ProfileModal />
            <AreYouSureModal />
            <Flex
              justifyContent="space-between"
              h="4em"
              alignItems="center"
              mb="1em"
            >
              <Text fontWeight="bold">{currentApp?.toUpperCase()}</Text>
              <HStack spacing="2em">
                {app[0] === "website" && (
                  <SelectedWebsite isCollapse={isCollapse} />
                )}
                {!isRemoveStepper && (
                  <Text>DASHBOARD &gt; {app.join(" > ").toUpperCase()}</Text>
                )}
              </HStack>
            </Flex>
            {app?.length > 0 &&
              {
                getstarted: <GetStarted />,
                generator: <Generator />,
                metadata: <MetadataEditor />,
                utilities: <Utilities />,
                website: <Website />,
                templates: <Templates />,
                analytics: <Analytics />,
                domain: <Domain />,
                payments: <Payments />,
                partners: <Partners />,
                team: <Team />,
              }[currentApp]}
          </>
        ) : (
          <VStack flex="1">
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flex="1"
            >
              <FaLink fontSize="24pt" />
              <Flex flexDir="column" alignItems="center" mt=".5em">
                <Text fontWeight="bold" fontSize="10pt">
                  Connect
                </Text>
                <Text fontSize="10pt" variant="subtle">
                  Connect your wallet, to unlock dashboard.
                </Text>
              </Flex>
              <Box bg="rgb(112,62,221)" p=".25em" borderRadius="10px" mt="1em">
                <ConnectWalletTag borderColor="transparent" />
              </Box>
            </Flex>
          </VStack>
        )}
      </Layout>
    </main>
  );
};

export default Page;
