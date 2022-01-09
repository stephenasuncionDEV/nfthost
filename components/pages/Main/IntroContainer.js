import { Box, Text, Button, Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import style from '../../../styles/Main.module.scss'

const IntroContainer = () => {
    const router = useRouter();

    const handleVideoHost = () => {
        window.open("https://www.youtube.com/watch?v=GW8nvbWBYKM");
    }

    const handleVideoGenerator = () => {
        window.open("https://www.youtube.com/watch?v=54MAbT-yiAY&t=170s");
    }

    const handleConsole = () => {
        router.push('/console');
    }

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
            className={style.mainBG}
        >
            <Text
                fontWeight='800'
                textAlign='center'
                mt='2em'
                mx='2em'
                className={style.introHeader}
            >
                Generate and Host your
            </Text>
            <Text
                fontWeight='800'
                textAlign='center'
                mx='2em'
                className={style.introHeader}
            >
                NFT Collection
            </Text>
            <Text
                fontWeight='400'
                textAlign='center'
                mx='2em'
                className={style.introSubHeader}
            >
                Create and Show your NFT collection and start earning profit now!
            </Text>
            <Box 
                display='flex'
                justifyContent='center'
                mx='2em'
                px='1em'
                className={style.introBtnContainer}
            >
                <Button
                    py='1.5em'
                    px='2em'
                    variant='solid'
                    colorScheme='blue'
                    onClick={handleConsole}
                >
                    Get Started
                </Button>
                <Button
                    variant='solid'
                    bg='transparent'
                    onClick={handleVideoHost}
                    _hover={{ bg: "transparent" }}
                >
                    Host Demo
                </Button>
                <Divider 
                    orientation='vertical'
                    borderColor='blackAlpha.500'
                    height='3em'
                    className={style.introBtnDivider}
                />
                <Button
                    variant='solid'
                    bg='transparent'
                    onClick={handleVideoGenerator}
                    _hover={{ bg: "transparent" }}
                >
                    Generator Demo
                </Button>               
            </Box>
        </Box>
    )
}

export default IntroContainer