import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import Meta from '@/components/Meta'
import MainNavbar from '@/components/MainNavbar'
import MainFooter from '@/components/MainFooter'
import { AiOutlineWarning } from 'react-icons/ai'

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/getStarted', undefined, { shallow: true });
    }, [])

    return (
        <main style={{ minHeight: '100vh' }}>
            <Meta title='Dashboard | NFT Host' />
            <Flex flexDir='column' minH='100vh'>
                <MainNavbar isColorMode />
                <Flex flexDir='column' justifyContent='center' alignItems='center' w='full' flex='1' mb='4em'>
                    <AiOutlineWarning fontSize='28pt' />
                    <Flex flexDir='column' alignItems='center' mt='.5em'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            Redirect
                        </Text>
                        <Text fontSize='10pt'>
                            Redirecting page to dashboard...
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <MainFooter />
        </main>
    )
}

export default Dashboard