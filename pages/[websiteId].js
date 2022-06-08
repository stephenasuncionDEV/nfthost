import Head from 'next/head'
import { useRouter } from 'next/router'
import { Text, Flex, Tag, TagLeftIcon, Link } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUserWebsite } from '@/hooks/useUserWebsite'
import CookieModal from '@/components/CookieModal'
import parse from 'html-react-parser'
import { CgCopyright } from 'react-icons/cg'
import Template1 from '@/components/services/Website/templates/Template1'
import Template2 from '@/components/services/Website/templates/Template2'

const Service = () => {
    const router = useRouter();
    const { userWebsite } = useWebsite();
    const { websiteId } = router.query;
    const { data } = useUserWebsite(userWebsite?.data);

    return userWebsite && !userWebsite?.isExpired && (
        <main>
            <Head>
                <title>{userWebsite?.components?.title}</title>
                <link rel="shortcut icon" type="image/png" href={userWebsite?.meta?.favicon} />
                <meta name="title" content={userWebsite?.components?.title} />
                <meta name="description" content={userWebsite?.components?.description} />
                <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
                <meta name="robots" content={userWebsite?.meta?.robot} />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content={userWebsite?.meta?.language} />

                <meta property="og:type" content='website' />
                <meta property="og:url" content={`https://www.nfthost.app/${websiteId}`} />
                <meta property="og:title" content='NFT Host' />
                <meta property="og:description" content={userWebsite?.components?.description} />
                <meta property="og:image" content={userWebsite?.components?.unrevealedImage} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://www.nfthost.app/${websiteId}`} />
                <meta property="twitter:title" content={userWebsite?.components?.title} />
                <meta property="twitter:description" content={userWebsite?.components?.description} />
                <meta property="twitter:image" content={userWebsite?.components?.unrevealedImage} />

                {userWebsite?.components?.script && parse(userWebsite?.components?.script)}
            </Head>
            <CookieModal />
            
            {data?.template === 'Template1' && <Template1 userWebsite={userWebsite} />}
            {data?.template === 'Template2' && <Template2 userWebsite={userWebsite} />}

            {!userWebsite?.isPremium && (
                <Link href='https://www.nfthost.app/' isExternal>
                    <Tag 
                        opacity='.25'
                        position='absolute'
                        bottom='2'
                        right='2'
                        cursor='pointer'
                        _hover={{
                            opacity: '.75'
                        }}
                    >
                        <TagLeftIcon as={CgCopyright} />
                        <Text>
                            Hosted by NFTHost.app
                        </Text>
                    </Tag>
                </Link>
            )}
        </main>
    )
}

export default Service