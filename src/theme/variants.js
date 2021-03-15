import merge from "deepmerge";
import { green, grey, indigo, red } from "@material-ui/core/colors";
import { THEMES } from "../constants";

const customBlue = {
  50: "#e9f0fb",
  100: "#c8daf4",
  200: "#a3c1ed",
  300: "#7ea8e5",
  400: "#6395e0",
  500: "#4782da",
  600: "#407ad6",
  700: "#376fd0",
  800: "#2f65cb",
  900: "#2052c2 ",
};

const defaultVariant = {
  name: THEMES.DEFAULT,
  palette: {
    type: "light",
    primary: {
      main: customBlue[700],
      contrastText: "#FFF",
    },
    secondary: {
      main: customBlue[500],
      contrastText: "#FFF",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: customBlue[600],
    },
  },
  footer: {
    color: grey[500],
    background: "#FFF",
  },
  sidebar: {
    color: grey[200],
    background: "#233044",
    header: {
      color: grey[200],
      background: "#233044",
      brand: {
        color: customBlue[500],
      },
    },
    footer: {
      color: grey[200],
      background: "#1E2A38",
      online: {
        background: green[500],
      },
    },
    badge: {
      color: "#FFF",
      background: customBlue[500],
    },
  },
};

const greenVariant = merge(defaultVariant, {
  name: THEMES.GREEN,
  palette: {
    primary: {
      main: green[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: green[500],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: green[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: green[700],
    header: {
      color: "#FFF",
      background: green[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: green[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const hospitalVariant = merge(defaultVariant, {
    name: "HOSPITAL",
    palette: {
      primary: {
        main: green[800],
        contrastText: "#FFF",
      },
      secondary: {
        main: green[500],
        contrastText: "#FFF",
      },
      background: {
        default: "#49CEBF",
        paper: "#FFF",
      },
    },
    header: {
        color: grey[500],
        background: "#49CEBF",
        search: {
          color: grey[800],
        },
        indicator: {
          background: customBlue[600],
        },
      },
    sidebar: {
      color: "#FFF",
      background: green[700],
      header: {
        color: "#FFF",
        background: green[800],
        brand: {
          color: "#FFFFFF",
        },
      },
      footer: {
        color: "#FFF",
        background: green[800],
        online: {
          background: "#FFF",
        },
      },
      badge: {
        color: "#000",
        background: "#FFF",
      },
    },
  });


const variants = [
  defaultVariant,
//   darkVariant,
//   lightVariant,
//   blueVariant,
  greenVariant,
  //indigoVariant,
  hospitalVariant
];

export default variants;
