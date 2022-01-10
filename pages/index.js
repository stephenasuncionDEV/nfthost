import { Box, Text } from '@chakra-ui/react'
import MenuBar from "../components/pages/Main/MenuBar"
import IntroContainer from "../components/pages/Main/IntroContainer"
import FeatureContainer from "../components/pages/Main/FeatureContainer"
import PricesCard from "../components/pages/Main/PricesCard"
import Header from "../components/Header"
import style from '../styles/Main.module.scss'

const Main = () => {
    return (
        <Box>
            <Header 
                title="NFT Host"
                description="NFT Host is a website where you can generate and host NFT collections. Upload your NFT collection and share it with anyone!!!"
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                robots={true}
                language="English"
                image="/logo.png"
            />
            <MenuBar />
            <Box className={style.introMainContainer}>
                <IntroContainer />
            </Box>
            <Box id="features" className={style.featuresContainer}>
                <Box className={style.featureVertical}>
                    <Text className={style.featureHeader}>Features</Text>
                    <Box className={style.featuresSubContainer}>
                        <FeatureContainer icon={0} features={["Modify Logo", "Modify Title", "Modify Meta Tags", "Modify Description", "ThirdWeb Iframe Embed"]} />
                        <FeatureContainer icon={1} features={["No Watermark", "Unlimited Layers", "ETH & SOL Metadata", "Unique Combinations", "Change Rarity of Images"]} />
                    </Box>
                </Box>
            </Box>
            <Box id="pricing" className={style.pricingContainer}>
                <Box className={style.pricingVertical}>
                    <Text className={style.pricingHeader}>Pricing</Text>
                </Box>
                <Box className={style.pricingSubContainer}>
                    <PricesCard />
                </Box>
            </Box>
        </Box>
    )
}

export default Main