import { mode } from '@chakra-ui/theme-tools'

const Menu = {
    baseStyle: (props) => ({
        list: {
            bgColor: mode('white', 'rgb(46,40,76)')(props),
        }
    })
}

export default Menu