import NextLink from 'next/link'
import { Flex, Wrap, Button, Text, Image, useColorModeValue, 
    VStack, HStack, Link, Tag, TagLeftIcon 
} from '@chakra-ui/react'
import { useGetStarted } from '@/hooks/useGetStarted'
import { GiCutDiamond } from 'react-icons/gi'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineRight } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import { getStartedServicesArr } from '@/utils/json'
import config from '@/config/index'

const GetStarted = () => {
    const { featuredWebsites } = useGetStarted();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const buttonColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

    return (
        <Flex flexDir='column' flex='1'>
            <Flex flexDir='column' mt='.5em'>
                <Text fontWeight='bold' fontSize='26pt'>
                    Welcome
                </Text>
                <Text fontSize='10pt'>
                    Welcome to NFT Host! We created this page to guide you through your NFT journey.
                </Text>
            </Flex>
            <Wrap spacing='2em' mt='3em'>
                <VStack spacing='2em' alignItems='flex-start' maxW='760px' w='full'>
                    {getStartedServicesArr?.map((service, idx) => (
                        <VStack
                            spacing='1.5em'
                            p='1em' 
                            bg={containerColor}
                            borderRadius='.25em'
                            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                            h='100%'
                            w='full'
                            key={idx}
                            alignItems='flex-start'
                        >
                            <HStack spacing='1em' justifyContent='space-between' w='full'>
                                <HStack spacing='1em'>
                                    {service.icon}
                                    <Text>
                                        {service.name}
                                    </Text>
                                </HStack>
                                <Tag bg='green.500'>
                                    Online
                                </Tag>
                            </HStack>
                            <NextLink href={service.link} passHref shallow>
                                <Button variant='primary' rightIcon={<AiOutlineRight />} maxW='140px' w='full' justifyContent='space-evenly'>
                                    {service.buttonText}
                                </Button>
                            </NextLink>
                        </VStack>
                    ))}
                </VStack>
                <VStack spacing='2.5em' alignItems='flex-start'>
                    <VStack spacing='1.25em' alignItems='flex-start'>
                        <Text fontSize='16pt'>
                            Tutorials
                        </Text>
                        <VStack spacing='1em' alignItems='flex-start'>
                            <Link href='https://www.youtube.com/watch?v=ITEEI2aBfRc' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        How to Generate an NFT Collection
                                    </Text>
                                    <FiExternalLink />
                                </HStack>
                            </Link>
                            <Link href='https://www.youtube.com/watch?v=Scw_NeGu6Sw' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        How to Create a Mint Website
                                    </Text>
                                    <FiExternalLink />
                                </HStack>
                            </Link>
                            <Link href='https://www.youtube.com/watch?v=DhBNDsOjluo' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        Deploy with ThirdWeb and Host with NFT Host
                                    </Text>
                                    <FiExternalLink />
                                </HStack>
                            </Link>
                        </VStack>
                    </VStack>
                    <VStack spacing='1.25em' alignItems='flex-start'>
                        <Text fontSize='16pt'>
                            Socials
                        </Text>
                        <VStack spacing='1em' alignItems='flex-start'>
                            <Link href='https://twitter.com/Steb_01' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        Twitter
                                    </Text>
                                    <FiExternalLink />
                                </HStack>
                            </Link>
                            <Link href='https://discord.gg/u2xXYn7C9T' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        Discord
                                    </Text>
                                    <FiExternalLink />
                                </HStack>
                            </Link>
                        </VStack>
                    </VStack>
                </VStack>
            </Wrap>
        </Flex>
    )
}

export default GetStarted