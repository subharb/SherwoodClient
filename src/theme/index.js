import { createMuiTheme } from "@material-ui/core/styles";
import variants from "./variants";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";

const createTheme = (name) => {
    let themeConfig = variants.find((variant) => variant.name === name);

    if (!themeConfig) {
        console.warn(new Error(`The theme ${name} is not valid`));
        themeConfig = variants[0];
    }

    return createMuiTheme(
        {
        spacing: 4,
        breakpoints: breakpoints,
        overrides: overrides,
        props: props,
        typography: typography,
        shadows: shadows,
        palette: themeConfig.palette,
        buttonContinue : {
            background : "#48bb78",
            color : "#FFF"
        },
        buttonCancel: {
            background : "#e53e3e",
            color : "#FFF"
        },
        buttonOther: {
            background : "goldenrod",
            color : "#FFF"
        },
        error : {
            color : "#e53e3e",
        },
        edit : {
            color : "#81e6d9",
        },
        primary : {
            background : "#35887D",
            color : "#FFF"
        }
        },
        {
        name: themeConfig.name,
        header: themeConfig.header,
        footer: themeConfig.footer,
        sidebar: themeConfig.sidebar,
        }
    );
};

export default createTheme;
