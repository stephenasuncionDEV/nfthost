import { mode } from '@chakra-ui/theme-tools'

const Button = {
    baseStyle: (props) => ({
        fontWeight: 'normal',
    }),
    sizes: {
        xs: {
            fontSize: '8pt',
            px: 2
        }
    },
    variants: {
        main: (props) => ({
            bg: mode('rgb(20,20,20)', '#08BDD4')(props),
            color: mode('white', 'black')(props),
        }),
        primary: (props) => ({
            bg: 'rgb(117, 63, 229)',
            _hover: {
                bg: 'rgb(142, 90, 250)',
                _disabled: {
                    bg: 'rgb(142, 90, 250)',
                }
            },
            color: 'white',
        }),
        primarySmall: (props) => ({
            bg: 'rgb(52,140,212)',
            _hover: {
                bg: 'rgb(39,107,163)',
                _disabled: {
                    bg: 'rgb(39,107,163)',
                }
            },
            sizes: 'xs',
            color: 'white',
        }),
        danger: (props) => ({
            bg: 'red.500',
            _hover: {
                bg: 'red.400',
                _disabled: {
                    bg: 'red.400',
                }
            },
            color: 'white',
        }),
    }
}

export default Button