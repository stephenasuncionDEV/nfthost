import Head from 'next/head'
import { HStack, Text, Flex, Button, VStack, SlideFade, Link, useColorModeValue} from '@chakra-ui/react'
import { useLanding } from '@/hooks/useLanding'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceModal from '@/components/ServiceModal'
import CookieModal from '@/components/CookieModal'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import { AiOutlineArrowRight } from 'react-icons/ai'
import style from '@/styles/Main.module.scss'

const Main = () => {
    const { GetStarted, NavigateFeature } = useLanding();
    useReAuthenticate();
    
    const bgColor = useColorModeValue('linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(249,250,250,1) 100%)', 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(17,21,28,1) 100%)');
    const srcColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');

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
            <Navbar 
                isSocial 
                isColorMode
                isWallet
            />
            <ServiceModal />
            <CookieModal />
            <Flex 
                w='full' 
                p='2em'
                justifyContent='center'
                mb='8em'
            >
                <Flex
                    id='connect'
                    flexDir='column'
                    maxW='1200px'
                    w='full'
                >
                    <SlideFade in={true} offsetY='20px' delay={.45}>
                        <Flex flexDir='column' alignItems='center' justifyContent='center' h='700px'>
                            <Text variant='header_1' fontSize='52pt' textAlign='center'>
                                Generate and Host your
                            </Text>
                            <Text className={style.gradientBlue} fontSize='42pt' fontWeight='bold'>
                                NFT Collection
                            </Text>
                            <Text fontSize='13pt' fontWeight='hairline' my='1em'>
                                Create and Show your NFT collection in under a minute!
                            </Text>
                            <ConnectWalletTag />
                            <Button mt='1em' w='150px' onClick={GetStarted}>
                                Get Started 🎉
                            </Button>
                        </Flex>
                    </SlideFade>
                    <SlideFade in={true} offsetY='20px' delay={1}>
                        <HStack spacing='4em' justifyContent='space-between' flexWrap='wrap'>
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
                                <Text variant='content_description' mt='1.25rem'>
                                    We provide the fastest and cheapest NFT generator in the market. With $25, you can generate up to 10,000 unique NFTs.
                                </Text>
                                <Button w='200px' mt='1em' rightIcon={<AiOutlineArrowRight />} onClick={() => NavigateFeature('/service/generator')}>
                                    Generate NFTs
                                </Button>
                            </Flex>
                            <VStack>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/54MAbT-yiAY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <Link href='https://www.youtube.com/watch?v=54MAbT-yiAY' isExternal>
                                    <Text color={srcColor} fontSize='9pt' fontStyle='italic'>
                                        source: https://www.youtube.com/watch?v=54MAbT-yiAY
                                    </Text>
                                </Link>
                            </VStack>
                        </HStack>
                    </SlideFade>
                    <SlideFade in={true} offsetY='20px' delay={1}>
                        <HStack spacing='4em' mt='20em' justifyContent='space-between' flexWrap='wrap'>
                            <VStack>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/GW8nvbWBYKM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <Link href='https://www.youtube.com/watch?v=GW8nvbWBYKM' isExternal>
                                    <Text color={srcColor} fontSize='9pt' fontStyle='italic'>
                                        source: https://www.youtube.com/watch?v=GW8nvbWBYKM
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
                                <Text variant='content_description' mt='1.25rem'>
                                    Sell your NFTs in under a minute. Create a minting website by a click of a button. You can host your own minting website for free. Unlock special features by upgrading to premium for $15
                                </Text>
                                <Button w='200px' mt='1em' rightIcon={<AiOutlineArrowRight />} onClick={() => NavigateFeature('/service/website')}>
                                    Host Mint Website
                                </Button>
                            </Flex>
                        </HStack>
                    </SlideFade>
                </Flex>
            </Flex>
            <Footer />
        </main>
    )
}

export default Main