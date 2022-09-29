import { Text, Flex, Heading, Box, Avatar, Image } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import Embed from './Embed'
import Address from './Address'
import Links from './Links'

const Template7 = () => {
    const { userWebsite } = useWebsite();

    return (
        <Flex
            flexDir='column'
            position='relative'
            minH='1330px'
            bg='url(/assets/templates/components/bg7.png) no-repeat center'
            bgSize='cover'
            alignItems='center'
        >
            <Flex 
                flexDir='column'        
                w='full' 
                alignItems='center'
                flex='1'
            >
                <Flex w='full' maxW='1260px' p='2em' justifyContent='space-between' alignItems='center'>
                    <Flex maxW='200px' w='full'>
                        <Avatar  
                            src={userWebsite?.components?.unrevealedImage}
                            name={userWebsite?.components?.title} 
                            bg='white'
                        />
                    </Flex>
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
                    <Text fontSize='19pt' textShadow='-4px 4px 8px #ff00d4, 4px 4px 8px #ff00d4, 4px -4px 8px #ff00d4, -4px -4px 8px #ff00d4'>
                        Welcome to
                    </Text>
                    <Heading 
                        mt='1em'
                        as='h1' 
                        textAlign='center' 
                        textShadow='-4px 4px 8px #ff00d4, 4px 4px 8px #ff00d4, 4px -4px 8px #ff00d4, -4px -4px 8px #ff00d4, -8px 8px 16px #fff, 8px 8px 8px #fff, 8px -8px 8px #fff, -8px -8px 8px #fff' 
                        fontSize='64pt' 
                        fontFamily='GANGSTA'
                    >
                        {userWebsite?.components?.title}
                    </Heading>
                    <Embed mt='3em' />
                </Flex>
            </Flex>
            <Flex flex='1' maxH='280px' justifyContent='flex-end' w='full' p='2em' pt='3em'>
                <Flex 
                    flexDir='column'  
                    flex='1' 
                    maxW='550px' 
                    alignItems='flex-start'
                    textShadow='-4px 4px 8px #ff00d4, 4px 4px 8px #ff00d4, 4px -4px 8px #ff00d4, -4px -4px 8px #ff00d4'
                    p='1em'
                    borderRadius='10px'
                >
                    <Text fontSize='20pt'>
                        {userWebsite?.components?.title}
                    </Text>
                    <Text fontSize='14pt'>
                        {userWebsite?.components?.description}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Template7