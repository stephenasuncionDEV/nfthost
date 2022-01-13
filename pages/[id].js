import { useState, useEffect, } from "react"
import { Box, Text, Button, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import Header from '../components/Header'
import parse from 'html-react-parser';

const Website = () => {
    const [websiteData, setWebsiteData] = useState(null);
    const { Moralis } = useMoralis();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id == null) return;
        const websiteClass = Moralis.Object.extend("Website");
        const query = new Moralis.Query(websiteClass);
        query.equalTo("url", `https://www.nfthost.app/${id}`);
        query.first()
        .then(res => {
            const expiryDate = res.attributes.expiresAt;
            const curDate = new Date();
            if (curDate.getTime() >= expiryDate.getTime()) throw new Error("Website Hosting Expired. If you are the owner, please renew your website.");

            setWebsiteData(res.attributes);
        })
        .catch(err => {
            console.error(err.message);
            location.href = "https://www.nfthost.app/";
        });
    }, [id])

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
                        robots={websiteData.allowIndex}
                        language={websiteData.language}
                        image={websiteData.image}
                    />
                    {websiteData.body ? (
                        <Box>
                            <style>
                                {parse(websiteData.body.css)}
                            </style>
                            {parse(websiteData.body.html)}
                        </Box>
                    ) : (
                        <Center h='100vh' flexDir='column'>
                            <Text fontSize='32pt' textAlign='center'>Hello 👋,</Text>
                            <Text fontSize='14pt' textAlign='center'>{websiteData.title}</Text>
                            <Text textAlign='center'>If you are the owner, please update your website using the website editor.</Text>
                            <Text mt='4' textAlign='center'>- NFT Host</Text>
                        </Center>
                    )}
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