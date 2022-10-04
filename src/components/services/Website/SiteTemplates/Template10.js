import { Text, Flex, Heading, Image, Wrap, Divider } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import Embed from './Embed'
import Address from './Address'
import Links from './Links'

const Template10 = () => {
    const { userWebsite } = useWebsite();

    return (
        <Flex
            flexDir='column'
            position='relative'
            bg='url(https://nfthost.s3.us-west-1.amazonaws.com/images/bg10.gif) no-repeat center'
            bgSize='cover'
            alignItems='center'
            minH='100vh'
        >
            <Flex flexDir='column' maxW='900px' w='full' flex='1' alignItems='center'>
                <Heading as='h1' mt='1em' fontSize='64pt' textShadow='4px 4px 4px #0D3583' textAlign='center' fontFamily='comforter brush'>
                    {userWebsite?.components?.title}
                </Heading>
                <Flex maxW='230px'>
                    <Address color='#0D3583' />
                </Flex>
                <Wrap mt='2em' justify='center' w='full' spacing='3em'>
                    <Links bx={{ color: '#0D3583' }}/>
                </Wrap>
                <Divider mt='1em' />
                <Text textAlign='center' mt='1em' textShadow='4px 4px 4px #0D3583'>
                    {userWebsite?.components?.description}
                </Text>
                <Embed mt='2em' display='flex' justifyContent='center'/>
            </Flex>
            <Flex justifyContent='center' my='4em'>
                <Image 
                    src={userWebsite?.components?.unrevealedImage}
                    alt={userWebsite?.components?.title} 
                    boxSize='100px'
                />
            </Flex>
        </Flex>
    )
}

export default Template10