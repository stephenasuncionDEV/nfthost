import Head from 'next/head'
import { useRouter } from 'next/router'
import { useColorModeValue, Flex, Text } from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Layout from '@/components/Layout'
import Generator from '@/components/services/Generator'
import Website from '@/components/services/Website'
import Template from '@/components/services/Website/Template'

const Page = () => {
    const router = useRouter();
    const app = router.query.app || [];
    const currentApp = app[app.length === 2 ? 1 : 0]?.toLowerCase();

    const bgColor = useColorModeValue('rgb(236,242,245)', 'rgb(48,56,65)');
    useReAuthenticate();

    return (
        <main style={{ background: bgColor, minHeight: '100vh' }}>
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
            <Layout>
                <Flex justifyContent='space-between' h='3.25em'>
                    <Text fontWeight='bold'>
                        {app.length > 0 && (
                            <>{currentApp === 'getStarted' ? 'GET STARTED' : currentApp?.toUpperCase()}</>
                        )}
                    </Text>
                    <Text>
                        DASHBOARD &gt; {app.join(' > ').toUpperCase()}
                    </Text>
                </Flex>
                {app.length > 0 && (
                    <>
                        {currentApp === 'generator' && <Generator />}
                        {currentApp === 'website' && <Website />}
                    </>
                )}
            </Layout>
        </main>
    )
}

export default Page