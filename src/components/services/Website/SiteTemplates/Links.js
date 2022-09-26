import { HStack, IconButton, Link } from '@chakra-ui/react'
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaReddit, FaFacebook } from 'react-icons/fa'
import { GiSailboat } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'

const Links = ({ sx, bx }) => {
    const { userWebsite } = useWebsite();

    return (
        <HStack spacing='1em' {...sx}>
            {userWebsite?.externalLinks?.twitter?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.twitter} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaTwitter />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.opensea?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.opensea} isExternal>
                    <IconButton size='sm' {...bx}>
                        <GiSailboat />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.discord?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.discord} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaDiscord />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.reddit?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.reddit} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaReddit />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.tiktok?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.tiktok} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaTiktok />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.youtube?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.youtube} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaYoutube />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.instagram?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.instagram} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaInstagram />
                    </IconButton>
                </Link>
            )}
            {userWebsite?.externalLinks?.facebook?.length > 0 && (
                <Link href={userWebsite?.externalLinks?.facebook} isExternal>
                    <IconButton size='sm' {...bx}>
                        <FaFacebook />
                    </IconButton>
                </Link>
            )}
        </HStack>
    )
}

export default Links