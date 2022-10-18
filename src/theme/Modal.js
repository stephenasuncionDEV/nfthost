import { mode } from "@chakra-ui/theme-tools";

const Modal = {
  baseStyle: (props) => ({
    dialog: {
      bgColor: mode("white", "rgb(46,40,76)")(props),
    },
    header: {
      fontWeight: "normal",
    },
  }),
};

export default Modal;
