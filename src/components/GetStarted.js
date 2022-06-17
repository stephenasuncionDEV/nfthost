import NextLink from 'next/link'
import { Box, Flex, Wrap, Button, Text, Image, useColorModeValue, VStack, HStack, Link, Tag } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useNavbar } from '@/hooks/useNavbar'
import { GiHand } from 'react-icons/gi'
import { MdOutlineDashboard, MdOutlineMiscellaneousServices, 
    MdOutlineDarkMode, MdOutlineLightMode 
} from 'react-icons/md'
import { CgWebsite } from 'react-icons/cg'
import { useGetStarted } from '@/hooks/useGetStarted'
import config from '@/config/index'

const GetStarted = () => {
    const { featuredWebsites } = useGetStarted();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const buttonColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

    return (
        <Flex flexDir='column' justifyContent='center' alignItems='center' flex='1'>
            <GiHand fontSize='28pt' />
            <Flex flexDir='column' alignItems='center' mt='.5em'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Get Started
                </Text>
                <Text fontSize='10pt'>
                    Welcome to NFT Host! We created this page to guide you through your NFT journey.
                </Text>
            </Flex>
            <Wrap mt='3em' spacing='2em'>
                <VStack
                    spacing='1.5em'
                    p='1em' 
                    bg={containerColor}
                    borderRadius='.25em'
                    boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                    h='100%'
                >
                    <HStack spacing='1em'>
                        <MdOutlineMiscellaneousServices fontSize='32pt' />
                        <Text>
                            NFT Collection Generator
                        </Text>
                    </HStack>
                    <NextLink href='/dashboard/generator' passHref shallow>
                        <Button variant='primary'>
                            Generate
                        </Button>
                    </NextLink>
                </VStack>
                <VStack
                    spacing='1.5em'
                    p='1em' 
                    bg={containerColor}
                    borderRadius='.25em'
                    boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                    h='100%'
                >
                    <HStack spacing='1em'>
                        <CgWebsite fontSize='32pt' />
                        <Text>
                            NFT Mint Website Hosting
                        </Text>
                    </HStack>
                    <NextLink href='/dashboard/website' passHref shallow>
                        <Button variant='primary'>
                            Create
                        </Button>
                    </NextLink>
                </VStack>
            </Wrap>
            <Flex flexDir='column' alignItems='center' mt='5em'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Featured Websites
                </Text>
                <Text fontSize='10pt'>
                    Websites created by users across the world.
                </Text>
                <Wrap spacing='1em' mt='2em'>
                    {featuredWebsites?.map((website, idx) => (
                        <Link href={`${config?.frontendUrl}/${website?._id}`} isExternal key={idx}>
                            <Button 
                                boxSize='180px'
                                position='relative' 
                                bgColor={buttonColor} 
                                cursor='pointer' 
                                borderRadius='10px'
                                overflow='hidden'
                            >
                                <Image 
                                    position='absolute'
                                    src={website?.components?.unrevealedImage}
                                    fallbackSrc='http://localhost:3000/assets/logo.png'
                                    alt='Website Logo' 
                                    objectFit='cover' 
                                    opacity='1' 
                                    boxSize='250px'
                                    transform='rotate(10deg)'
                                />
                                <Tag position='absolute' bg='rgb(52,140,212)' color='white'>
                                    {website.components.title}
                                </Tag>
                            </Button>
                        </Link>
                    ))}
                </Wrap>
            </Flex>
        </Flex>
    )
}

export default GetStarted