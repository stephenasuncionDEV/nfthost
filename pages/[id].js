import { useState, useEffect, } from "react"
import { useToast, Box, Text, Image, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import MintContainer from '../components/MintContainer'
import Header from '../components/Header'

const Website = () => {
    const [websiteData, setWebsiteData] = useState(null);
    const { Moralis } = useMoralis();
    const router = useRouter();
    const alert = useToast();
    const { id } = router.query;

    useEffect(() => {
        if (id == null) return;
        const websiteClass = Moralis.Object.extend("Website");
        const query = new Moralis.Query(websiteClass);
        query.equalTo("url", `https://nfthost.vercel.app/${id}`);
        query.first()
        .then(res => {
            setWebsiteData(res.attributes);
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }, [router])

    const handleNFTHost = () => {
        window.open("https://nfthost.vercel.app/");
    }

    return (
        <Box
            display='flex'
            flexDir='column'
            justifyContent='center'
            alignItems='center'
        >
            {websiteData && (
                <>
                    <Header
                        title={websiteData.header}
                        description={websiteData.description}
                        keywords={websiteData.keywords}
                        robots={websiteData.isRobot}
                        language={websiteData.language}
                        image={websiteData.image}
                    />
                    <Image 
                        boxSize='280px'
                        objectFit='scale-down'
                        src={websiteData.image} 
                        alt={websiteData.title} 
                        fallbackSrc='https://via.placeholder.com/270'
                    />
                    <Text fontSize='32pt'>
                        {websiteData.title}
                    </Text>
                    <Text fontSize='14pt'>
                        {websiteData.description}
                    </Text>
                    <MintContainer
                        iframe={websiteData.iframe}
                    />
                    <Box 
                        display='flex'
                        flexDir='column'
                        mt='10em'
                        mb='5em'
                        w='full'
                        alignItems='center'
                    >
                        <Text
                            color='rgb(120, 120, 120)'
                        >
                            NFT Collection Hosted By
                        </Text>
                        <Button
                            w='100px'
                            variant='solid'
                            colorScheme='gray'
                            color='rgb(120, 120, 120)'
                            onClick={handleNFTHost}
                        >
                            NFT Host
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Website