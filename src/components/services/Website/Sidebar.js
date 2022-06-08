import NextLink from 'next/link'
import { Box, Flex, Text, useColorModeValue, Avatar, HStack, Button, VStack } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { BsStack } from 'react-icons/bs'
import { FcTemplate } from 'react-icons/fc'
import ConnectWalletTag from '@/components/ConnectWalletTag'

const sidebarItemsArr = [
    { name: 'Mint Sites', icon: <BsStack />, key: 'sites' },
    { name: 'Template', icon: <FcTemplate />, key: 'template' }
]

const Sidebar = ({ children }) => {
    const { setCurrentDashboard, isEditWebsite } = useWebsite();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <>
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
                <VStack mt='1em' w='full'>
                    {sidebarItemsArr?.map((item, idx) => (
                        <Button 
                            key={idx} 
                            w='full' 
                            leftIcon={item.icon} 
                            justifyContent='flex-start' 
                            bg='transparent' 
                            onClick={() => setCurrentDashboard(item.key)}
                            disabled={!isEditWebsite && item.key !== 'sites'}
                        >
                            {item.name}
                        </Button>
                    ))}
                </VStack>
            </Flex>
            <Box ml='250px' p='2em' pb='4em'>
                {children}
            </Box>
        </>
    )
}

export default Sidebar