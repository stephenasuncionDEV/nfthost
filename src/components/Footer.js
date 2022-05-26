import { Flex, Text, VStack, Image, Link, HStack } from '@chakra-ui/react'
import { BiLinkExternal } from 'react-icons/bi'

const Footer = () => {

    return (
        <footer>
            <Flex h='500px' bg='rgb(234,239,241)' justifyContent='center' alignItems='center'>
                <Flex maxW='8xl' w='full' px='24px' justifyContent='space-between' flexWrap='wrap'>
                    <VStack alignItems='center' flex='1' minW='249.5px' spacing='1em'>
                        <Image
                            src='/logo.png'
                            alt='NFT Host Logo'
                            w='100px'
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
                            <Text >
                                Stephen Asuncion
                            </Text>
                        </VStack>
                    </Flex>
                </Flex>
            </Flex>
        </footer>
    )
}

export default Footer