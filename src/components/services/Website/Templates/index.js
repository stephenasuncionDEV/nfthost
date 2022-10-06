import NextLink from 'next/link'
import { useState } from 'react'
import { Text, Flex, Button, VStack, useColorModeValue, Image, 
    Wrap, Tag, TagLeftIcon, HStack, Divider, Link, Box, Checkbox
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { GiCutDiamond, GiFairyWand } from 'react-icons/gi'
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
    const [filter, setFilter] = useState(['f_free', 'f_premium', 'f_premium_animated']);

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    const onFilterChange = (e) => {
        const checkedValues = [...document.querySelectorAll('.filterCheckbox')]
        .filter((checkbox) => checkbox.firstChild.checked)
        .map((checkbox) => checkbox.firstChild.name);
        setFilter(checkedValues);
    }

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
                    <Text my='.5em' variant='subtle'>
                        You will see changes in your minting website 30 seconds after you changed your template.
                    </Text>
                    <HStack spacing='1em' mt='1em'>
                        <Checkbox id='free' name='f_free' onChange={onFilterChange} className='filterCheckbox' defaultChecked>
                            Free
                        </Checkbox>
                        <Checkbox id='premium' name='f_premium' onChange={onFilterChange} className='filterCheckbox' defaultChecked>
                            Premium
                        </Checkbox>
                        <Checkbox id='animated' name='f_premium_animated' onChange={onFilterChange} className='filterCheckbox' defaultChecked>
                            Animated
                        </Checkbox>
                    </HStack>
                    <Wrap spacing='2em' mt='2em'>
                        {templatesArr?.filter(({ filterKey }) => filter.includes(filterKey)).map((template, idx) => (
                            <Flex
                                flexDir='column'
                                p='1em'
                                borderRadius='.25em'
                                bg={containerColor}
                                border={`1px solid ${template.sub === 'free' ? 'rgb(117,63,229)' : 'orange'}`}
                                key={idx}
                            >
                                <VStack
                                    flexDir='column'
                                    borderRadius='5px'
                                    key={idx}
                                    h='170px'
                                    spacing='.75em'
                                >
                                    <Box w='250px' h='125px' overflow='hidden'>
                                        <Link href={`${config?.clientUrl}/assets/templates/${template.key}.png`} boxSize='250px' isExternal>
                                            <Image 
                                                src={`/assets/templates/${template.key}.png`}
                                                objectFit='scale-down' 
                                            />
                                        </Link>
                                    </Box>
                                    <Wrap justify='flex-start' w='full' gap='.5em'>
                                        <Tag size='sm'>
                                            {template.sub === 'premium' && <TagLeftIcon as={GiCutDiamond} color='orange' />}
                                            <Text>
                                                {template.sub === 'premium' ? 'Premium' : 'Free'}
                                            </Text>
                                        </Tag>
                                        {template.isAnimated && (
                                            <Tag size='sm'>
                                                <TagLeftIcon as={GiFairyWand} color='green.500' />
                                                <Text>
                                                    Animated
                                                </Text>
                                            </Tag>
                                        )}
                                    </Wrap>
                                </VStack>
                                <VStack spacing='0' alignItems='flex-start' mb='1em'>
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
                                    bg={template?.sub === 'premium' ? 'orange.500' : 'rgb(117, 63, 229)'}
                                    _hover={{
                                        bg: template?.sub === 'premium' ? 'orange.400' : 'rgb(142, 90, 250)'
                                    }}
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
                        <Text fontSize='10pt' variant='subtle'>
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