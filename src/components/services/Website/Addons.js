import { HStack, Text, Flex, Button, VStack, 
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon, Box
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useTemplate } from '@/hooks/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { AddonsArr } from '@/utils/tools'

const Addons = () => {
    const { currentEditWebsite } = useWebsite();
    const { ChooseAddon } = useTemplate();

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
            flex='1'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Addons
                </Text>
                <Text fontSize='10pt'>
                    Choose additional features you want for your website
                </Text>
            </VStack>
            <Wrap spacing='1em'>
                {AddonsArr?.map((addon, idx) => (
                    <VStack
                        p='1.5em'
                        pt='3.5em'
                        bg={itemColor}
                        borderRadius='10px'
                        w='230px'
                        justifyContent='center'
                        alignItems='center'
                        spacing='1em'
                        key={idx}
                        position='relative'
                    >
                        <Text>
                            {addon.key}
                        </Text>
                        <Button 
                            w='full' 
                            size='sm' 
                            bg='orange.500' 
                            _hover={{ bg: 'orange.400' }} 
                            onClick={() => ChooseAddon(addon)} 
                            disabled={!currentEditWebsite?.isPremium && addon.sub === 'premium'}
                        >
                            Add
                        </Button>
                        <Tag position='absolute' top='2' right='2'>
                            {addon.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />}
                            <Text>
                                {addon.sub === 'premium' ? 'Premium' : 'Free'}
                            </Text>
                        </Tag>
                    </VStack>
                ))}
            </Wrap>
        </VStack>
    )
}

export default Addons