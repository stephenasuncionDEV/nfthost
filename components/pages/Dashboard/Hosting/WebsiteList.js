import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useToast, Text, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot, Link, HStack, Menu, MenuButton, MenuList, MenuItem, IconButton, MenuDivider, Tag, TagLabel } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { HiExternalLink } from 'react-icons/hi'
import { IoMdSettings } from 'react-icons/io'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { MdAutorenew } from 'react-icons/md'

const curDate = new Date();
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const WebsiteList = (props, ref) => {
    const { onEdit, onRenew, onDelete } = props;
    const { Moralis, user } = useMoralis();
    const [websiteList, setWebsiteList] = useState([]);
    const alert = useToast();

    const getWebsiteList = () => {
        const websiteClass = Moralis.Object.extend("Website");
        const query = new Moralis.Query(websiteClass);
        query.equalTo("owner", user.attributes.ethAddress);
        query.find()
        .then(res => {
            setWebsiteList(res);
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }

    useEffect(() => {
        if (user == null) return;
        getWebsiteList();
    }, [user])

    useImperativeHandle(ref, () => ({
        refresh() {
            getWebsiteList();
        }
    }), [])

    const handleEdit = (website) => {
        onEdit(website);
    }

    const handleRenew = (website) => {
        onRenew(website);
    }

    const handleDelete = (website) => {
        onDelete(website);
    }
 
    return (
        <Table
            mt='1.5em'
            variant='simple'
            borderWidth='1px'
            bg='white'
        >
            <TableCaption>Website List ({websiteList.length}/{user ? user.attributes.hostSize : "--"})</TableCaption>
            <Thead style={{ backgroundColor: 'rgb(248,249,250)' }}>
                <Tr>
                    <Th>Name</Th>
                    <Th>Type</Th>
                    <Th>Site Link</Th>
                    <Th>Created At</Th>
                    <Th>Updated At</Th>
                    <Th>Expires At</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {websiteList.length > 0 && websiteList.slice(0).reverse().map((website, idx) => (
                    <Tr key={idx}>
                        <Td>{website.attributes.title}</Td>
                        <Td>
                            <Tag bg={website.attributes.isPremium ? 'yellow.300' : 'gray.200'}>
                                <TagLabel>{website.attributes.isPremium ? "Premium" : "Free"}</TagLabel>
                            </Tag>
                        </Td>
                        <Td color='#5D82BF'>
                            <Link 
                                href={website.attributes.url} 
                                isExternal
                            >
                                <HStack>
                                    <Text>{website.attributes.url}</Text>
                                    <HiExternalLink />
                                </HStack>
                            </Link>
                        </Td>
                        <Td>{`${dayOfWeek[website.createdAt.getDay()]} ${monthNames[website.createdAt.getUTCMonth()]} ${website.createdAt.getUTCDate()}, ${website.createdAt.getUTCFullYear()}`}</Td>
                        <Td>{`${dayOfWeek[website.updatedAt.getDay()]} ${monthNames[website.updatedAt.getUTCMonth()]} ${website.updatedAt.getUTCDate()}, ${website.updatedAt.getUTCFullYear()}`}</Td>
                        <Td>
                            {website.attributes.isPremium ? (
                                `${dayOfWeek[website.attributes.expiresAt.getDay()]} ${monthNames[website.attributes.expiresAt.getUTCMonth()]} ${website.attributes.expiresAt.getUTCDate()}, ${website.attributes.expiresAt.getUTCFullYear()}`
                            ) : (
                                'N/A'
                            )}
                        </Td>
                        <Td>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Settings'
                                    icon={<IoMdSettings />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem icon={<AiOutlineEdit />} onClick={() => handleEdit(website.attributes)}>
                                        Edit
                                    </MenuItem>
                                    {curDate.getTime() >= website.attributes.expiresAt.getTime() && (
                                        <MenuItem icon={<MdAutorenew />} onClick={() => handleRenew(website.attributes)}>
                                            Renew
                                        </MenuItem>
                                    )}
                                    <MenuDivider />
                                    <MenuItem icon={<AiOutlineDelete />} onClick={() => handleDelete(website.attributes)}>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot style={{ backgroundColor: 'rgb(248,249,250)' }}>
                <Tr>
                    <Th>Name</Th>
                    <Th>Type</Th>
                    <Th>Site Link</Th>
                    <Th>Created At</Th>
                    <Th>Updated At</Th>
                    <Th>Expires At</Th>
                    <Th>Actions</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default forwardRef(WebsiteList)