import { Flex, Text, VStack, Link, HStack, Avatar, useColorModeValue, Wrap } from '@chakra-ui/react'
import { BiLinkExternal } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const bg = useColorModeValue('rgba(218,223,255,1)', 'rgba(17,21,28,1)');
    const srcColor = useColorModeValue('rgb(34,34,34)', 'whiteAlpha.600');
    const isTouchingLogo = useMediaQuery({ query: '(max-width: 630px)' });

    return (
        <footer>
            <Flex minH='500px' bg={bg} justifyContent='center' alignItems='center'>
                <Wrap maxW='8xl' w='full' px='24px' justifyContent='space-between' direction='row' spacing='2em'>
                    <VStack alignItems='center' flex='1' minW='249.5px' spacing='1em'>
                        <Avatar 
                            size='lg'
                            src='/assets/logo.png' 
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
                    <Wrap direction='row' flex='1' justifyContent='center' spacing='5em'>
                        <VStack alignItems='flex-start' justifyContent='flex-start' flex='1'>
                            <Text fontWeight='bold'>
                                Privacy
                            </Text>
                            <Link href='/about/terms' color='white' isExternal>
                                <HStack minW='151.58px'>
                                    <Text>
                                        Terms of Service
                                    </Text>
                                    <BiLinkExternal color={srcColor} />
                                </HStack>
                            </Link>
                            <Link href='/about/privacy-policy' color='white' isExternal>
                                <HStack minW='128.97px'>
                                    <Text>
                                        Privacy Policy
                                    </Text>
                                    <BiLinkExternal color={srcColor} />
                                </HStack>
                            </Link>
                        </VStack>
                        <VStack alignItems='flex-start' justifyContent='flex-start' flex='1'>
                            <Text fontWeight='bold'>
                                NFT Host Team
                            </Text>
                            <Link href='https://www.instagram.com/stephenasuncion/' color='white' isExternal>
                                <HStack minW='161.13'>
                                    <Text>
                                        Stephen Asuncion
                                    </Text>
                                    <BiLinkExternal color={srcColor} />
                                </HStack>
                            </Link>
                        </VStack>
                    </Wrap>
                </Wrap>
            </Flex>
        </footer>
    )
}

export default Footer