import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import MenuBar from "../components/pages/Main/MenuBar"
import IntroContainer from "../components/pages/Main/IntroContainer"
import FeatureContainer from "../components/pages/Main/FeatureContainer"
import PricesCard from "../components/pages/Main/PricesCard"
import Header from "../components/Header"
import style from '../styles/Main.module.scss'

const Main = () => {
    const bg = useColorModeValue('linear-gradient(rgb(240, 251, 255), white)', 'rgb(0, 0, 0)');
    const bg2 = useColorModeValue('rgb(255, 255, 255)', 'rgb(0, 0, 0)');

    return (
        <Box>
            <Header 
                title="NFT Host"
                description="NFT Host is a website where you can generate NFT collections and create NFT minting website."
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                robots={true}
                language="English"
                image="/logo.png"
            />
            <Box
                bg={bg}
                display='flex'
                flexDir='column'
                height='100vh'
            >
                <MenuBar />
                <IntroContainer />
            </Box>
            <Box 
                id="features" 
                className={style.featuresContainer}
                bg={bg2}
            >
                <Box className={style.featureVertical}>
                    <Text className={style.featureHeader}>Features</Text>
                    <Box className={style.featuresSubContainer}>
                        <FeatureContainer icon={0} features={["Website Editor", "Modify Logo", "Modify Title", "Modify Meta Tags", "Modify Description", "ThirdWeb Iframe Embed"]} />
                        <FeatureContainer icon={1} features={["No Watermark", "Unlimited Layers", "ETH & SOL Metadata", "Unique Combinations", "Change Rarity of Images"]} />
                    </Box>
                </Box>
            </Box>
            <Box 
                id="pricing" 
                className={style.pricingContainer}
                bg={bg2}
            >
                <Box className={style.pricingVertical}>
                    <Text className={style.pricingHeader}>Pricing</Text>
                    <Text className={style.pricingSubHeader}>If you want subscription deals please message us through Discord.</Text>
                </Box>
                <Box className={style.pricingSubContainer}>
                    <PricesCard />
                </Box>
            </Box>
        </Box>
    )
}

export default Main