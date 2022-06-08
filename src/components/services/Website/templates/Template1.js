import { Text, Flex, Tag, TagLeftIcon, Image, VStack } from '@chakra-ui/react'
import parse from 'html-react-parser'
import { GiCutDiamond } from 'react-icons/gi'

const FreeTemplate1 = ({ userWebsite }) => {
    const { 
        components: { title, unrevealedImage, description, embed },
        isPremium
    } = userWebsite;

    return (
        <Flex
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            p='3em'
            minH='100vh'
            position='relative'
        >
            <VStack spacing='2em'>
                <Image 
                    src={unrevealedImage}
                    alt={title}
                    boxSize='240px'
                    objectFit='scale-down'
                />
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
        </Flex>
    )
}

export default FreeTemplate1