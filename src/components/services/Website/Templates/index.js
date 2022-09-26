import NextLink from 'next/link'
import { Text, Flex, Button, VStack, useColorModeValue, Image, 
    Wrap, Tag, TagLeftIcon, HStack, Divider, Link
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { GiCutDiamond } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import { templatesArr } from '@/utils/json'
import { webColor } from '@/theme/index'
import config from '@/config/index'

const Templates = () => {
    const { editingWebsite } = useWebsite();
    const { 
        updateTemplate,
        isUpdatingWebsite
    } = useWebsiteControls();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <>
            {editingWebsite ? (
                <Flex flexDir='column' mt='1em' p='1em'>
                    <HStack alignItems='center' w='full' mt='1em'>
                        <Text fontSize='10pt'>
                            NFT Host Templates
                        </Text>
                        <Divider flex='1' />
                    </HStack>
                    <Wrap spacing='2em' mt='2em'>
                        {templatesArr?.map((template, idx) => (
                            <Flex
                                flexDir='column'
                                p='1em'
                                borderRadius='.25em'
                                bg={containerColor}
                                border={`1px solid ${template.sub === 'free' ? 'rgb(117,63,229)' : 'rgb(247,185,40)'}`}
                                key={idx}
                            >
                                <Flex
                                    w='230px'
                                    h='180px'
                                    overflow='hidden'
                                    position='relative'
                                    borderRadius='5px'
                                    justifyContent='center'
                                    alignItems='center'
                                    key={idx}
                                >
                                    <Link href={`${config?.clientUrl}/assets/templates/${template.key}.png`} boxSize='250px' isExternal>
                                        <Image 
                                            position='absolute'
                                            src={`/assets/templates/${template.key}.png`}
                                            objectFit='cover' 
                                            boxSize='250px'
                                            opacity='.6' 
                                        />
                                    </Link>
                                    <Tag position='absolute' top='2' right='2' size='sm'>
                                        {template.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />}
                                        <Text>
                                            {template.sub === 'premium' ? 'Premium' : 'Free'}
                                        </Text>
                                    </Tag>
                                </Flex>
                                <VStack spacing='0' alignItems='flex-start' my='1em'>
                                    <Text fontSize='10pt' noOfLines='1'>
                                        {template.name}
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        by {template.creator}
                                    </Text>
                                </VStack>
                                <Button 
                                    w='full' 
                                    size='sm' 
                                    variant='primary'
                                    onClick={() => updateTemplate(template.key)} 
                                    disabled={
                                        isUpdatingWebsite ||
                                        (!editingWebsite?.isPremium && template.sub === 'premium') || 
                                        (editingWebsite?.components?.template === template.key)
                                    }
                                    rightIcon={<MdAdd />}
                                >
                                    Use
                                </Button>
                            </Flex>
                        ))}
                    </Wrap>
                </Flex>
            ) : (
                <Flex flexDir='column' justifyContent='center' alignItems='center' flex='1'>
                    <Flex flexDir='column' alignItems='center' mt='.5em'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            Error
                        </Text>
                        <Text fontSize='10pt'>
                            Please create or select a website first.
                        </Text>
                    </Flex>
                    <NextLink href={`/dashboard/website`} shallow passHref>
                        <Button leftIcon={<AiOutlineArrowLeft />} color='white' variant='primary' mt='1.5em'>
                            See Website List
                        </Button>
                    </NextLink>
                </Flex>
            )}
        </>
    )
}

export default Templates