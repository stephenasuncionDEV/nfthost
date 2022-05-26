import Head from 'next/head'
import { Box, HStack, Text, Flex, Button, VStack } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import style from '@/styles/Main.module.scss'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Main = () => {
    return (
        <main>
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
                <meta property="og:image" content='https://www.nfthost.app/logo.png' />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content='https://www.nfthost.app/' />
                <meta property="twitter:title" content='NFT Host' />
                <meta property="twitter:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="twitter:image" content='https://www.nfthost.app/logo.png' />
            </Head>
            <Navbar />
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
                    <Flex flexDir='column' alignItems='center' justifyContent='center' h='700px'>
                        <Text fontSize='42pt' lineHeight='42pt' variant='content_title'>
                            Generate and Host your
                        </Text>
                        <Text className={style.gradientBlue} fontSize='42pt' fontWeight='bold'>
                            NFT Collection
                        </Text>
                        <Text fontSize='13pt' fontWeight='hairline' mt='1em'>
                            Create and Show your NFT collection in under a minute!
                        </Text>
                        <Button mt='1em' w='150px'>
                            Get Started 🎉
                        </Button>
                    </Flex>
                    <HStack spacing='4em' justifyContent='space-between'>
                        <Flex flexDir='column' maxW='550px'>
                            <Text variant='content_intro'>
                                The new way of generating NFTs
                            </Text>
                            <Text variant='content_title' mt='0.25rem'>
                                NFT Generator
                            </Text>
                            <Text variant='content_description' mt='1.25rem'>
                                We provide the fastest and cheapest NFT generator in the market.
                            </Text>
                            <Button w='200px' mt='1em' rightIcon={<AiOutlineArrowRight />}>
                                Generate NFTs
                            </Button>
                        </Flex>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/54MAbT-yiAY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </HStack>
                    <HStack spacing='4em' mt='10em' justifyContent='space-between'>
                        <Flex flexDir='column' maxW='550px'>
                            <Text variant='content_intro'>
                                Easily create minting website
                            </Text>
                            <Text variant='content_title' mt='0.25rem'>
                                NFT Host
                            </Text>
                            <Text variant='content_description' mt='1.25rem'>
                                Sell your NFTs in under a minute. Create a minting website by a click of a button.
                            </Text>
                            <Button w='200px' mt='1em' rightIcon={<AiOutlineArrowRight />}>
                                Host Mint Website
                            </Button>
                        </Flex>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/GW8nvbWBYKM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </HStack>
                </Flex>
            </Flex>
            <Footer />
        </main>
    )
}

export default Main