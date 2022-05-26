import '../styles/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@/providers/UserProvider'
import { GeneratorProvider } from '@/providers/GeneratorProvider'
import { WebsiteProvider } from '@/providers/WebsiteProvider'
import theme from '@/utils/theme'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <UserProvider>
                <GeneratorProvider>
                    <WebsiteProvider>
                        <Component {...pageProps} />
                    </WebsiteProvider>
                </GeneratorProvider>
            </UserProvider>
        </ChakraProvider>
    )
}

export default MyApp
