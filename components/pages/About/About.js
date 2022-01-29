import { Box, Text, Avatar, useColorModeValue } from '@chakra-ui/react'
import style from "../../../styles/Container.module.scss"

const About = () => {
    const bg = useColorModeValue('rgb(255, 255, 255)', 'rgb(33, 37, 41)');
    const containerColor = useColorModeValue('rgb(255, 255, 255)', 'rgb(50, 55, 67)');

    // Go to my github profile in new tab
    const onGithub = () => {
        window.open("https://github.com/stephenasuncionDEV");
    }
 
    return (
        <div className="main-pane" style={{ backgroundColor: bg }}>
            <Box
                display='flex'
                flexDir='column'
                h='full'
                alignItems='center'
                mt='6'
            >
                <Box 
                    maxW='1200px' 
                    w='100%'>
                    <Text fontSize='28pt'>About</Text>
                </Box>
                <Box 
                    maxW='1200px' 
                    w='100%' 
                    bg={containerColor} 
                    borderRadius='5px'
                    mt='6'
                    p='5'
                >
                    <Text fontSize='16pt'>
                        NFT Host
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host is a website where you can host your ERC721 drops and generate your own NFT collections. 
                        Upload your nft collection(s) and share it with anyone. This website is an open-source project. 
                        If you want to contribute, check out <a href="https://github.com/stephenasuncionDEV/nfthost" target="_blank" style={{color: "rgb(66, 135, 245)"}}>NFT Host Github Repository</a>.
                    </Text>
                    <Text mt='12' fontSize='16pt'>
                        Privacy Policy
                    </Text>
                    <Text fontSize='10pt'>
                        One of our top goals at NFT Host is the privacy of our users. This document outlines the sorts of information that NFT Host 
                        collects and records, as well as how we use it. By using our website, you consent to and agree to the terms of our Privacy Policy.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Information we collect
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host only collects your wallet address.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        How we use your information
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host uses your wallet address for login, make purchases, and as an id to save data (like websites, if you hosted your nft collection).
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Third Party Privacy Policies
                    </Text>
                    <Text fontSize='10pt'>
                        Other sponsors or websites are not covered by NFT Host's Privacy Policy. As a result, we recommend that you read the Privacy Policies of 
                        these third-party ad servers for more information. It could provide information about their policies as well as directions on how to opt 
                        out of particular alternatives.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Children's Information
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host does not intentionally collect Personal Identifiable Information from minors under the age of thirteen. 
                        If you believe your child provided this kind of information on our website, we strongly encourage you to notify us 
                        immediately so that we can erase such information from our database.
                    </Text>
                    <Text mt='12' fontSize='16pt'>
                        Terms of Service
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host is a website where you can host and generate NFT Collections. 
                        By logging in to this website, you are agreeing to conform to these Terms of Service. With that being said, please read our terms carefully. 
                        Once a user make a purchase, they will not be able to ask for a refund. All purchases are final.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Site Terms of Use Modificaitons
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host reserves the right to change these Terms of Service at any time and without notice. You agree to be governed by the 
                        current version of these Terms and Conditions of Use by accessing this Website.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Privacy
                    </Text>
                    <Text fontSize='10pt'>
                        Please read our Privacy Policy to know about how and we collect/handle data of our users.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Links
                    </Text>
                    <Text fontSize='10pt'>
                        NFT Host has not checked all of the sites linked to its Website and is not responsible for their contents.
                        The presence of a link does not imply that NFT Host recommends the site. Any linked website should be used at the user's own risk.
                    </Text>
                    <Text mt='4' fontSize='20t'>
                        Limitations
                    </Text>
                    <Text fontSize='10pt'>
                        Even if NFT Host or an authorised representative of this Website has been told, orally or in writing, of the possibility of such harm,
                        NFT Host or its suppliers will not be held liable for any damages that come from the use or inability to use the materials on NFT Host's Website. 
                        Some jurisdictions prohibit the exclusion of implied warranties or the exclusion of liability for incidental damages. It's possible that none of 
                        the restrictions apply to you.
                    </Text>
                    <Box
                        display='flex'
                        justifyContent='flex-end'
                        mt='3em'
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