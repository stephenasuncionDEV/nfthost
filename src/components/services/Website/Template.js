import NextLink from 'next/link'
import { Text, Button, Flex } from '@chakra-ui/react'
import TemplateList from './TemplateList'
import { useWebsite } from '@/providers/WebsiteProvider'
import { AiOutlineWarning, AiOutlineArrowLeft } from 'react-icons/ai'

const Template = () => {
    const { currentEditWebsite } = useWebsite();

    return currentEditWebsite ? (
        <TemplateList />
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

export default Template