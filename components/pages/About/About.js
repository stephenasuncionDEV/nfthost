import { Box, Text, Avatar } from '@chakra-ui/react'
import style from "../../../styles/Container.module.scss"

const About = () => {

    // Go to my github profile in new tab
    const onGithub = () => {
        window.open("https://github.com/stephenasuncionDEV");
    }
 
    return (
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
                    <Text fontSize='28pt'>About 👨‍🚀</Text>
                </Box>
                <Box 
                    maxWidth='1200px' 
                    width='100%' 
                    bg='white' 
                    borderRadius='5px'
                    mt='6'
                    p='5'
                    className={style.box}
                >
                    <Text fontSize='16pt'>
                        NFT Host
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host is a website where you can host your ERC721 drops and generate your own NFT collections. 
                        Upload your nft collection(s) and share it with anyone. This website is an open-source project. 
                        If you want to contribute, check out <a href="https://github.com/stephenasuncionDEV/nfthost" target="_blank" style={{color: "rgb(66, 135, 245)"}}>NFT Host Github Repository</a>.
                    </Text>
                    <Box
                        display='flex'
                        justifyContent='flex-end'
                        mt='2em'
                    >
                        <Box>
                            <Text fontSize='10pt'>
                                Founded by Stephen Asuncion
                            </Text>
                            <Text fontSize='10pt'>
                                A.K.A. Typedef
                            </Text>
                        </Box>
                        <Avatar 
                            alt="Founder of NFT Host"
                            src="/typedef.jpg"
                            sx={{ ml: 2 }}
                            onClick={onGithub}
                            style={{cursor: "pointer"}}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default About