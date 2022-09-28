import { Text, Flex, Heading, Box, Avatar } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import Embed from './Embed'
import Address from './Address'
import Links from './Links'

const Template6 = () => {
    const { userWebsite } = useWebsite();

    return (
        <Flex
            flexDir='column'
            position='relative'
            minH='100vh'
            bg='url(/assets/templates/components/bg6.png) no-repeat center center fixed'
            bgSize='cover'
            alignItems='center'
        >
            <Flex w='full' maxW='1260px' p='2em' justifyContent='space-between' alignItems='center'>
                <Avatar  
                    src={userWebsite?.components?.unrevealedImage}
                    name={userWebsite?.components?.title} 
                    bg='white'
                />
                <Links bx={{ color: 'white', size: 'md' }} />
                <Address 
                    maxW='200px'
                    size='md'
                    h='15px'
                    color='white'
                    fontWeight='bold'
                />
            </Flex>
            <Flex 
                flexDir='column'
                w='full' 
                maxW='1260px' 
                p='2em' 
                alignItems='center' 
                flex='1' 
                mt='2em'
            >
                <Heading as='h1' textAlign='center' textShadow='4px 4px 4px black' fontSize='64pt' fontFamily='Rubik Wet Paint'>
                    {userWebsite?.components?.title}
                </Heading>
                <Box maxW='735px'>
                    <Text fontSize='18pt' color='blackAlpha.800' mt='1em'>
                        {userWebsite?.components?.description}
                    </Text>
                </Box>
                <Embed mt='3em' />
            </Flex>
        </Flex>
    )
}

export default Template6