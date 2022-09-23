import { Text, Flex, Button, VStack, 
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useTemplate } from '@/hooks/services/website/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { TemplatesArr } from '@/utils/json'
import { webColor } from '@/theme/index'

const TemplateList = () => {
    const { currentEditWebsite } = useWebsite();
    const { AddTemplate } = useTemplate();
 
    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);
    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

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
                    Add template(s) you can use for the website editor
                </Text>
            </VStack>
            <Wrap spacing='1em'>
                {TemplatesArr?.map((template, idx) => (
                    <VStack
                        p='1.5em'
                        bg={componentColor}
                        borderRadius='10px'
                        maxW='290px'
                        key={idx}
                        alignItems='flex-start'
                        spacing='1em'
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
                            onClick={() => AddTemplate(template)} 
                            disabled={
                                (!currentEditWebsite?.isPremium && template.sub === 'premium') || 
                                (currentEditWebsite?.components?.templates?.includes(template.key)) ||
                                (currentEditWebsite?.components?.templates?.length === 0)
                            }
                        >
                            Add
                        </Button>
                    </VStack>
                ))}
            </Wrap>
        </VStack>
    )
}

export default TemplateList