import { Text, Flex, Heading, Box, Avatar, Image, Wrap, Divider } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import Embed from './Embed'
import Address from './Address'
import Links from './Links'

const Template9 = () => {
    const { userWebsite } = useWebsite();

    return (
        <Flex
            flexDir='column'
            position='relative'
            bg='url(/assets/templates/components/bg9.png) no-repeat center'
            bgSize='cover'
            alignItems='center'
            minH='100vh'
        >
            <Flex flexDir='column' maxW='900px' w='full' flex='1'>
                <Heading as='h1' mt='1em' fontSize='64pt' textShadow='4px 4px 4px black' textAlign='center'>
                    {userWebsite?.components?.title}
                </Heading>
                <Wrap mt='7em' justify='center' w='full' spacing='3em'>
                    <Links bx={{ color: 'white' }}/>
                    <Flex maxW='230px'>
                        <Address />
                    </Flex>
                </Wrap>
                <Divider mt='1em' />
                <Text textAlign='center' mt='1em'>
                    {userWebsite?.components?.description}
                </Text>
                <Embed mt='2em' display='flex' justifyContent='center' />
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

export default Template9