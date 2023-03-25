import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Text,
  VStack,
  Image,
  HStack,
  useColorMode,
  Center,
  Spinner,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useWebsite } from "@/providers/WebsiteProvider";
import { useWebsiteControls } from "@/hooks/services/website/useWebsiteControls";
import { usePaymentControls } from "@/hooks/usePaymentControls";
import Template1 from "@/components/services/Website/SiteTemplates/Template1";
import Template2 from "@/components/services/Website/SiteTemplates/Template2";
import Template3 from "@/components/services/Website/SiteTemplates/Template3";
import Template4 from "@/components/services/Website/SiteTemplates/Template4";
import Template5 from "@/components/services/Website/SiteTemplates/Template5";
import Template6 from "@/components/services/Website/SiteTemplates/Template6";
import Template7 from "@/components/services/Website/SiteTemplates/Template7";
import Template8 from "@/components/services/Website/SiteTemplates/Template8";
import Template9 from "@/components/services/Website/SiteTemplates/Template9";
import Template10 from "@/components/services/Website/SiteTemplates/Template10";
import Template11 from "@/components/services/Website/SiteTemplates/Template11";
import errorHandler from "@/utils/errorHandler";
import config from "@/config/index";
import parse from "html-react-parser";
import axios from "axios";
import posthog from "posthog-js";

const UserWebsite = (props) => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const router = useRouter();
  const { userWebsite, setUserWebsite } = useWebsite();
  const { userWebsiteErrors, checkSubscription, setUserWebsiteErrors } =
    useWebsiteControls();

  useEffect(() => {
    if (!props) return;

    const renderWebsite = async () => {
      try {
        let newUserWebsiteErrors = [];

        if (!Object.keys(props).length)
          newUserWebsiteErrors.push(`Minting Website was not found`);
        else {
          const {
            isExpired,
            isPublished,
            components: { title },
          } = props;

          if (isExpired)
            newUserWebsiteErrors.push(
              `Error: '${title}' Minting Website has Expired. Go to website settings -> General -> Renew`,
            );
          if (!isPublished)
            newUserWebsiteErrors.push(
              `Error: '${title}' Minting Website is not Published yet. Go to website settings -> Advanced -> Publish`,
            );
        }

        if (newUserWebsiteErrors.length > 0) {
          setUserWebsiteErrors(newUserWebsiteErrors);
          throw new Error(
            "If you are the owner of this minting website, please check your site settings",
          );
        }

        setUserWebsite(props);
      } catch (err) {
        const msg = errorHandler(err);
        toast({ description: msg });
      }
    };

    renderWebsite();
  }, []);

  useEffect(() => {
    if (!userWebsite) return;
    checkSubscription();

    console.log("Website ID:", userWebsite._id);

    posthog.capture("User visited minting website", {
      route: userWebsite.route,
      referrer: document.referrer,
    });
  }, [userWebsite]);

  const { colorMode } = useColorMode();

  if (router.isFallback) {
    return (
      <Center style={{ minHeight: "100vh" }}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="rgb(117,63,229)"
          size="lg"
        />
      </Center>
    );
  }

  return (
    <>
      {userWebsite ? (
        <div>
          <Head>
            <title>{userWebsite?.components?.title}</title>
            <link
              rel="shortcut icon"
              type="image/png"
              href={userWebsite?.meta?.favicon}
            />
            <meta name="title" content={userWebsite?.components?.title} />
            <meta
              name="description"
              content={userWebsite?.components?.description}
            />
            <meta
              name="keywords"
              content={`nfthost, ${userWebsite?.components?.title}`}
            />
            <meta name="robots" content={userWebsite?.meta?.robot} />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content={userWebsite?.meta?.language} />

            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://${userWebsite?.route}.${config.frontendUrl}`}
            />
            <meta property="og:title" content="NFT Host" />
            <meta
              property="og:description"
              content={userWebsite?.components?.description}
            />
            <meta
              property="og:image"
              content={userWebsite?.components?.unrevealedImage}
            />

            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:url"
              content={`https://${userWebsite?.route}.${config.frontendUrl}`}
            />
            <meta
              property="twitter:title"
              content={userWebsite?.components?.title}
            />
            <meta
              property="twitter:description"
              content={userWebsite?.components?.description}
            />
            <meta
              property="twitter:image"
              content={userWebsite?.components?.unrevealedImage}
            />

            {userWebsite?.components?.script &&
              parse(userWebsite?.components?.script)}
          </Head>
          <main>
            {
              {
                Template1: <Template1 />,
                Template2: <Template2 />,
                Template3: <Template3 />,
                Template4: <Template4 />,
                Template5: <Template5 />,
                Template6: <Template6 />,
                Template7: <Template7 />,
                Template8: <Template8 />,
                Template9: <Template9 />,
                Template10: <Template10 />,
                Template11: <Template11 />,
              }[userWebsite?.components?.template]
            }
          </main>
        </div>
      ) : (
        <Center style={{ minHeight: "100vh" }}>
          {userWebsiteErrors?.length > 0 ? (
            <VStack spacing="1em">
              <NextLink href="/" shallow passHref>
                <HStack spacing=".5em" cursor="pointer" flex="1">
                  <Image src="/assets/logo.png" alt="NFT Host Logo" w="50px" />
                  <Heading
                    as="h1"
                    fontWeight="bold"
                    fontFamily="inter"
                    fontSize="20pt"
                  >
                    NFT Host
                  </Heading>
                </HStack>
              </NextLink>
              <VStack>
                {userWebsiteErrors?.map((err, idx) => (
                  <Text key={idx} fontSize="10pt">
                    {err}
                  </Text>
                ))}
              </VStack>
            </VStack>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="rgb(117,63,229)"
              size="lg"
            />
          )}
        </Center>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const mappedSubdomains = await fetch(
    `${config.serverUrl}/api/website/getMappedSubdomains`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.CREATE_WEBSITE_TOKEN}`,
      },
    },
  );

  return {
    paths: await mappedSubdomains.json(),
    fallback: true,
  };
}

export async function getStaticProps({ params: { siteRoute } }) {
  const site = await fetch(
    `${config.serverUrl}/api/website/getWebsiteByRoute?route=${siteRoute}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.CREATE_WEBSITE_TOKEN}`,
      },
    },
  );

  return {
    props: await site.json(),
    revalidate: 30,
  };
}

export default UserWebsite;
