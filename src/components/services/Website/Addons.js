import NextLink from 'next/link'
import { Text, Flex, Button, VStack, useColorModeValue, 
    Wrap, Tag, TagLeftIcon
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useTemplate } from '@/hooks/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { AiOutlineWarning, AiOutlineArrowLeft } from 'react-icons/ai'
import { AddonsArr } from '@/utils/tools'

const Addons = () => {
    const { currentEditWebsite } = useWebsite();
    const { ChooseAddon } = useTemplate();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const itemColor = useColorModeValue('blackAlpha.100', 'blackAlpha.400');

    return currentEditWebsite ? (
        <VStack 
            id='templateList'
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
                        borderWidth='2px'
                        borderStyle='dashed'
                    >
                        <Text>
                            {addon.key}
                        </Text>
                        <Button 
                            w='full' 
                            size='sm' 
                            variant='primary'
                            onClick={() => ChooseAddon(addon)} 
                            disabled={(!currentEditWebsite?.isPremium && addon.sub === 'premium') || (currentEditWebsite?.components?.addons?.indexOf(addon.key) !== -1)}
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
                <Button leftIcon={<AiOutlineArrowLeft />} color='white' bg='rgb(52,140,212)' _hover={{ bg: 'rgb(39,107,163)' }} size='sm' mt='1.5em'>
                    See Website List
                </Button>
            </NextLink>
        </Flex>
    )
}

export default Addons