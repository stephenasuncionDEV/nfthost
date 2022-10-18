import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useColorModeValue,
  Text,
  Tag,
  Link,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useCore } from "@/providers/CoreProvider";
import { useTransactions } from "@/hooks/useTransactions";
// import { usePaymentControls } from '@/hooks/usePaymentControls'
import { BiSupport } from "@react-icons/all-files/bi/BiSupport";
import { AiOutlineCopy } from "@react-icons/all-files/ai/AiOutlineCopy";
import { IoMdSettings } from "@react-icons/all-files/io/IoMdSettings";
import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import { webColor } from "@/theme/index";
import AreYouSureModal from "@/components/AreYouSureModal";

const Payments = () => {
  const {
    transactions,
    paymentPageNumber,
    setPaymentPageNumber,
    isGettingTransactions,
    // setIsAreYouSureModal,
    // setAreYouSureData
  } = useCore();
  const { CopyHash, GetTransactions } = useTransactions();
  // const {
  //     subscriptions,
  //     getSubscriptions,
  //     cancelSubscription,
  //     isCanceling
  // } = usePaymentControls();

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );
  const textColor = useColorModeValue("black", "white");

  // useEffect(() => {
  //     getSubscriptions();
  // }, [])

  return (
    <VStack alignItems="flex-start" spacing="2em">
      <AreYouSureModal />
      {/* <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em' 
                w='full'
                border='1px solid rgb(117,63,229)'
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Active Subscriptions</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            List of your active subscriptions
                        </Text>
                    </VStack>
                    <Wrap spacing='2em' mt='1em'>
                        {subscriptions?.map((sub, idx) => (
                            <Flex 
                                flexDir='column' 
                                bg={containerColor} 
                                p='1em' 
                                borderRadius='.25em' 
                                border='1px solid rgb(117,63,229)'
                                key={idx}
                                
                            >
                                <Text fontSize='10pt'>
                                        ID: {sub.id}
                                </Text>
                                <Text fontSize='10pt'>
                                        Status: {sub.status}
                                </Text>
                                <Button 
                                    disabled={isCanceling} 
                                    isLoading={isCanceling}
                                    loadingText='Canceling'
                                    variant='primary' 
                                    mt='1em' 
                                    onClick={() => {
                                        setAreYouSureData({
                                            item: 'subscription',
                                            action: 'Proceed',
                                            button: 'danger',
                                            callback: () => {
                                                cancelSubscription(sub.id);
                                            }
                                        })
                                        setIsAreYouSureModal(true);
                                    }}>
                                    Cancel Subscription
                                </Button>
                            </Flex>
                        ))}
                    </Wrap>
                </Flex>
            </Flex> */}
      <VStack
        id="payments"
        spacing="1.5em"
        p="1em"
        bg={containerColor}
        borderRadius=".25em"
        boxShadow="0 0 2px 0 rgb(0 0 0 / 10%)"
        w="full"
        border="1px solid rgb(117,63,229)"
      >
        <TableContainer w="full">
          <Table variant="simple">
            <TableCaption>Transactions</TableCaption>
            <Thead>
              <Tr>
                <Th>Hash</Th>
                <Th>Service</Th>
                <Th>Price</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions?.payments?.map((payment, idx) => (
                <Tr key={idx}>
                  <Td>
                    <HStack cursor="pointer" onClick={() => CopyHash(payment)}>
                      <Text noOfLines={1} fontSize="10pt" maxW="200px">
                        {payment.hash}
                      </Text>
                      <AiOutlineCopy fontSize="12pt" />
                    </HStack>
                  </Td>
                  <Td>
                    <Tag>{payment.service.toUpperCase()}</Tag>
                  </Td>
                  <Td>${payment.price}</Td>
                  <Td fontSize="10pt">
                    {new Date(payment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<IoMdSettings />}
                        size="sm"
                      />
                      <MenuList>
                        <Link
                          href="https://discord.com/invite/u2xXYn7C9T"
                          isExternal
                          style={{ color: textColor, textDecoration: "none" }}
                        >
                          <MenuItem icon={<BiSupport />}>
                            Request Support
                          </MenuItem>
                        </Link>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Hash</Th>
                <Th>Service</Th>
                <Th>Price</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </VStack>
      <HStack w="full" justifyContent="flex-end">
        <HStack
          bg={containerColor}
          spacing="1.5em"
          p="1em"
          borderRadius=".25em"
          boxShadow="0 0 2px 0 rgb(0 0 0 / 10%)"
        >
          <IconButton
            disabled={isGettingTransactions || paymentPageNumber === 0}
            isLoading={isGettingTransactions}
            onClick={() => {
              const newPageNumber = paymentPageNumber - 1;
              setPaymentPageNumber(newPageNumber);
              GetTransactions(newPageNumber);
            }}
            size="sm"
          >
            <AiOutlineLeft />
          </IconButton>
          <HStack>
            {Array.from(Array(transactions?.totalPages), (e, idx) => (
              <Button
                key={idx}
                variant={paymentPageNumber === idx ? "primary" : "solid"}
                disabled={isGettingTransactions}
                onClick={() => {
                  setPaymentPageNumber(idx);
                  GetTransactions(idx);
                }}
                size="sm"
              >
                {idx}
              </Button>
            ))}
          </HStack>
          <IconButton
            disabled={
              isGettingTransactions ||
              paymentPageNumber === transactions?.totalPages - 1
            }
            isLoading={isGettingTransactions}
            onClick={() => {
              const newPageNumber = paymentPageNumber + 1;
              setPaymentPageNumber(newPageNumber);
              GetTransactions(newPageNumber);
            }}
            size="sm"
          >
            <AiOutlineRight />
          </IconButton>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Payments;
