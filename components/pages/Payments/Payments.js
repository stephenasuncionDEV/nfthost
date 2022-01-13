import { useState, useEffect } from "react"
import { useToast, Box, Text, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot, Menu, MenuButton, MenuList, MenuItem, IconButton, Tag, TagLabel } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { HiExternalLink } from 'react-icons/hi'
import { IoMdSettings } from 'react-icons/io'

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Payments = () => {
    const { Moralis, user } = useMoralis();
    const [transactions, setTransactions] = useState({});
    const alert = useToast();

    useEffect(() => {
        if (user == null) return;
        const transactionsClass = Moralis.Object.extend("Transactions");
        const query = new Moralis.Query(transactionsClass);
        query.equalTo("owner", user.attributes.ethAddress);
        query.find()
        .then(res => {
            setTransactions(res);
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }, [user])

    const handleShowEtherScan = (transaction) => {
        window.open(`https://etherscan.io/tx/${transaction.paymentID}`);
    }

    return (
        <div className="main-pane">
                <Box
                    display='flex'
                    flexDir='column'
                    h='full'
                    alignItems='center'
                    mt='6'
                >
                    <Box 
                        maxW='1000px' 
                        width='100%'>
                        <Text fontSize='28pt'>Payments</Text>
                    </Box>
                    <Box
                        mt='6'
                        maxW='1000px'
                        w='100%'
                    >
                        <Box
                        mt='2em'
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Text
                            fontSize='18pt'
                            fontWeight='700'
                        >
                            Your Transactions
                        </Text>
                    </Box>
                    <Table
                        mt='1.5em'
                        variant='simple'
                        borderWidth='1px'
                        bg='white'
                    >
                        <TableCaption>Transaction List</TableCaption>
                        <Thead style={{ backgroundColor: 'rgb(248,249,250)' }}>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Type</Th>
                                <Th>Amount</Th>
                                <Th>Status</Th>
                                <Th>paymentDate</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {transactions.length > 0 && transactions.slice(0).reverse().map((transaction, idx) => (
                            <Tr key={idx}>
                                <Td>{transaction.attributes.paymentID.length < 28 ? transaction.attributes.paymentID : `${transaction.attributes.paymentID.substring(0, 28)}...`}</Td>
                                <Td>
                                    {transaction.attributes.type === 'metamask' && <Tag bg={'rgb(238,129,26)'} color='white'><TagLabel>Metamask</TagLabel></Tag>}
                                    {transaction.attributes.type === 'stripe' && <Tag bg={'rgb(99,91,255)'} color='white'><TagLabel>Stripe</TagLabel></Tag>}
                                </Td>
                                <Td>${transaction.attributes.amount}.00</Td>
                                <Td>
                                    {transaction.attributes.status === 'paid' && <Tag bg={'rgb(51,105,30)'} color='white'><TagLabel>Paid</TagLabel></Tag>}
                                </Td>
                                <Td>{`${dayOfWeek[transaction.createdAt.getDay()]} ${monthNames[transaction.createdAt.getUTCMonth()]} ${transaction.createdAt.getUTCDate()}, ${transaction.createdAt.getUTCFullYear()}`}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            aria-label='Settings'
                                            icon={<IoMdSettings />}
                                            variant='outline'
                                        />
                                        <MenuList>
                                            {transaction.attributes.type === 'metamask' && (
                                                <MenuItem icon={<HiExternalLink />} onClick={() => handleShowEtherScan(transaction.attributes)}>
                                                    EtherScan
                                                </MenuItem>
                                            )}
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                        <Tfoot style={{ backgroundColor: 'rgb(248,249,250)' }}>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Type</Th>
                                <Th>Amount</Th>
                                <Th>Status</Th>
                                <Th>paymentDate</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </Box>
            </Box>
        </div>
    )
}

export default Payments