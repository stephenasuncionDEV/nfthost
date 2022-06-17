import NextLink from 'next/link'
import { Text, Flex, Button, VStack, useColorModeValue, Input } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useDomain } from '@/hooks/useDomain'
import { AiOutlineWarning, AiOutlineArrowLeft } from 'react-icons/ai'

const Domain = () => {
    const { currentEditWebsite, newAlias, setNewAlias, isChangingAlias } = useWebsite();
    const { UpdateAlias } = useDomain();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return currentEditWebsite ? (
        <VStack 
            id='templateList'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
            maxW='580px'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Alias
                </Text>
                <Text fontSize='10pt'>
                    Setup a unique alias for your website
                </Text>
            </VStack>
            <VStack w='full' alignItems='flex-start'>
                <Text fontSize='10pt'>
                    Current Alias: <span style={{ color: 'rgb(52,140,212)' }}>{currentEditWebsite?.custom?.alias}</span>
                </Text>
                <Input placeholder='Alias' value={newAlias} onChange={(e) => setNewAlias(e.target.value)} disabled={!currentEditWebsite?.isPremium} />
                <Flex justifyContent='flex-end' w='full'>
                    <Button variant='primary' onClick={UpdateAlias} isLoading={isChangingAlias} loadingText='Updating' disabled={!currentEditWebsite?.isPremium}>
                        Update
                    </Button>
                </Flex>
            </VStack>
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

export default Domain