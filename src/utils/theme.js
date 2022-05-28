import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const fonts = {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
}

const styles = {
    global: (props) => ({
        body: {
            bg: mode('linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(249,250,250,1) 100%)', 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(17,21,28,1) 100%)')(props),
        }
    })
}

const components = {
    Text: {
        baseStyle: (props) => ({
            color: mode('rgb(34,34,34)', 'white')(props),
        }),
        variants: {
            content_intro: (props) => ({
                color: mode('#08BDD4', '#08BDD4')(props),
                fontSize: '1.125rem',
                fontWeight: 'bold'
            }),
            content_title: (props) => ({
                color: mode('rgb(34,34,34)', 'white')(props),
                fontSize: '3rem',
                lineHeight: '1',
                fontWeight: '800'
            }),
            content_description: (props) => ({
                color: mode('rgb(34,34,34)', 'white')(props),
                fontSize: '11pt',
                mt: '0.5em'
            }),
            content_subtitle: (props) => ({
                color: mode('rgb(34,34,34)', 'white')(props),
                fontSize: '1.125rem',
                fontWeight: '600'
            }),
            link: (props) => ({
                color: mode('#08BDD4', '#08BDD4')(props),
                fontWeight: 'bold',
                cursor: 'pointer'
            }),
            header_1: (props) => ({
                color: mode('rgb(34,34,34)', 'white')(props),
                fontSize: '42pt',
                lineHeight: '48pt',
                fontWeight: 'bold'
            }),
            header_2: (props) => ({
                color: mode('rgb(34,34,34)', 'white')(props),
                fontSize: '28pt',
                lineHeight: '48pt',
                fontWeight: 'bold'
            }),
        },        
    },
    Button: {
        baseStyle: (props) => ({
            fontWeight: 'normal',
        }),
    },
    Toast: {
        defaultProps: {
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        }
    },
    Drawer: {
		variants: {
			alwaysOpen: {
				dialog: {
					pointerEvents: 'auto',
				},
				dialogContainer: {
					pointerEvents: 'none',
				},
			},
		},
        sizes: {
            sidebar: { 
                dialog: { 
                    maxW: '260px' 
                } 
            }
        },
	},
}

const theme = extendTheme({ 
    config,
    fonts,  
    styles,
    components
})

export default theme