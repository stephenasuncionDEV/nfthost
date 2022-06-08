import { Text, Flex, VStack, useColorModeValue, Image, Tag, TagLeftIcon } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { GiCutDiamond } from 'react-icons/gi'
import { TemplatesArr } from '@/utils/tools'

const CurrentTemplate = () => {
    const { currentEditWebsite } = useWebsite();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');
    const itemColor = useColorModeValue('whiteAlpha.400', 'blackAlpha.400');
    const currentTemplate = TemplatesArr[TemplatesArr?.map((template) => template.key).indexOf(currentEditWebsite?.data)];

    return (
        <VStack 
            id='currentTemplate'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='10px'
            boxShadow='md'
            h='100%'
            alignItems='flex-start'
        >
            <Flex flexDir='column' alignItems='flex-start'>
                <Text variant='content_subtitle'>
                    Current Template
                </Text>
                <Text fontSize='10pt'>
                    Mint Website: <span style={{ color: 'orange' }}>{currentEditWebsite?.components?.title}</span>
                </Text>
                <VStack mt='1em' alignItems='flex-start'>
                    <VStack
                        p='1.5em'
                        bg={itemColor}
                        borderRadius='10px'
                        maxW='290px'
                        alignItems='flex-start'
                    >
                        <Flex
                            h='180px'
                            w='230px'
                            overflow='hidden'
                            position='relative'
                            borderRadius='5px'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Image 
                                position='absolute'
                                src={`/assets/templates/${currentTemplate?.key}.png`}
                                objectFit='cover' 
                                boxSize='250px'
                                opacity='.6' 
                            />
                            <Tag position='absolute' top='0' right='0'>
                                {currentTemplate?.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />}
                                <Text>
                                    {currentTemplate?.sub === 'premium' ? 'Premium' : 'Free'}
                                </Text>
                            </Tag>
                        </Flex>
                        <VStack spacing='0' alignItems='flex-start'>
                            <Text fontSize='10pt' noOfLines='1'>
                                {currentTemplate?.key}
                            </Text>
                            <Text fontSize='8pt' noOfLines='1'>
                                by {currentTemplate?.creator}
                            </Text>
                        </VStack>
                    </VStack>
                </VStack>
            </Flex>
        </VStack>
    )
}

export default CurrentTemplate