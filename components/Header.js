import Head from "next/head"

const Header = ({title, description, keywords, robots, language, image}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots ? "index, follow" : "noindex, follow"} />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content={language} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.nfthost.app/" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.nfthost.app/" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Head>
    )
}

export default Header