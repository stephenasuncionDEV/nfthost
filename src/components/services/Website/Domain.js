import NextLink from 'next/link'
import { Text, Flex, Button, Wrap } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { AiOutlineWarning, AiOutlineArrowLeft } from 'react-icons/ai'
import Alias from './Alias'
import CustomDomain from './CustomDomain'

const Domain = () => {
    const { currentEditWebsite} = useWebsite();

    return currentEditWebsite ? (
        <Wrap spacing='2em'>
            <Alias />
            {/* <CustomDomain /> */}
        </Wrap>
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