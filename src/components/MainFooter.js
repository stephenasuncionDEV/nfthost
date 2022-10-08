import NextLink from 'next/link'
import { Flex, Text, VStack, Link, HStack, useColorModeValue, Wrap, 
    Image, Heading, IconButton 
} from '@chakra-ui/react'
import { SiTiktok } from '@react-icons/all-files/si/SiTiktok'
import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'

const Footer = () => {

    const defaultColor = useColorModeValue('black', 'white');
    const navbarButton = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');

    return (
        <Flex as='footer' minH='500px' justifyContent='center' alignItems='flex-start' bg='#000616' p='2em' py='4em'>
            <Wrap justify='center' w='full' spacing='5em'>
                <Flex flexDir='column' flex='1' alignItems='center'>
                    <NextLink href='/' shallow passHref>
                        <Flex flexDir='column'>
                            <HStack spacing='.5em' cursor='pointer' flex='1'>
                                <Image src='/assets/logo.png' alt='NFT Host Logo' w='50px'/>
                                <Heading as='h1' fontWeight='bold' fontFamily='inter' fontSize='20pt'>
                                    NFT Host
                                </Heading>
                            </HStack>
                            <Text fontSize='9pt' mt='1.25em'>
                                &copy; 2022 NFTHost. All rights Reserved.
                            </Text>
                            <HStack justifyContent='center' mt='1em'>
                                <Link href='https://discord.gg/2BDzCvSTVc' isExternal style={{ color: defaultColor }}>
                                    <IconButton 
                                        aria-label='NFT Host Discord'
                                        icon={<FaDiscord />}
                                        borderRadius='50%'
                                        size='sm'
                                        bg='transparent'
                                        _hover={{ bg: 'transparent', color: navbarButton }}

                                    />
                                </Link>
                                <Link href='https://github.com/stephenasuncionDEV/nfthost' isExternal style={{ color: defaultColor }}>
                                    <IconButton 
                                        aria-label='NFT Host Github'
                                        icon={<FaGithub />}
                                        borderRadius='50%'
                                        size='sm'
                                        bg='transparent'
                                        _hover={{ bg: 'transparent', color: navbarButton }}
                                    />
                                </Link>
                                <Link href='https://www.tiktok.com/@nfthostofficial' isExternal style={{ color: defaultColor }}>
                                    <IconButton 
                                        aria-label='NFT Host Tiktok'
                                        icon={<SiTiktok />}
                                        borderRadius='50%'
                                        size='sm'
                                        bg='transparent'
                                        _hover={{ bg: 'transparent', color: navbarButton }}
                                    />
                                </Link>
                            </HStack>
                        </Flex>
                    </NextLink>
                </Flex>
                <Flex flex='1' justifyContent='flex-start'>
                    <Wrap spacing='4em'>
                        <VStack alignItems='flex-start'>
                            <Text fontWeight='bold'>
                                Landing
                            </Text>
                            <NextLink href='/#features' passHref shallow>
                                <Text cursor='pointer' _hover={{ color: navbarButton }}>
                                    Features
                                </Text>
                            </NextLink>
                            <NextLink href='/#testimonials' passHref shallow>
                                <Text cursor='pointer' _hover={{ color: navbarButton }}>
                                    Testimonials
                                </Text>
                            </NextLink>
                            <NextLink href='/#pricing' passHref shallow>
                                <Text cursor='pointer' _hover={{ color: navbarButton }}>
                                    Pricing
                                </Text>
                            </NextLink>
                        </VStack>
                        <VStack alignItems='flex-start'>
                            <Text fontWeight='bold'>
                                Policies
                            </Text>
                            <Link href='/about/terms' isExternal style={{ textDecoration: 'none' }}>
                                <Text cursor='pointer' _hover={{ color: navbarButton }}>
                                    Terms of Service
                                </Text>
                            </Link>
                            <Link href='/about/privacy-policy' isExternal style={{ textDecoration: 'none' }}>
                                <Text cursor='pointer' _hover={{ color: navbarButton }}>
                                    Privacy Policy
                                </Text>
                            </Link>
                        </VStack>
                        <VStack alignItems='flex-start'>
                            <Text fontWeight='bold'>
                                About
                            </Text>
                            <NextLink href='/dashboard/team' passHref shallow>
                                <Text cursor='pointer' _hover={{ color: navbarButton }}>
                                    Team
                                </Text>
                            </NextLink>
                        </VStack>
                    </Wrap>
                </Flex>
            </Wrap>
        </Flex>
    )
}

export default Footer