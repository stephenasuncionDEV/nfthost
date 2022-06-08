import { Text, Flex, Tag, TagLeftIcon, Image, VStack } from '@chakra-ui/react'
import parse from 'html-react-parser'
import { CgCopyright } from 'react-icons/cg'
import { GiCutDiamond } from 'react-icons/gi'

const FreeTemplate1 = ({ userWebsite }) => {
    return (
        <Flex
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            py='3em'
            minH='100vh'
            position='relative'
        >
            <VStack spacing='2em'>
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
                {parse(userWebsite?.components?.embed)}
            </VStack>
        </Flex>
    )
}

export default FreeTemplate1