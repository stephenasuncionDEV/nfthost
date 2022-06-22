import NextLink from 'next/link'
import { Text, HStack, Avatar, IconButton, useColorModeValue, useColorMode, Link } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaReddit, FaFacebook } from 'react-icons/fa'

const WebsiteNavbar = () => {
    const { userWebsite } = useWebsite();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <HStack
            px='2em'
            py='1.5em'
            w='full'
            justifyContent='space-between'
        >
            <NextLink href='/' shallow passHref>
                <HStack spacing='1em' cursor='pointer'>
                    <Avatar 
                        size='md'
                        src={userWebsite?.components?.unrevealedImage}
                        name={`${userWebsite?.components?.title}'s Logo`}
                        bg='transparent'
                    />
                    <Text fontWeight='bold' fontSize='14pt'>
                        {userWebsite?.components?.title}
                    </Text>
                </HStack>
            </NextLink>
            <HStack>
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
                <HStack>
                    <IconButton 
                        ml='.5em'
                        aria-label='Toggle Color Mode' 
                        icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} 
                        bg='transparent'
                        onClick={toggleColorMode} 
                    />
                </HStack>
            </HStack>
        </HStack>
    )
}

export default WebsiteNavbar