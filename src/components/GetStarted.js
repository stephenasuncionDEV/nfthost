import NextLink from 'next/link'
import { Flex, Wrap, Button, Text, useColorModeValue, VStack, HStack, Link, Tag, Box, Image } from '@chakra-ui/react'
import { useGetStarted } from '@/hooks/useGetStarted'
import { AiOutlineRight } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import { GiCutDiamond } from 'react-icons/gi'
import { getStartedServicesArr } from '@/utils/json'
import config from '@/config/index'

const GetStarted = () => {
    const { featuredWebsites } = useGetStarted();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

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
                                <Button variant='primary' rightIcon={<AiOutlineRight />} maxW='140px' w='full' justifyContent='space-evenly' size='sm'>
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
                            <Link href='https://www.youtube.com/watch?v=6R10ZTsLIeM' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        How to Modify my json Metadata
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
                            <Link href='https://www.producthunt.com/posts/nft-host' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        Product Hunt
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
                            <Link href='https://twitter.com/Steb_01' isExternal>
                                <HStack>
                                    <Text fontSize='10pt'>
                                        Twitter
                                    </Text>
                                    <FiExternalLink />
                                </HStack>
                            </Link>
                        </VStack>
                    </VStack>
                </VStack>
            </Wrap>
            <Flex flexDir='column' mt='3em'>
                <Text fontWeight='bold' fontSize='22pt'>
                    Support Us
                </Text>
                <Text fontSize='10pt'>
                    If you want to support us, buy me a coffee or upvote NFT Host on Product Hunt.
                </Text>
                <Box mt='2em'>
                    <a href="https://www.buymeacoffee.com/stephenasuncion" target="_blank"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=stephenasuncion&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" /></a>
                </Box>
                <Box mt='1em'>
                    <a href="https://www.producthunt.com/posts/nft-host?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nft&#0045;host" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=326763&theme=dark" alt="NFT&#0032;Host - Generate&#0032;and&#0032;Host&#0032;your&#0032;NFT&#0032;Collection&#0032;in&#0032;under&#0032;10&#0032;minutes | Product Hunt" style={{width: '235px', height: '50px'}} width="235" height="50" /></a>
                </Box>
            </Flex>
            <Text fontWeight='bold' fontSize='22pt' mt='2em'>
                Featured Websites
            </Text>
            <Text fontSize='10pt'>
                Top 5 Visited Mint Websites created with NFT Host. Not in particular order.
            </Text>
            <Wrap spacing='1em' mt='2em'>
                {featuredWebsites?.map((website, idx) => (
                    <Link href={`${config?.frontendUrl}/${website.custom?.alias.length > 0 ? website.custom?.alias : website._id}`} isExternal key={idx} style={{ textDecoration: 'none' }} position='relative'>
                        <Button 
                            opacity='0.3'
                            w='250px' 
                            h='60px' 
                            bgImage={website.components.unrevealedImage} 
                            backgroundPosition='center'
                            _hover={{
                                opacity: 1
                            }}
                            leftIcon={website.isPremium ? <GiCutDiamond color='blue.500' /> : null}
                        >
                            {website.components.title}
                        </Button>
                        <Box position='absolute' top='0' pointerEvents='none'>
                            <Image src={website.isPremium ? '/assets/featured-premium.png' : '/assets/featured-free.png'} alt='Featured Website' />
                        </Box>
                    </Link>
                ))}
            </Wrap>
        </Flex>
    )
}

export default GetStarted