import NextLink from 'next/link'
import Head from 'next/head'
import { Text, Flex, Button } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const NotFound = () => {

    return (
        <main>
            <Head>
                <title>404 | NFT Host</title>
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
                alignItems='center'
                mb='8em'
                flexDir='column'
            >
                <Text variant='header_1' mt='1.5em'>
                    404
                </Text>
                <Text variant='header_2'>
                    Page Not Found
                </Text>
                <Text variant='content_subtitle'>
                    The page you are trying to access is not found.
                </Text>
                <NextLink href='/' shallow passHref>
                    <Button mt='3em' leftIcon={<AiOutlineArrowLeft />}>
                        Landing Page
                    </Button>
                </NextLink>
            </Flex>
            <Footer />
        </main>
    )
}

export default NotFound