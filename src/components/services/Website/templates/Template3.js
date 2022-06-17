import { Text, Flex, Tag, TagLeftIcon, Image, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { GiCutDiamond } from 'react-icons/gi'
import Embed from '../Embed';

const Template2 = ({ userWebsite, data }) => {
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
            <HStack spacing='10em' bg={!bgImage ? 'transparent' : containerColor} p='2em' px='3em' borderRadius='20px'>
                <Image 
                    src={unrevealedImage}
                    alt={title}
                    boxSize='240px'
                    objectFit='scale-down'
                />
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
                    <Embed 
                        revealDate={revealDate} 
                        embed={embed}
                        id={_id}
                    />
                </VStack>
            </HStack>
        </Flex>
    )
}

export default Template2