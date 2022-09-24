import { Text, Flex, Tag, TagLeftIcon, Image, VStack } from '@chakra-ui/react'
import { GiCutDiamond } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'
import Embed from './Embed'

const Template1 = () => {
    const { userWebsite } = useWebsite();

    return (
        <Flex
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            p='3em'
            minH='100vh'
            position='relative'
        >
            <VStack spacing='2em' p='3em' borderRadius='20px'>
                <Image 
                    src={userWebsite?.components?.unrevealedImage}
                    alt={userWebsite?.components?.title}
                    boxSize='240px'
                    objectFit='scale-down'
                />
                <VStack>
                    <Text variant='content_title'>
                        {userWebsite?.components?.title}
                    </Text>
                    <Text>
                        {userWebsite?.components?.description}
                    </Text>
                    {userWebsite?.isPremium && (
                        <Tag>
                            <TagLeftIcon as={GiCutDiamond} color='skyblue' />
                            <Text>
                                Premium
                            </Text>
                        </Tag>
                    )}
                </VStack>
                <Embed />
            </VStack>
        </Flex>
    )
}

export default Template1