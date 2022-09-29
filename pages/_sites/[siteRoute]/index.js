import NextLink from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Text, Flex, Button, VStack, SlideFade, Link, useColorModeValue, 
    Wrap, Image, Tag, HStack, useColorMode, Center, Spinner
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import { usePaymentControls } from '@/hooks/usePaymentControls'
import Template1 from '@/components/services/Website/SiteTemplates/Template1'
import Template2 from '@/components/services/Website/SiteTemplates/Template2'
import Template3 from '@/components/services/Website/SiteTemplates/Template3'
import Template4 from '@/components/services/Website/SiteTemplates/Template4'
import Template5 from '@/components/services/Website/SiteTemplates/Template5'
import Template6 from '@/components/services/Website/SiteTemplates/Template6'
import Template7 from '@/components/services/Website/SiteTemplates/Template7'
import posthog from 'posthog-js'
import parse from 'html-react-parser'
import config from '@/config/index'
import axios from 'axios'

const UserWebsite = (props) => {
    const router = useRouter();
    const { userWebsite, setUserWebsite } = useWebsite();
    const { 
        userWebsiteErrors,
        checkSubscription
    } = useWebsiteControls();

    useEffect(() => {
        setUserWebsite(props);
    }, [])

    useEffect(() => {
        if (!userWebsite) return;
        checkSubscription();
    }, [userWebsite])

    const { colorMode } = useColorMode();

    if (router.isFallback) {
        return (
            <Center style={{ minHeight: '100vh' }}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='rgb(117,63,229)'
                    size='lg'
                />
            </Center>
        )
    }

    return (
        <>
            {userWebsite ? (
                <div>
                    <Head>
                        <title>{userWebsite?.components?.title}</title>
                        <link rel="shortcut icon" type="image/png" href={userWebsite?.meta?.favicon} />
                        <meta name="title" content={userWebsite?.components?.title} />
                        <meta name="description" content={userWebsite?.components?.description} />
                        <meta name="keywords" content={`nfthost, ${userWebsite?.components?.title}`} />
                        <meta name="robots" content={userWebsite?.meta?.robot} />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="language" content={userWebsite?.meta?.language} />

                        <meta property="og:type" content='website' />
                        <meta property="og:url" content={`https://${userWebsite?.route}.${config.frontendUrl}`} />
                        <meta property="og:title" content='NFT Host' />
                        <meta property="og:description" content={userWebsite?.components?.description} />
                        <meta property="og:image" content={userWebsite?.components?.unrevealedImage} />

                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content={`https://${userWebsite?.route}.${config.frontendUrl}`} />
                        <meta property="twitter:title" content={userWebsite?.components?.title} />
                        <meta property="twitter:description" content={userWebsite?.components?.description} />
                        <meta property="twitter:image" content={userWebsite?.components?.unrevealedImage} />

                        {userWebsite?.components?.script && parse(userWebsite?.components?.script)}
                    </Head>
                    <main>
                        {userWebsite?.components?.template === 'Template1' && (
                            <Template1 />
                        )}
                        {userWebsite?.components?.template === 'Template2' && (
                            <Template2 />
                        )}
                        {userWebsite?.components?.template === 'Template3' && (
                            <Template3 />
                        )}
                        {userWebsite?.components?.template === 'Template4' && (
                            <Template4 />
                        )}
                        {userWebsite?.components?.template === 'Template5' && (
                            <Template5 />
                        )}
                        {userWebsite?.components?.template === 'Template6' && (
                            <Template6 />
                        )}
                        {userWebsite?.components?.template === 'Template7' && (
                            <Template7 />
                        )}
                    </main>
                </div>
            ) : (
                <Center style={{ minHeight: '100vh' }}>
                    {userWebsiteErrors?.length > 0 ? (
                        <VStack spacing='1em'>
                            <NextLink href='/' shallow passHref>
                                <HStack spacing='1em' cursor='pointer'>
                                    <Image src={colorMode === 'dark' ? '/assets/logo_full_white.png' : '/assets/logo_full_black.png'} alt='NFT Host Logo' width='170px' />
                                </HStack>
                            </NextLink>
                            <VStack>
                                {userWebsiteErrors?.map((err, idx) => (
                                    <Text key={idx} fontSize='10pt'>
                                        {err}
                                    </Text>
                                ))}
                            </VStack>
                        </VStack>
                    ) : (
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='rgb(117,63,229)'
                            size='lg'
                        />
                    )}
                </Center>
            )}
        </>
    )
}

export const getStaticPaths = async () => {
    const mappedSubdomains = await axios.get(`${config.serverUrl}/api/website/getMappedSubdomains`, {
        headers: {
            Authorization: `bearer ${process.env.CREATE_WEBSITE_TOKEN}`
        }
    });

    return {
        paths: mappedSubdomains.data,
        fallback: true,
    }
}

export const getStaticProps = async ({ params: { siteRoute } }) => {
    const site = await axios.get(`${config.serverUrl}/api/website/getWebsiteByRoute`, {
        params: {
            route: siteRoute
        },
        headers: {
            Authorization: `bearer ${process.env.CREATE_WEBSITE_TOKEN}`
        }
    });

    return {
        props: site.data,
        revalidate: 30
    }
  }

export default UserWebsite