import NextLink from 'next/link'
import { Box, Flex, Text, useColorModeValue, Avatar, HStack, Button, VStack, Link, Slide } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import { BsStack } from 'react-icons/bs'
import { FcTemplate } from 'react-icons/fc'
import { MdContactSupport } from 'react-icons/md'

const sidebarItemsArr = [
    { name: 'Mint Sites', icon: <BsStack />, key: 'sites' },
    { name: 'Template', icon: <FcTemplate />, key: 'template' }
]

const Sidebar = ({ children }) => {
    const { setCurrentDashboard, isEditWebsite } = useWebsite();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <>
            <Slide direction='left' in={true}>
                <Flex 
                    position='fixed'
                    flexDir='column'
                    bg={containerColor}
                    minW='250px'
                    h='full'
                    p='1em'
                    alignItems='center'
                >
                    <NextLink href='/' shallow passHref>
                        <HStack spacing='1em' cursor='pointer' p='1em'>
                            <Avatar 
                                size='md'
                                src='/assets/logo.png' 
                                name='NFT Host Logo' 
                                bg='transparent'
                            />
                            <Text fontWeight='bold' fontSize='14pt'>
                                NFT Host
                            </Text>
                        </HStack>
                    </NextLink>
                    <Box mt='1em'>
                        <ConnectWalletTag isSidebar />
                    </Box>
                    <Flex flexDir='column' mt='1em' w='full' justifyContent='space-between' h='full'>
                        <VStack>
                            {sidebarItemsArr?.map((item, idx) => (
                                <Button 
                                    key={idx} 
                                    leftIcon={item.icon} 
                                    justifyContent='flex-start' 
                                    bg='transparent' 
                                    w='full'
                                    onClick={() => setCurrentDashboard(item.key)}
                                    disabled={!isEditWebsite && item.key !== 'sites'}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </VStack>
                        <VStack>
                            <Box p='1em' borderRadius='10px' w='full' bg={containerColor}>
                                <Link href='https://discord.com/invite/BMZZXZMnmv' isExternal w='full'>
                                    <Button 
                                        bg='transparent' 
                                        justifyContent='flex-start'
                                        leftIcon={<MdContactSupport />}
                                        w='full'
                                    >
                                        Support
                                    </Button>
                                    <Text fontSize='10pt' mt='.5em'>
                                        Need help? Join us on discord
                                    </Text>
                                </Link>
                            </Box>
                        </VStack>
                    </Flex>
                </Flex>
            </Slide>
            <Box ml='250px' p='2em' pb='4em'>
                {children}
            </Box>
        </>
    )
}

export default Sidebar