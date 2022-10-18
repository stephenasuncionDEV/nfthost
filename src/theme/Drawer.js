const Drawer = {
  variants: {
    alwaysOpen: {
      dialog: {
        pointerEvents: "auto",
      },
      dialogContainer: {
        pointerEvents: "none",
      },
    },
  },
  sizes: {
    sidebar: {
      dialog: {
        maxW: "260px",
      },
    },
  },
};

export default Drawer;
