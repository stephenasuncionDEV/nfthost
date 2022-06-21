import { Text, Flex, Button, VStack, useColorModeValue, Input, HStack, Tag, TagLeftIcon, TagRightIcon } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useDomain } from '@/hooks/useDomain'
import { GiCutDiamond } from 'react-icons/gi'
import { MdOutlineContentCopy, MdSave } from 'react-icons/md'
import config from '@/config/index'

const CustomDomain = () => {
    const { currentEditWebsite, newDomain, setNewDomain, isChangingDomain } = useWebsite();
    const { UpdateDomain, CopyDns } = useDomain();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <VStack 
            id='domain'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
            maxW='580px'
            w='full'
            position='relative'
            h='100%'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Domain
                </Text>
                <Text fontSize='10pt'>
                    Setup a custom domain for your website. Configure your custom domain's dns.
                </Text>
            </VStack>
            <VStack w='full' alignItems='flex-start'>
                <Flex flexDir='column' mb='1em'>
                    <HStack fontSize='10pt'>
                        <Text>
                            Alias
                        </Text>
                        <Tag cursor='pointer' onClick={() => CopyDns('alias')}>
                            <Text color='rgb(52,140,212)'>
                                76.76.21.241
                            </Text>
                            <TagRightIcon as={MdOutlineContentCopy} />
                        </Tag>
                    </HStack>
                    <HStack fontSize='10pt' mt='.5em'>
                        <Text>
                            CName
                        </Text>
                        <Tag cursor='pointer' onClick={() => CopyDns('cname')}>
                            <Text color='rgb(52,140,212)'>
                                {`${config?.frontendUrl?.substring(config?.frontendUrl?.indexOf('//') + 2)}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`} 
                            </Text>
                            <TagRightIcon as={MdOutlineContentCopy} />
                        </Tag>
                    </HStack>
                </Flex>
                <Input placeholder='Custom Domain' value={newDomain} onChange={(e) => setNewDomain(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                <Flex justifyContent='flex-end' w='full'>
                    <Button variant='primary' leftIcon={<MdSave />} onClick={UpdateDomain} isLoading={isChangingDomain} loadingText='Adding' disabled={!currentEditWebsite?.isPremium || isChangingDomain} size='sm'>
                        Set Domain
                    </Button>
                </Flex>
            </VStack>
            {!currentEditWebsite?.isPremium && (
                <Tag position='absolute' right='4' top='-1'>
                    <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />
                    <Text>
                        Premium Only
                    </Text>
                </Tag>
            )}
        </VStack>
    )
}

export default CustomDomain