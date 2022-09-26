import { mode } from '@chakra-ui/theme-tools'

const Text = {
    baseStyle: (props) => ({
        color: mode('rgb(34,34,34)', 'white')(props),
    }),
    variants: {
        link: (props) => ({
            color: mode('#08BDD4', '#08BDD4')(props),
            fontWeight: 'bold',
            cursor: 'pointer'
        }),
        subtle: (props) => ({
            color: 'gray.500',
            fontSize: '9pt'
        })
    }
}

export default Text