import { Text, Flex, Button, Link, Box } from '@chakra-ui/react'
import parse from 'html-react-parser'
import { MdRefresh } from 'react-icons/md'
import { useAnalytics } from '@/hooks/useAnalytics'

const isDevelopment = false;

// https://i.postimg.cc/k5h8jLDW/Circle-Image.png
// https://i.postimg.cc/vmDx6XXT/Square-Image.png

const Embed = ({ revealDate, embed, id }) => {
    const isReveal = !revealDate || new Date(revealDate) <= new Date();
    const { CheckEmbedClick } = useAnalytics();

    return isReveal ? (
        <>
            {isDevelopment ? (
                <Flex
                    bg='rgb(116,119,125)'
                    borderRadius='10px'
                    w='260px'
                    justifyContent='center'
                    alignItems='center'
                    h='40px'
                >
                    <Text color='white'>
                        Embed
                    </Text>
                </Flex>
            ) : (
                <Box onClickCapture={CheckEmbedClick}>
                    {parse(embed, {
                        replace: val => {
                            //TODO@: Auto Style Embeds ?
                        }
                    })}
                </Box>
            )}
        </>
    ) : (
        <Flex
            borderRadius='10px'
            borderWidth='3px'
            p='2em'
            w='full'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
        >
            <Text>
                Mint Button will be revealed at
            </Text>
            <Text fontSize='10pt'>
                {revealDate && `${new Date(revealDate).toString()}`}
            </Text>
            <Link href={`/${id}`}>
                <Button mt='1em' rightIcon={<MdRefresh />}>
                    Refresh
                </Button>
            </Link>
        </Flex>
    )
}

export default Embed