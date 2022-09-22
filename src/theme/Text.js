import { mode } from '@chakra-ui/theme-tools'

const Text = {
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
    }
}

export default Text