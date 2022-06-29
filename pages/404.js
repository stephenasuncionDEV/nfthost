import NextLink from 'next/link'
import { Text, Flex, Button } from '@chakra-ui/react'
import Meta from '@/components/Meta'
import MainNavbar from '@/components/MainNavbar'
import MainFooter from '@/components/MainFooter'
import { AiOutlineArrowLeft, AiOutlineWarning } from 'react-icons/ai'

const NotFound = () => {

    return (
        <main style={{ minHeight: '100vh' }}>
            <Meta title='404 | NFT Host' />
            <Flex flexDir='column' minH='100vh'>
                <MainNavbar isColorMode />
                <Flex flexDir='column' justifyContent='center' alignItems='center' w='full' flex='1' mb='4em'>
                    <AiOutlineWarning fontSize='28pt' />
                    <Flex flexDir='column' alignItems='center' mt='.5em'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            404 Error
                        </Text>
                        <Text fontSize='10pt'>
                            Page Not Found
                        </Text>
                    </Flex>
                    <NextLink href='/' shallow passHref>
                        <Button leftIcon={<AiOutlineArrowLeft />} color='white' bg='rgb(52,140,212)' _hover={{ bg: 'rgb(39,107,163)' }} size='sm' mt='1.5em'>
                            Landing Page
                        </Button>
                    </NextLink>
                </Flex>
            </Flex>
            <MainFooter />
        </main>
    )
}

export default NotFound