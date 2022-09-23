import { Flex, Text, HStack, Avatar, useColorModeValue, Link, VStack, IconButton } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaReddit, FaFacebook } from 'react-icons/fa'

const Footer = () => {
    const { userWebsite } = useWebsite();
    const containerColor = useColorModeValue('rgb(240,240,240)', 'rgb(14,17,23)');

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
                        <Flex flexDir='column' alignItems='center' fontSize='10pt'>
                            <Text >
                                Copyright &copy; 2022 {userWebsite?.components?.title}
                            </Text>
                            <Text fontSize='9pt'>
                                All rights reserved
                            </Text>
                        </Flex>
                        <HStack>
                            {userWebsite?.external_links?.twitter && (
                                <Link href={userWebsite?.external_links?.twitter} isExternal>
                                    <IconButton icon={<FaTwitter />} size='sm' />
                                </Link>
                            )}
                            {userWebsite?.external_links?.discord && (
                                <Link href={userWebsite?.external_links?.discord} isExternal>
                                    <IconButton icon={<FaDiscord />} size='sm' />
                                </Link>
                            )}
                            {userWebsite?.external_links?.instagram && (
                                <Link href={userWebsite?.external_links?.instagram} isExternal>
                                    <IconButton icon={<FaInstagram />} size='sm' />
                                </Link>
                            )}
                            {userWebsite?.external_links?.facebook && (
                                <Link href={userWebsite?.external_links?.facebook} isExternal>
                                    <IconButton icon={<FaFacebook />} size='sm' />
                                </Link>
                            )}
                            {userWebsite?.external_links?.youtube && (
                                <Link href={userWebsite?.external_links?.youtube} isExternal>
                                    <IconButton icon={<FaYoutube />} size='sm' />
                                </Link>
                            )}
                            {userWebsite?.external_links?.reddit && (
                                <Link href={userWebsite?.external_links?.reddit} isExternal>
                                    <IconButton icon={<FaReddit />} size='sm' />
                                </Link>
                            )}
                            {userWebsite?.external_links?.tiktok && (
                                <Link href={userWebsite?.external_links?.tiktok} isExternal>
                                    <IconButton icon={<FaTiktok />} size='sm' />
                                </Link>
                            )}
                        </HStack>
                    </VStack>
                </Flex>
            </Flex>
        </footer>
    )
}

export default Footer