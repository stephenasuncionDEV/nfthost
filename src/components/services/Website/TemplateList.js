import { HStack, Text, Flex, Button, VStack, 
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon, Box
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useTemplate } from '@/hooks/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { TemplatesArr } from '@/utils/tools'

const TemplateList = () => {
    const { currentEditWebsite } = useWebsite();
    const { ChooseTemplate } = useTemplate();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const itemColor = useColorModeValue('whiteAlpha.400', 'blackAlpha.400');

    return (
        <VStack 
            id='templateList'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            h='100%'
            alignItems='flex-start'
            w='full'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Template List
                </Text>
                <Text fontSize='10pt'>
                    Choose a template for your mint website
                </Text>
            </VStack>
            <Wrap spacing='1em'>
                {TemplatesArr?.map((template, idx) => (
                    <VStack
                        p='1.5em'
                        bg={itemColor}
                        borderRadius='10px'
                        maxW='290px'
                        key={idx}
                        alignItems='flex-start'
                        spacing='1em'
                        borderWidth='2px'
                        borderStyle='dashed'
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
                                src={`/assets/templates/${template.key}.png`}
                                objectFit='cover' 
                                boxSize='250px'
                                opacity='.6' 
                            />
                            <Tag position='absolute' top='2' right='2'>
                                {template.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />}
                                <Text>
                                    {template.sub === 'premium' ? 'Premium' : 'Free'}
                                </Text>
                            </Tag>
                        </Flex>
                        <VStack spacing='0' alignItems='flex-start'>
                            <Text fontSize='10pt' noOfLines='1'>
                                {template.key}
                            </Text>
                            <Text fontSize='8pt' noOfLines='1'>
                                by {template.creator}
                            </Text>
                        </VStack>
                        <Button 
                            w='full' 
                            size='sm' 
                            variant='primary'
                            onClick={() => ChooseTemplate(template)} 
                            disabled={!currentEditWebsite?.isPremium && template.sub === 'premium'}
                        >
                            Use
                        </Button>
                    </VStack>
                ))}
            </Wrap>
        </VStack>
    )
}

export default TemplateList