import { useState, useEffect, } from "react"
import { useToast, Box, Text, Image, Button, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import { FaChevronDown } from "react-icons/fa"
import MintContainer from '../components/MintContainer'
import Header from '../components/Header'
import style from "../styles/Home.module.scss"

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
            setWebsiteData(res.attributes);
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
                    <Box
                        h='100vh'
                    >
                        <Box
                            h='full'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                        >
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
                            <Box 
                                mt='3em'
                                className={style.previewHeader}
                            >
                                <Text fontSize='16pt'>
                                    Check out the collection
                                </Text>
                                <Icon as={FaChevronDown}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        h='100vh'   
                        bg='rgb(180, 180, 180)'
                    >
                        <Box
                            h='full'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <MintContainer
                                iframe={websiteData.iframe}
                            />
                            <Box 
                                mt='2em'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Text
                                    color='rgb(120, 120, 120)'
                                >
                                    NFT Collection Hosted By
                                </Text>
                                <Button
                                    mt='2'
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
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Website