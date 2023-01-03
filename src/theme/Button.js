import { mode } from "@chakra-ui/theme-tools";

const Button = {
  baseStyle: (props) => ({
    fontWeight: "normal",
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3",
  }),
  sizes: {
    xs: {
      fontSize: "8pt",
      px: 2,
    },
  },
  variants: {
    main: (props) => ({
      bg: mode("rgb(20,20,20)", "#08BDD4")(props),
      color: mode("white", "black")(props),
    }),
    primary: (props) => ({
      bg: "whiteAlpha.300",
      _hover: {
        bg: "whiteAlpha.400",
        _disabled: {
          bg: "whiteAlpha.200",
        },
      },
      color: "white",
      h: "8",
      minW: "8",
      fontSize: "sm",
      px: "3",
    }),
    primarySmall: (props) => ({
      bg: "rgb(52,140,212)",
      _hover: {
        bg: "rgb(39,107,163)",
        _disabled: {
          bg: "rgb(39,107,163)",
        },
      },
      sizes: "xs",
      color: "white",
    }),
    danger: (props) => ({
      bg: "red.500",
      _hover: {
        bg: "red.400",
        _disabled: {
          bg: "red.400",
        },
      },
      color: "white",
      h: "8",
      minW: "8",
      fontSize: "sm",
      px: "3",
    }),
  },
};

export default Button;
