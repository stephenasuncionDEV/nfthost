import { Text, Flex, Tag, TagLeftIcon, Image, VStack, useColorModeValue } from '@chakra-ui/react'
import parse from 'html-react-parser'
import { GiCutDiamond } from 'react-icons/gi'
import Embed from '../Embed';

const FreeTemplate1 = ({ userWebsite, data }) => {
    const { 
        components: { title, unrevealedImage, description, embed },
        isPremium,
        revealDate,
        _id
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
            <VStack spacing='2em' bg={!bgImage ? 'transparent' : containerColor} p='3em' borderRadius='20px'>
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
                <Embed 
                    revealDate={revealDate} 
                    embed={embed}
                    id={_id}
                />
            </VStack>
        </Flex>
    )
}

export default FreeTemplate1