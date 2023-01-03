import { Text, Flex, Image, Heading, Box } from "@chakra-ui/react";
import { useWebsite } from "@/providers/WebsiteProvider";
import Embed from "./Embed";
import Watermark from "./Watermark";

const Template1 = () => {
  const { userWebsite } = useWebsite();

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      p="3em"
      minH="100vh"
      position="relative"
    >
      <Watermark position="absolute" bottom="4" right="4" />
      <Flex
        flexDir="column"
        spacing="2em"
        p="3em"
        borderRadius="20px"
        alignItems="center"
      >
        <Image
          src={userWebsite?.components?.unrevealedImage}
          alt={userWebsite?.components?.title}
          boxSize="240px"
          objectFit="scale-down"
          borderRadius="10px"
        />
        <Flex flexDir="column" alignItems="center" mt="1.5em">
          <Heading as="h1" textAlign="center">
            {userWebsite?.components?.title}
          </Heading>
          <Box maxW="560px" mt=".5em">
            <Text textAlign="center" color="gray.400">
              {userWebsite?.components?.description}
            </Text>
          </Box>
        </Flex>
        <Embed mt="2em" />
      </Flex>
    </Flex>
  );
};

export default Template1;
