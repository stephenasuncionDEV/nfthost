import NextLink from "next/link";
import NextImage from "next/image";
import {
  Text,
  Flex,
  Button,
  SlideFade,
  Link,
  useColorModeValue,
  Wrap,
  Image,
  Heading,
} from "@chakra-ui/react";
import MainNavbar from "@/components/MainNavbar";
import Announcement from "@/components/Announcement";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import { partnersArr } from "@/utils/json";
import { useMediaQuery } from "react-responsive";
import posthog from "posthog-js";

const Landing = () => {
  const sponsorColor = useColorModeValue("blackAlpha.600", "whiteAlpha.300");
  const isHideOverflow = useMediaQuery({ query: "(max-width: 1208px)" });
  const isCollapse = useMediaQuery({ query: "(max-width: 840px)" });
  const isResizeHeader = useMediaQuery({ query: "(max-width: 400px)" });

  return (
    <>
      <Flex
        flexDir="column"
        minH="90vh"
        bg="url(/assets/landing-bg-1.png) no-repeat center"
        bgSize="cover"
      >
        <MainNavbar isLanding isSocial />
        <Announcement />
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          flex="1"
        >
          <Flex maxW="1355px" w="full" justifyContent="space-between" p="2em">
            <Flex
              flexDir="column"
              maxW={!isCollapse ? "580px" : "inherit"}
              alignItems="flex-start"
              flex="1"
            >
              <Heading as="h1" fontSize={!isResizeHeader ? "42pt" : "32pt"}>
                Generate and Host NFT Collections
              </Heading>
              <Text mt="1em">
                Create and Host your NFT Collection in under a minute!
              </Text>
              <NextLink href="/dashboard/getStarted" shallow passHref>
                <Button mt="1em" size="lg">
                  Get Started 🚀
                </Button>
              </NextLink>
            </Flex>
            {!isCollapse && (
              <Flex
                flexDir="column"
                position="relative"
                flex="1"
                overflow={isHideOverflow ? "hidden" : "visible"}
              >
                <Image
                  position="absolute"
                  className="upDownAnimation"
                  src="/assets/landing-effect-1.png"
                  alt="Landing Animation - Ball"
                  w="35px"
                  left="5%"
                  loading="lazy"
                />
                <Image
                  position="absolute"
                  className="upDownAnimation"
                  src="/assets/landing-effect-3.png"
                  alt="Landing Animation - NFT"
                  left="20%"
                  loading="lazy"
                />
                <Image
                  position="absolute"
                  className="upDownAnimation"
                  src="/assets/landing-effect-2.png"
                  alt="Landing Animation - NFT"
                  left="50%"
                  loading="lazy"
                />
                <Image
                  position="absolute"
                  className="upDownAnimation"
                  src="/assets/landing-effect-1.png"
                  alt="Landing Animation - Ball"
                  w="35px"
                  left="80%"
                  loading="lazy"
                />
                <Image
                  position="absolute"
                  className="upDownAnimation3"
                  src="/assets/landing-effect-1.png"
                  alt="Landing Animation - Ball"
                  w="35px"
                  left="60%"
                  loading="lazy"
                />
                <Image
                  position="absolute"
                  className="upDownAnimation2"
                  src="/assets/landing-effect-1.png"
                  alt="Landing Animation - Ball"
                  w="35px"
                  left="25%"
                  loading="lazy"
                />
              </Flex>
            )}
          </Flex>
          <SlideFade in={true} offsetY="20px" delay={1}>
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              mt="6em"
            >
              <Text fontSize="13pt" fontWeight="hairline" color={sponsorColor}>
                SUPPORTED BY
              </Text>
              <Wrap spacing="4em" m="1em" justify="center">
                {partnersArr?.map((partner, idx) => (
                  <Link href={partner.link} isExternal key={idx}>
                    <Button
                      variant="unstyled"
                      display="flex"
                      h="62.92px"
                      _hover={{ opacity: "1" }}
                      opacity="0.3"
                      onClick={() =>
                        posthog?.capture(
                          "User visited partner from landing page",
                          { company: partner.company },
                        )
                      }
                    >
                      <NextImage
                        src={partner.image}
                        alt={`${partner.company}'s Logo`}
                        width={40}
                        height={40}
                      />
                    </Button>
                  </Link>
                ))}
              </Wrap>
            </Flex>
          </SlideFade>
        </Flex>
      </Flex>
      <Features />
      <Testimonials />
      <Pricing />
    </>
  );
};

export default Landing;
