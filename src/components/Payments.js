import { VStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
    TableContainer, IconButton, Menu, MenuItem, MenuList, MenuButton,
    useColorModeValue, Text, Tag, Link
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useTransactions } from '@/hooks/useTransactions'
import { BiSupport } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'

const Payments = () => {
    const { transactions } = useCore();
    useTransactions();
    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <VStack 
            id='payments'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            maxW='900px'
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
                        {transactions?.map((payment, idx) => (
                            <Tr key={idx}>
                                <Td maxW='100px'>
                                    <Text noOfLines={1} fontSize='10pt'>
                                        {payment.hash}
                                    </Text>
                                </Td>
                                <Td>
                                    <Tag>{payment.service.toUpperCase()}</Tag>
                                </Td>
                                <Td>${payment.price}</Td>
                                <Td fontSize='10pt'>{payment.createdAt}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={IconButton} icon={<IoMdSettings />} />
                                        <MenuList>
                                            <Link href='https://discord.gg/BMZZXZMnmv' isExternal>
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
    )
}

export default Payments