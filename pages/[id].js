import { useState, useEffect, } from "react"
import { useToast, Box, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import Header from '../components/Header'
import parse from 'html-react-parser';

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
        query.equalTo("url", `https://www.nfthost.app/${id}`);
        query.first()
        .then(res => {
            const data = res.attributes;
            if (data.body == null) throw new Error("Must save changes to website");
            setWebsiteData(data);
        })
        .catch(err => {
            location.href = "https://www.nfthost.app/";
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }, [router])

    useEffect(() => {
        if(websiteData == null) return;
        console.log(websiteData.body)
    }, [websiteData])

    const handleNFTHost = () => {
        window.open("https://www.nfthost.app/");
    }

    return (
        <>
            {websiteData && (
                <Box>
                    <Header
                        title={websiteData.header}
                        description={websiteData.description}
                        keywords={websiteData.keywords}
                        robots={websiteData.isRobot}
                        language={websiteData.language}
                        image={websiteData.image}
                    />
                    <style>
                        {parse(websiteData.body.css)}
                    </style>
                    {parse(websiteData.body.html)}
                    <Box 
                        display='flex'
                        flexDir='column'
                        w='full'
                        alignItems='center'
                        p='2em'
                    >
                        <Text color='rgb(120, 120, 120)'>
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
                </Box>
            )}
        </>
    )
}

export default Website