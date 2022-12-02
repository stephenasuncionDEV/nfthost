import { mode } from "@chakra-ui/theme-tools";

const Menu = {
  baseStyle: (props) => ({
    list: {
      bgColor: mode("white", "rgb(46,40,76)")(props),
    },
    item: {
      bgColor: mode("white", "rgb(46,40,76)")(props),
      _hover: {
        bgColor: mode("gray.200", "#753FE5")(props),
      },
    },
  }),
};

export default Menu;
