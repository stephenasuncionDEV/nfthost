import Head from 'next/head'

const Meta = ({ title }) => {
    return <Head>
        <title>{title}</title>
        <link rel="shortcut icon" type="image/png" href='https://www.nfthost.app/favicon.ico' />
        <meta name="title" content='NFT Host' />
        <meta name="description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website. Metadata utilities available for post-generation.' />
        <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
        <meta name="robots" content='index, follow' />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content='en' />
        <meta name="theme-color" content="#753FE5" />
        
        <meta property="og:type" content='website' />
        <meta property="og:url" content='https://www.nfthost.app/' />
        <meta property="og:title" content='NFT Host - Generate &#38; Host your NFT Collection' />
        <meta property="og:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website. Metadata utilities available for post-generation.' />
        <meta property="og:image" content='https://www.nfthost.app/assets/logo.png' />
        <meta property="og:site_name" content='NFT Host' />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content='https://www.nfthost.app/' />
        <meta property="twitter:title" content='NFT Host - Generate &#38; Host your NFT Collection' />
        <meta property="twitter:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website. Metadata utilities available for post-generation.' />
        <meta property="twitter:image" content='https://www.nfthost.app/assets/logo.png' />
    </Head>
}

export default Meta