import '../styles/globals.scss'
import { MoralisProvider } from 'react-moralis'
import { ChakraProvider } from '@chakra-ui/react'
import 'grapesjs/dist/css/grapes.min.css';

const MyApp = ({ Component, pageProps }) => {
    return (
        <MoralisProvider
            appId={process.env.MORALIS_APP_ID}
            serverUrl={process.env.MORALIS_SERVER_URL}
        >
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </MoralisProvider>
    )
}

export default MyApp
