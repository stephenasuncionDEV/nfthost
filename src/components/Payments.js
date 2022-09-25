import { VStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
    TableContainer, IconButton, Menu, MenuItem, MenuList, MenuButton,
    useColorModeValue, Text, Tag, Link, HStack, Button
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useTransactions } from '@/hooks/useTransactions'
import { BiSupport } from 'react-icons/bi'
import { MdOutlineContentCopy } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { webColor } from '@/theme/index'

const Payments = () => {
    const { transactions, paymentPageNumber, setPaymentPageNumber, isGettingTransactions } = useCore();
    const { CopyHash, GetTransactions } = useTransactions();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <>
            <VStack 
                id='payments'
                spacing='1.5em'
                p='1em' 
                bg={containerColor}
                borderRadius='.25em'
                boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                w='full'
                border='1px solid rgb(117,63,229)'
            >
                <TableContainer w='full'>
                    <Table variant='simple'>
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
                                        <HStack cursor='pointer' onClick={() => CopyHash(payment)}>
                                            <Text noOfLines={1} fontSize='10pt' maxW='200px'>
                                                {payment.hash}
                                            </Text>
                                            <MdOutlineContentCopy fontSize='12pt'/>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Tag>{payment.service.toUpperCase()}</Tag>
                                    </Td>
                                    <Td>${payment.price}</Td>
                                    <Td fontSize='10pt'>{payment.createdAt}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton as={IconButton} icon={<IoMdSettings />} size='sm' />
                                            <MenuList>
                                                <Link href='https://discord.com/invite/u2xXYn7C9T' isExternal>
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
            <HStack w='full' justifyContent='flex-end' mt='2em'>
                <HStack
                    bg={containerColor}
                    spacing='1.5em'
                    p='1em' 
                    borderRadius='.25em'
                    boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                >
                    <IconButton 
                        disabled={isGettingTransactions || paymentPageNumber === 0} 
                        isLoading={isGettingTransactions}
                        onClick={() => {
                            const newPageNumber = paymentPageNumber - 1;
                            setPaymentPageNumber(newPageNumber);
                            GetTransactions(newPageNumber);
                        }}
                        size='sm'
                    >
                        <AiOutlineLeft />
                    </IconButton>
                    <HStack>
                        {Array.from(Array(transactions?.totalPages), (e, idx) => (
                            <Button 
                                key={idx} 
                                variant={paymentPageNumber === idx ? 'primary' : 'solid'} 
                                disabled={isGettingTransactions}
                                onClick={() => {
                                    setPaymentPageNumber(idx);
                                    GetTransactions(idx);
                                }}
                                size='sm'
                            >
                                {idx}
                            </Button>
                        ))}
                    </HStack>
                    <IconButton 
                        disabled={isGettingTransactions || paymentPageNumber === transactions?.totalPages - 1} 
                        isLoading={isGettingTransactions}
                        onClick={() => {
                            const newPageNumber = paymentPageNumber + 1;
                            setPaymentPageNumber(newPageNumber);
                            GetTransactions(newPageNumber);
                        }}
                        size='sm'
                    >
                        <AiOutlineRight />
                    </IconButton>
                </HStack>
            </HStack>
        </>
    )
}

export default Payments