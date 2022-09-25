import { useRouter } from 'next/router'
import { useColorModeValue, Flex, Text, VStack, Box, HStack } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { useUser } from '@/providers/UserProvider'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import GetStarted from '@/components/GetStarted'
import Generator from '@/components/services/Generator'
import Website from '@/components/services/Website'
import Templates from '@/components/services/Website/Templates'
import SelectedWebsite from '@/components/services/Website/SelectedWebsite'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import Partners from '@/components/Partners'
import Payments from '@/components/Payments'
import Team from '@/components/Team'
import Utilities from '@/components/services/Utilities'
import Metadata from '@/components/services/Generator/Metadata'
import { webColor } from '@/theme/index'

const Page = () => {
    const router = useRouter();
    const { isLoggedIn } = useUser();
    const app = router.query.app || [];
    const currentApp = app[app.length === 2 ? 1 : 0]?.toLowerCase();
    useReAuthenticate();

    const bgColor = useColorModeValue(webColor.dashboardBg[0], webColor.dashboardBg[1]);
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
                                {app[0] === 'website' && <SelectedWebsite isCollapse={isCollapse} />}
                                {!isRemoveStepper && (
                                    <Text>
                                        DASHBOARD &gt; {app.join(' > ').toUpperCase()}
                                    </Text>
                                )}
                            </HStack>
                        </Flex>
                        {app?.length > 0 && (
                            {
                                getstarted: <GetStarted />,
                                generator: <Generator />,
                                metadata: <Metadata />,
                                utilities: <Utilities />,
                                website: <Website />,
                                templates:  <Templates />,
                                payments: <Payments />,
                                partners: <Partners />,
                                team: <Team />
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