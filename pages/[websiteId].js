import Head from 'next/head'
import { useRouter } from 'next/router'
import { Text, Tag, TagLeftIcon, Link } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUserWebsite } from '@/hooks/services/website/useUserWebsite'
import Navbar from '@/components/services/Website/addons/Navbar'
import Footer from '@/components/services/Website/addons/Footer'
import Template1 from '@/components/services/Website/templates/Template1'
import parse from 'html-react-parser'
import { CgCopyright } from 'react-icons/cg'

const Service = () => {
    const router = useRouter();
    const { userWebsite } = useWebsite();
    const { websiteId } = router.query;
    const { websiteData, isOld } = useUserWebsite(userWebsite?.data);

    return userWebsite && !userWebsite.isExpired && (
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

                {websiteData && (
                    <style>
                        {websiteData?.css}
                    </style>
                )}
            </Head>
            
            {userWebsite?.components?.addons?.indexOf('Navbar') !== -1 && <Navbar />}

            {isOld && <Template1 userWebsite={userWebsite} />}

            {!isOld && parse(websiteData?.html)}

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
                        size='lg'
                    >
                        <TagLeftIcon as={CgCopyright} />
                        <Text>
                            Made by NFTHost.app
                        </Text>
                    </Tag>
                </Link>
            )}

            {userWebsite?.components?.addons?.indexOf('Footer') !== -1 && <Footer />}
        </main>
    )
}

export default Service