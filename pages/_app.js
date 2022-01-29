import '../styles/globals.scss'
import { MoralisProvider } from 'react-moralis'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../utils/theme'
import 'grapesjs/dist/css/grapes.min.css';

const MyApp = ({ Component, pageProps }) => {
    return (
        <MoralisProvider
            appId={process.env.MORALIS_APP_ID}
            serverUrl={process.env.MORALIS_SERVER_URL}
        >
            <ChakraProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Component {...pageProps} />
            </ChakraProvider>
        </MoralisProvider>
    )
}

export default MyApp
