import { Flex, Text, VStack, Link, HStack, useColorModeValue, Wrap, Image } from '@chakra-ui/react'
import { BiLinkExternal } from 'react-icons/bi'

const Footer = () => {
    const bg = useColorModeValue('rgba(240,240,240,1)', 'rgba(17,21,28,1)');
    const srcColor = useColorModeValue('rgb(34,34,34)', 'white');

    return (
        <footer>
            <Flex minH='500px' bg={bg} justifyContent='center' alignItems='center'>
                <Wrap maxW='8xl' w='full' px='24px' justifyContent='space-between' direction='row' spacing='2em'>
                    <VStack alignItems='center' flex='1' minW='249.5px' spacing='1em'>
                        <Image src='/assets/logo.svg' alt='NFTHost Logo' width='60px' />
                        <Flex flexDir='column' alignItems='center'>
                            <Text fontSize='10pt'>
                                Copyright &copy; 2022 NFT Host Ltd.
                            </Text>
                            <Text fontSize='9pt'>
                                All rights reserved.
                            </Text>
                        </Flex>
                    </VStack>
                    <Wrap direction='row' flex='1' justifyContent='center' spacing='5em'>
                        <VStack alignItems='flex-start' justifyContent='flex-start' flex='1'>
                            <Text fontWeight='bold' fontSize='10pt'>
                                Privacy
                            </Text>
                            <Link href='/about/terms' color='white' isExternal>
                                <HStack minW='151.58px' fontSize='9pt'>
                                    <Text>
                                        Terms of Service
                                    </Text>
                                    <BiLinkExternal color={srcColor} />
                                </HStack>
                            </Link>
                            <Link href='/about/privacy-policy' color='white' isExternal>
                                <HStack minW='128.97px' fontSize='9pt'>
                                    <Text>
                                        Privacy Policy
                                    </Text>
                                    <BiLinkExternal color={srcColor} />
                                </HStack>
                            </Link>
                        </VStack>
                        <VStack alignItems='flex-start' justifyContent='flex-start' flex='1'>
                            <Text fontWeight='bold' fontSize='10pt'>
                                Team
                            </Text>
                            <Link href='https://www.linkedin.com/in/stephenasuncion/' color='white' isExternal>
                                <HStack minW='161.13' fontSize='9pt'>
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