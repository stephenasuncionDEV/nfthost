import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Button from '@/theme/Button'
import Text from '@/theme/Text'
import Drawer from '@/theme/Drawer'
import Tag from '@/theme/Tag'
import Link from '@/theme/Link'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const fonts = {
    heading: 'Poppins, Inter, sans-serif',
    body: 'Poppins, Inter, sans-serif',
}

const styles = {
    global: (props) => ({
        body: {
            bg: mode(
                'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(249,250,250,1) 100%)', 
                'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(17,21,28,1) 100%)')
                (props),
        }
    })
}

const theme = extendTheme({
    config,
    fonts,
    styles,
    components: {
        Button,
        Text,
        Drawer,
        Tag,
        Link
    }
})

export default theme