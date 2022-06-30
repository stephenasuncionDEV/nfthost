import { useRouter } from 'next/router'
import { useColorModeValue, Flex, Text, VStack, Box, HStack } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import { useUser } from '@/providers/UserProvider'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import GetStarted from '@/components/GetStarted'
import Generator from '@/components/services/Generator'
import Website from '@/components/services/Website'
import Template from '@/components/services/Website/Template'
import Addons from '@/components/services/Website/Addons'
import Domain from '@/components/services/Website/Domain'
import WebsiteInfo from '@/components/services/Website/WebsiteInfo'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import Partners from '@/components/Partners'
import Payments from '@/components/Payments'
import Team from '@/components/Team'
import Analytics from '@/components/services/Website/Analytics'
import Utils from '@/components/services/Generator/utils'
import Metadata from '@/components/services/Generator/metadata'
import { MdOutlineAccountCircle } from 'react-icons/md'

const Page = () => {
    const router = useRouter();
    const { isLoggedIn } = useUser();
    const app = router.query.app || [];
    const currentApp = app[app.length === 2 ? 1 : 0]?.toLowerCase();
    useReAuthenticate();

    const bgColor = useColorModeValue('rgb(236,242,245)', 'rgb(48,56,65)');
    const isRemoveStepper = useMediaQuery({ query: '(max-width: 1300px)' });
    const isCollapse = useMediaQuery({ query: '(max-width: 990px)' });

    return (
        <main style={{ background: bgColor, minHeight: '100vh' }}>
            <Meta title='Dashboard | NFT Host' />
            <Layout currentApp={currentApp}>
                {isLoggedIn ? (
                    <>
                        <Flex justifyContent='space-between' h='4em' alignItems='center' mb='1em'>
                            <Text fontWeight='bold'>
                                {currentApp?.toUpperCase()}
                            </Text>
                            <HStack spacing='2em'>
                                {app[0] === 'website' && <WebsiteInfo isCollapse={isCollapse} />}
                                {!isRemoveStepper && (
                                    <Text>
                                        DASHBOARD &gt; {app.join(' > ').toUpperCase()}
                                    </Text>
                                )}
                            </HStack>
                        </Flex>
                        {app.length > 0 && (
                            {
                                getstarted: <GetStarted />,
                                generator: <Generator />,
                                metadata: <Metadata />,
                                utils: <Utils />,
                                website: <Website />,
                                templates:  <Template />,
                                addons: <Addons />,
                                domain: <Domain />,
                                payments: <Payments />,
                                partners: <Partners />,
                                team: <Team />,
                                analytics: <Analytics />
                            }[currentApp]
                        )}
                    </>
                ) : (
                    <VStack flex='1'>
                        <Flex flexDir='column' justifyContent='center' alignItems='center' flex='1'>
                            <MdOutlineAccountCircle fontSize='28pt' />
                            <Flex flexDir='column' alignItems='center' mt='.5em'>
                                <Text fontWeight='bold' fontSize='10pt'>
                                    Connect
                                </Text>
                                <Text fontSize='10pt'>
                                    Connect your wallet, to unlock dashboard.
                                </Text>
                            </Flex>
                            <Box bg='rgb(52,140,212)' p='.25em' borderRadius='10px' mt='1em'>
                                <ConnectWalletTag />
                            </Box>
                        </Flex>
                    </VStack>
                )}
            </Layout>
        </main>
    )
}

export default Page