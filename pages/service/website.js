import Head from 'next/head'
import { Box, HStack, Text, Flex, Button, VStack, SlideFade } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieModal from '@/components/CookieModal'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useProtectPage } from '@/hooks/useProtectPage'

const Website = () => {
    const { isLoggedIn } = useUser();
    useProtectPage();

    return isLoggedIn && (
        <main>
            <Head>
                <title>Website | NFT Host</title>
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
            <Navbar isWallet />
            <CookieModal />
            <Footer />
        </main>
    )
}

export default Website