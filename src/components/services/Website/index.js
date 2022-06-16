import { VStack, Button } from '@chakra-ui/react'
import WebsiteList from './WebsiteList'
import CreateWebsite from './CreateWebsite'
import { MdAdd } from 'react-icons/md'

const Website = () => {

    return (
        <VStack spacing='2em' alignItems='flex-start'>
            <Button leftIcon={<MdAdd />} color='white' bg='rgb(52,140,212)' _hover={{ bg: 'rgb(39,107,163)' }} size='sm'>
                Create Website
            </Button>
            <WebsiteList />
            {/* <CreateWebsite /> */}
        </VStack>
    )
}

export default Website