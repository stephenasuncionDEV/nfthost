import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import MainNavbar from '@/components/MainNavbar'
import MainFooter from '@/components/MainFooter'
import { AiOutlineWarning } from 'react-icons/ai'

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/getStarted', undefined, { shallow: true });
    }, [])

    return (
        <main style={{ minHeight: '100vh' }}>
            <Head>
                <title>Dashboard | NFT Host</title>
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
            <Flex flexDir='column' minH='100vh'>
                <MainNavbar isColorMode />
                <Flex flexDir='column' justifyContent='center' alignItems='center' w='full' flex='1' mb='4em'>
                    <AiOutlineWarning fontSize='28pt' />
                    <Flex flexDir='column' alignItems='center' mt='.5em'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            Redirect
                        </Text>
                        <Text fontSize='10pt'>
                            Redirecting page to dashboard...
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <MainFooter />
        </main>
    )
}

export default Dashboard