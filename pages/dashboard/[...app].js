import Head from 'next/head'
import { useRouter } from 'next/router'
import { useColorModeValue, Flex, Text, VStack, Box, HStack } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Layout from '@/components/Layout'
import GetStarted from '@/components/GetStarted'
import Generator from '@/components/services/Generator'
import Website from '@/components/services/Website'
import Template from '@/components/services/Website/Template'
import Addons from '@/components/services/Website/Addons'
import Domain from '@/components/services/Website/Domain'
import WebsiteInfo from '@/components/services/Website/WebsiteInfo'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import Partners from '@/components/Partners'
import Payments from '@/components/Payments'
import { MdOutlineAccountCircle } from 'react-icons/md'

const Page = () => {
    const router = useRouter();
    const { isLoggedIn } = useUser();
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
            <Layout currentApp={currentApp}>
                {isLoggedIn ? (
                    <>
                        <Flex justifyContent='space-between' h='4em' alignItems='center' mb='1em'>
                            <Text fontWeight='bold'>
                                {currentApp?.toUpperCase()}
                            </Text>
                            <HStack spacing='2em'>
                                {app[0] === 'website' && <WebsiteInfo />}
                                <Text>
                                    DASHBOARD &gt; {app.join(' > ').toUpperCase()}
                                </Text>
                            </HStack>
                        </Flex>
                        {app.length > 0 && (
                            {
                                getstarted: <GetStarted />,
                                generator: <Generator />,
                                website: <Website />,
                                templates:  <Template />,
                                addons: <Addons />,
                                domain: <Domain />,
                                payments: <Payments />,
                                partners: <Partners />
                            }[currentApp]
                        )}
                    </>
                ) : (
                    <VStack flex='1'>
                        <Flex flexDir='column' justifyContent='center' alignItems='center' flex='1'>
                            <MdOutlineAccountCircle fontSize='28pt' />
                            <Flex flexDir='column' alignItems='center' mt='.5em'>
                                <Text fontWeight='bold' fontSize='10pt'>
                                    Connect
                                </Text>
                                <Text fontSize='10pt'>
                                    Connect your wallet, to unlock dashboard.
                                </Text>
                            </Flex>
                            <Box bg='rgb(52,140,212)' p='.25em' borderRadius='10px' mt='1em'>
                                <ConnectWalletTag />
                            </Box>
                        </Flex>
                    </VStack>
                )}
            </Layout>
        </main>
    )
}

export default Page