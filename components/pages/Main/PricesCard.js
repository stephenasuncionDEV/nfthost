import { Text, HStack, VStack, Box } from '@chakra-ui/react'
import PricingContainer from "./PricingContainer"
import style from "../../../styles/Main.module.scss"

const PricesCard = ({pricingRef}) => {
    return (
        <HStack 
            spacing='0'
            ref={pricingRef}
            alignItems='flex-start'
            className={style.pricingHorizontalContainer}
        >
            <VStack className={style.pricingHostContainer}>
                <Text fontSize='24pt' className={style.pricingHeaderTitle}>
                    Host
                </Text>
                <Box
                    display='flex'
                    alignItems='flex-start' 
                    className={style.pricingChildContainer}
                >
                    <PricingContainer 
                        data={{
                            title: "Free",
                            titleColor: "rgba(150,150,150,0.5)",
                            price: 0,
                            per: "Lifetime",
                            items: ["1 Website", "Modify Logo", "Modify Title", "Modify Meta Tags", "Modify Description", "ThirdWeb Iframe Embed"]
                        }}
                    />
                    <PricingContainer 
                        data={{
                            title: "Premium",
                            titleColor: "rgba(49,130,206,0.5)",
                            price: 5,
                            per: "Month",
                            items: ["+1 Website", "Website Editor", "Modify Logo", "Modify Title", "Modify Meta Tags", "Modify Description", "ThirdWeb Iframe Embed", "More soon..."]
                        }}
                    />
                </Box>
            </VStack>
            <VStack className={style.pricingHostContainer}>
                <Text fontSize='24pt' className={style.pricingHeaderTitle}>
                    Generator
                </Text>
                <Box
                    display='flex'
                    alignItems='flex-start' 
                    className={style.pricingChildContainer}
                >
                    <PricingContainer 
                        data={{
                            title: "Free",
                            titleColor: "rgba(150,150,150,0.5)",
                            price: 0,
                            per: "Lifetime",
                            items: ["100 Unique Combinations", "No Watermark", "ETH & SOL Metadata", "Image Rarity"]
                        }}
                    />
                    <PricingContainer 
                        data={{
                            title: "Premium",
                            titleColor: "rgba(49,130,206,0.5)",
                            price: 20,
                            per: "Generate",
                            items: ["10000 Unique Combinations", "No Watermark", "ETH & SOL Metadata", "Image Rarity"]
                        }}
                    />
                </Box>
            </VStack>
        </HStack>
    )
}

export default PricesCard