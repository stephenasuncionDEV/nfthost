import { useState, useEffect } from "react";
import { useToast, Box, Text, Icon } from '@chakra-ui/react'
import { FaChevronDown } from "react-icons/fa"
import axios from "axios";
import MintContainer from "../../MintContainer";
import LogsContainer from "./LogsContainer"
import Log from "./Log"
import style from "../../../styles/Home.module.scss"

const Home = () => {
    const [logsData, setLogsData] = useState([]);
    const alert = useToast();

    useEffect(() => {
        axios.get("https://nfthost.vercel.app/api/webhook/get")
        .then(res => {
            setLogsData(res.data);
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }, [])

    return (
        <>
            <div className="main-pane">
                <Box
                    display='flex'
                    flexDir='column'
                    h='full'
                    alignItems='center'
                    mt='6'
                >
                    <Box 
                        maxWidth='1200px' 
                        width='100%'>
                        <Text fontSize='28pt'>Home 🏠</Text>
                    </Box>
                    <LogsContainer>
                        {logsData.map((log, idx) => (
                            <Log {...log} key={idx} />
                        ))}
                    </LogsContainer>
                    <div className={style.previewHeader}>
                        <Text fontSize='16pt'>
                            Check out our new collection
                        </Text>
                        <Icon as={FaChevronDown}/>
                    </div>
                </Box>
                <Box
                    w='full'
                    display='flex'
                    flexDir='column'
                    alignItems='center'
                    mt='8em'
                    mb='4em'
                >
                    <img src="/logo.png" alt="NFT Host Logo" width='20%'/>
                    <Text fontSize='32pt'>
                        Kalabaw NFT
                    </Text>
                    <Text fontSize='14pt'>
                        Kalabaw NFT is a collection of 200 unique carabaos/water buffalos NFTs.
                    </Text>
                    <MintContainer 
                        iframe='<iframe
                            src="https://cloudflare-ipfs.com/ipfs/bafybeigpfbnasq3sbciukilnculoy3cd24ov5mshzmuw7gregexdy223be?contract=0xce240737302120e7C61334fFec8DF254B7003703&chainId=4"
                            width="500px"
                            height="500px"
                            style="max-width:100%;"
                            frameborder="0"
                        />'
                    />
                </Box>
            </div>
        </>
    )
}

export default Home