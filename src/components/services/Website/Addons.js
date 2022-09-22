import NextLink from 'next/link'
import { Text, Flex, Button, VStack, useColorModeValue, 
    Wrap, Tag, TagLeftIcon
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useTemplate } from '@/hooks/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { AiOutlineWarning, AiOutlineArrowLeft } from 'react-icons/ai'
import { AddonsArr } from '@/utils/json'
import { webColor } from '@/theme/index'

const Addons = () => {
    const { currentEditWebsite } = useWebsite();
    const { AddAddon } = useTemplate();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);
    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
    
    return currentEditWebsite ? (
        <VStack 
            id='addons'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Addons
                </Text>
                <Text fontSize='10pt'>
                    Choose additional features you want for your mint website
                </Text>
            </VStack>
            <Wrap spacing='1em'>
                {AddonsArr?.map((addon, idx) => (
                    <VStack
                        p='1.5em'
                        pt='3.5em'
                        borderRadius='10px'
                        w='230px'
                        justifyContent='center'
                        alignItems='center'
                        spacing='1em'
                        key={idx}
                        position='relative'
                        bg={componentColor}
                    >
                        <Text>
                            {addon.key}
                        </Text>
                        <Button 
                            w='full' 
                            size='sm' 
                            variant='primary'
                            onClick={() => AddAddon(addon)} 
                            disabled={(!currentEditWebsite?.isPremium && addon.sub === 'premium') || (currentEditWebsite?.components?.addons?.includes(addon.key))}
                        >
                            Add
                        </Button>
                        <Tag position='absolute' top='0' right='3'>
                            {addon.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />}
                            <Text>
                                {addon.sub === 'premium' ? 'Premium' : 'Free'}
                            </Text>
                        </Tag>
                    </VStack>
                ))}
            </Wrap>
        </VStack>
    ) : (
        <Flex flexDir='column' justifyContent='center' alignItems='center' flex='1'>
            <AiOutlineWarning fontSize='28pt' />
            <Flex flexDir='column' alignItems='center' mt='.5em'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Error
                </Text>
                <Text fontSize='10pt'>
                    Please create or select a website first.
                </Text>
            </Flex>
            <NextLink href={`/dashboard/website`} shallow passHref>
                <Button leftIcon={<AiOutlineArrowLeft />} color='white' variant='primary' size='sm' mt='1.5em'>
                    See Website List
                </Button>
            </NextLink>
        </Flex>
    )
}

export default Addons