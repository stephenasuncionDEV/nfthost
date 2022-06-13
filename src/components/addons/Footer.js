import { Flex, Text, HStack, Avatar, useColorModeValue, Link, VStack } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { BiLinkExternal } from 'react-icons/bi'

const Footer = () => {
    const { userWebsite } = useWebsite();

    const containerColor = useColorModeValue('rgb(238,238,238)', 'rgb(14,17,23)');

    return (
        <footer>
            <Flex h='500px' bg={containerColor} justifyContent='center' alignItems='center'>
                <Flex maxW='7xl' w='full' px='24px' justifyContent='space-between' flexWrap='wrap'>
                    <VStack alignItems='center' flex='1' minW='249.5px' spacing='1em'>
                        <Avatar 
                            size='lg'
                            src={userWebsite?.components?.unrevealedImage}
                            name={`${userWebsite?.components?.title}'s Logo`}
                            bg='transparent'
                        />
                        <Flex flexDir='column' alignItems='center'>
                            <Text >
                                Copyright &copy; 2022 {userWebsite?.components?.title}.
                            </Text>
                            <Text fontSize='10pt'>
                                All rights reserved.
                            </Text>
                        </Flex>
                    </VStack>
                    {/* <VStack alignItems='center' flex='1' justifyContent='center' ml='5em'>
                        <Text fontWeight='bold'>
                            NFT Host Team
                        </Text>
                        <Link href='https://twitter.com/Steb_01' color='white' isExternal>
                            <HStack>
                                <Text>
                                    Stephen Asuncion
                                </Text>
                                <BiLinkExternal />
                            </HStack>
                        </Link>
                    </VStack> */}
                </Flex>
            </Flex>
        </footer>
    )
}

export default Footer