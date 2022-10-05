import { Flex } from '@chakra-ui/react'
import Meta from '@/components/Meta'
import MainFooter from '@/components/MainFooter'
import CookieModal from '@/components/CookieModal'
import Landing from '@/components/Landing'

const Main = () => {

    return (
        <Flex 
            as='main'
            flexDir='column'
        >
            <Meta title='NFT Host' />
            <CookieModal />
            <Landing />
            <MainFooter />
        </Flex>
    )
}

export default Main