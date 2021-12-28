import Head from "next/head"

const Header = ({title, keywords}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={keywords} />
        </Head>
    )
}

export default Header