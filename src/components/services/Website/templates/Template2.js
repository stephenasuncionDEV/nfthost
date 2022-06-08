import { Text, Flex, Tag, TagLeftIcon, Image, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import parse from 'html-react-parser'
import { GiCutDiamond } from 'react-icons/gi'

const FreeTemplate2 = ({ userWebsite, data }) => {
    const { 
        components: { title, unrevealedImage, description, embed },
        isPremium
    } = userWebsite;
    const {
        style: { bgImage }
    } = data;

    const containerColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');

    return (
        <Flex
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            p='3em'
            minH='100vh'
            position='relative'
        >
            <HStack spacing='10em' bg={!bgImage ? 'transparent' : containerColor} p='2em' px='3em' borderRadius='20px'>
                <VStack spacing='2em'>
                    <VStack>
                        <Text variant='content_title'>
                            {title}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                        {isPremium && (
                            <Tag>
                                <TagLeftIcon as={GiCutDiamond} color='skyblue' />
                                <Text>
                                    Premium
                                </Text>
                            </Tag>
                        )}
                    </VStack>
                    {parse(embed)}
                </VStack>
                <Image 
                    src={unrevealedImage}
                    alt={title}
                    boxSize='240px'
                    objectFit='scale-down'
                />
            </HStack>
        </Flex>
    )
}

export default FreeTemplate2