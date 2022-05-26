import { Flex, Text, VStack, Image, Link, HStack, Avatar } from '@chakra-ui/react'
import { BiLinkExternal } from 'react-icons/bi'

const Footer = () => {

    return (
        <footer>
            <Flex h='500px' bg='linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(218,223,255,1) 100%)' justifyContent='center' alignItems='center'>
                <Flex maxW='8xl' w='full' px='24px' justifyContent='space-between' flexWrap='wrap'>
                    <VStack alignItems='center' flex='1' minW='249.5px' spacing='1em'>
                        <Avatar 
                            size='lg'
                            src='/logo.png' 
                            name='NFT Host Logo' 
                            bg='transparent'
                        />
                        <Flex flexDir='column' alignItems='center'>
                            <Text >
                                Copyright &copy; 2022 NFT Host Ltd.
                            </Text>
                            <Text fontSize='10pt'>
                                All rights reserved.
                            </Text>
                        </Flex>
                    </VStack>
                    <Flex flexDir='row' flex='1'>
                        <VStack alignItems='flex-start' justifyContent='center' ml='5em'>
                            <Text fontWeight='bold'>
                                Privacy
                            </Text>
                            <Link href='/about/terms' color='white' isExternal>
                                <HStack>
                                    <Text >
                                        Terms of Service
                                    </Text>
                                    <BiLinkExternal color='rgb(34,34,34)'/>
                                </HStack>
                            </Link>
                            <Link href='/about/privacy-policy' color='white' isExternal>
                                <HStack>
                                    <Text >
                                        Privacy Policy
                                    </Text>
                                    <BiLinkExternal color='rgb(34,34,34)'/>
                                </HStack>
                            </Link>
                        </VStack>
                        <VStack alignItems='flex-start' justifyContent='center' ml='5em'>
                            <Text fontWeight='bold'>
                                NFT Host Team
                            </Text>
                            <Link href='https://twitter.com/Steb_01' color='white' isExternal>
                                <HStack>
                                    <Text>
                                        Stephen Asuncion
                                    </Text>
                                    <BiLinkExternal color='rgb(34,34,34)'/>
                                </HStack>
                            </Link>
                        </VStack>
                    </Flex>
                </Flex>
            </Flex>
        </footer>
    )
}

export default Footer