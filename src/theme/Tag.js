import { mode } from "@chakra-ui/theme-tools";

const Tag = {
  baseStyle: (props) => ({
    borderColor: mode("gray.200", "black")(props),
  }),
};

export default Tag;
