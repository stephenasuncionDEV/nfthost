import NextLink from 'next/link'
import Head from 'next/head'
import { Text, Flex, Button, VStack, SlideFade, Link, useColorModeValue, Wrap, Image, Tag, HStack } from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import MainNavbar from '@/components/MainNavbar'
import MainFooter from '@/components/MainFooter'
import CookieModal from '@/components/CookieModal'
import Announcement from '@/components/Announcement'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { PartnersArr } from '@/utils/json'
import style from '@/styles/Main.module.scss'
import posthog from 'posthog-js'

const Main = () => {
    useReAuthenticate();
    
    const bgColor = useColorModeValue('linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(249,250,250,1) 100%)', 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(17,21,28,1) 100%)');
    const srcColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
    const sponsorColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.300');
    const isSmallerFont = useMediaQuery({ query: '(max-width: 380px)' });

    return (
        <main style={{ background: bgColor }}>
            <Head>
                <title>NFT Host</title>
                <meta name="title" content='NFT Host' />
                <meta name="description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
                <meta name="robots" content='index, follow' />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content='en' />

                <meta property="og:type" content='website' />
                <meta property="og:url" content='https://www.nfthost.app/' />
                <meta property="og:title" content='NFT Host' />
                <meta property="og:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="og:image" content='https://www.nfthost.app/assets/logo.png' />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content='https://www.nfthost.app/' />
                <meta property="twitter:title" content='NFT Host' />
                <meta property="twitter:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="twitter:image" content='https://www.nfthost.app/assets/logo.png' />
            </Head>
            <MainNavbar 
                isSocial 
                isColorMode
                isLandingPage
            />
            <Announcement />
            <CookieModal />
            <Flex 
                w='full' 
                p='2em'
                justifyContent='center'
                mb='8em'
            >
                <Flex
                    flexDir='column'
                    maxW='1200px'
                    w='full'
                >
                    <SlideFade in={true} offsetY='20px' delay={.45}>
                        <Flex flexDir='column' alignItems='center' justifyContent='center' h='600px'>
                            <Text variant='header_1' fontSize={isSmallerFont ? '32pt' : '52pt'} textAlign='center'>
                                Generate and Host your
                            </Text>
                            <Text className={style.gradientBlue} fontSize={isSmallerFont ? '22pt' : '42pt'} fontWeight='bold'>
                                NFT Collection
                            </Text>
                            <Text fontSize={isSmallerFont ? '10pt' : '13pt'} fontWeight='hairline' my='1em'>
                                Create and Host your NFT collection in under a minute!
                            </Text>
                            <NextLink href='/dashboard/getStarted' shallow passHref>
                                <Button mt='.5em' maxW='180px' size='lg'>
                                    Get Started 🚀
                                </Button>
                            </NextLink>
                        </Flex>
                    </SlideFade>
                    <SlideFade in={true} offsetY='20px' delay={1}>
                        <Flex flexDir='column' alignItems='center' justifyContent='center' mb='4em'>
                            <Text fontSize='13pt' fontWeight='hairline' color={sponsorColor}>
                                SUPPORTED BY
                            </Text>
                            <Wrap spacing='4em' my='1em'>
                                {PartnersArr?.map((partner, idx) => (
                                    <Link href={partner.link} isExternal key={idx}>
                                        <Button 
                                            variant='unstyled' 
                                            display='flex' 
                                            h='full' 
                                            _hover={{ opacity: '1' }} 
                                            opacity='0.3'
                                            onClick={() => posthog?.capture('User visited partner from landing page', { company: partner.company })}
                                        >
                                            <Image src={partner.image} alt={`${partner.company}'s Logo`} width='40px' />
                                        </Button>
                                    </Link>
                                ))}
                            </Wrap>
                        </Flex>
                    </SlideFade>
                    <SlideFade in={true} offsetY='20px' delay={1.5}>
                        <Wrap direction='row' spacing='4em' justifyContent='space-between' id='features' mt='4em'>
                            <Flex flexDir='column' maxW='550px'>
                                <Text variant='content_intro'>
                                    The new way of generating NFTs
                                </Text>
                                <Text variant='content_title' mt='0.25rem'>
                                    NFT Collection
                                </Text>
                                <Text variant='content_title' mt='0.25rem'>
                                    Generator
                                </Text>
                                <HStack mt='.5rem' opacity='0.5'>
                                    <Text fontSize='10pt'>
                                        Price:
                                    </Text>
                                    <Tag>$25</Tag>
                                    <Text fontSize='10pt'>
                                        USD per generation
                                    </Text>
                                </HStack>
                                <Text variant='content_description' mt='1.25rem'>
                                    We provide the fastest NFT generator in the market. You can generate 100 unique images for free. We charge with a fixed price of $25 per generation for collections above 100.
                                </Text>
                                <NextLink href='/dashboard/getStarted' shallow passHref>
                                    <Button w='200px' mt='1em' rightIcon={<AiOutlineArrowRight />}>
                                        Generate NFTs
                                    </Button>
                                </NextLink>
                            </Flex>
                            <VStack>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/54MAbT-yiAY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <Link href='https://www.youtube.com/watch?v=54MAbT-yiAY' isExternal>
                                    <Text color={srcColor} fontSize='9pt' fontStyle='italic'>
                                        source: https://www.youtube.com/watch?v=54MAbT-yiAY
                                    </Text>
                                </Link>
                            </VStack>
                        </Wrap>
                    </SlideFade>
                    <SlideFade in={true} offsetY='20px' delay={1.5}>
                        <Wrap direction='row' spacing='4em' mt='20em' justifyContent='space-between'>
                            <VStack>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/Scw_NeGu6Sw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <Link href='https://www.youtube.com/watch?v=Scw_NeGu6Sw' isExternal>
                                    <Text color={srcColor} fontSize='9pt' fontStyle='italic'>
                                        source: https://www.youtube.com/watch?v=Scw_NeGu6Sw
                                    </Text>
                                </Link>
                            </VStack>
                            <Flex flexDir='column' maxW='550px'>
                                <Text variant='content_intro'>
                                    Easily create minting website
                                </Text>
                                <Text variant='content_title' mt='0.25rem'>
                                    Mint Website
                                </Text>
                                <Text variant='content_title' mt='0.25rem'>
                                    Hosting
                                </Text>
                                <HStack mt='.5rem' opacity='0.5'>
                                    <Text fontSize='10pt'>
                                        Price:
                                    </Text>
                                    <Tag>Free or $15</Tag>
                                    <Text fontSize='10pt'>
                                        USD per month
                                    </Text>
                                </HStack>
                                <Text variant='content_description' mt='1.25rem'>
                                    Create a minting website by a click of a button. You can host your own minting website for free. Features including prebuilt templates, addons, domain, and more. Unlock special features by upgrading to premium for $15 USD.
                                </Text>
                                <NextLink href='/dashboard/getStarted' shallow passHref>
                                    <Button w='200px' mt='1em' rightIcon={<AiOutlineArrowRight />}>
                                        Host Mint Website
                                    </Button>
                                </NextLink>
                            </Flex>
                        </Wrap>
                    </SlideFade>
                </Flex>
            </Flex>
            <MainFooter />
        </main>
    )
}

export default Main