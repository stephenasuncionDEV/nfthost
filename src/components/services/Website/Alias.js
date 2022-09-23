import { Text, Flex, Button, VStack, useColorModeValue, Input, Link, Tag, TagLeftIcon } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useDomain } from '@/hooks/services/website/useDomain'
import { MdSave } from 'react-icons/md'
import { GiCutDiamond } from 'react-icons/gi'
import config from '@/config/index'
import { webColor } from '@/theme/index'

const Alias = () => {
    const { currentEditWebsite, newAlias, setNewAlias, isChangingAlias } = useWebsite();
    const { UpdateAlias } = useDomain();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <VStack 
            id='alias'
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
                    Alias
                </Text>
                <Text fontSize='10pt'>
                    Setup a unique alias for your mint website
                </Text>
            </VStack>
            <VStack w='full' alignItems='flex-start'>
                <Flex flexDir='column'>
                    <Text fontSize='10pt'>
                        Current Alias: <span style={{ color: 'rgb(52,140,212)' }}>{!currentEditWebsite?.custom?.alias?.length ? 'n/a' : currentEditWebsite?.custom?.alias}</span>
                    </Text>
                    <Text fontSize='10pt'>
                        Current Website Link:&nbsp;
                        <Link href={`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`} isExternal>
                            <span style={{ color: 'rgb(52,140,212)' }}>{`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`}</span> 
                        </Link>
                    </Text>
                </Flex>
                <Input placeholder='Alias' value={newAlias} onChange={(e) => setNewAlias(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                <Flex justifyContent='flex-end' w='full'>
                    <Button variant='primary' leftIcon={<MdSave />} onClick={UpdateAlias} isLoading={isChangingAlias} loadingText='Updating' disabled={!currentEditWebsite?.isPremium || isChangingAlias} size='sm'>
                        Update
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

export default Alias