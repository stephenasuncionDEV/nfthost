import { Text, Flex, Button, Link } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import { AiOutlineWarning } from "@react-icons/all-files/ai/AiOutlineWarning";
import Meta from "@/components/Meta";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const NotFound = () => {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Meta title="404 | NFT Host" />
      <Flex flexDir="column" minH="100vh">
        <MainNavbar isColorMode />
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          w="full"
          flex="1"
          mb="4em"
        >
          <AiOutlineWarning fontSize="28pt" />
          <Flex flexDir="column" alignItems="center" mt=".5em">
            <Text fontWeight="bold" fontSize="10pt">
              Error
            </Text>
            <Text fontSize="10pt">Page Not Found</Text>
            <Text variant="subtle">
              If you think this is an error please contact us.
            </Text>
          </Flex>
          <Link href="/">
            <Button
              leftIcon={<AiOutlineArrowLeft />}
              variant="primary"
              size="sm"
              mt="1.5em"
            >
              Landing Page
            </Button>
          </Link>
        </Flex>
      </Flex>
      <MainFooter />
    </main>
  );
};

export default NotFound;
