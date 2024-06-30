import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import createTheme from "./theme";


export function CustomThemeProvider(props){
    const themeApp = import.meta.env.VITE_APP_PRODUCT === "HOSPITAL" ? createTheme("HOSPITAL") : createTheme("GREEN");
    
    const investigations = useSelector((state) => state.investigations);
    const themeCustom = investigations.currentInvestigation ? investigations.currentInvestigation.aesthetics : null;
    if(themeCustom){   
        console.log(themeCustom);
        themeApp.palette.background.default = themeCustom.params.primary.background;
        themeApp.palette.primary.main = themeCustom.params.primary.color;
        themeApp.palette.secondary.main = themeCustom.params.colorWhiteBackground ? themeCustom.params.colorWhiteBackground : themeCustom.params.primary.color;
        themeApp.header.background = themeCustom.params.header ? themeCustom.params.header.background : themeCustom.params.primary.background;
        themeApp.palette.primary.color = themeCustom.params.primary.color;
        themeApp.sidebar.background = themeCustom.params.sidebar.background;
        themeApp.sidebar.color = themeCustom.params.sidebar.color;
        themeApp.sidebar.header.color = themeCustom.params.sidebar.color;
        themeApp.sidebar.header.background = themeCustom.params.sidebar.background;
        themeApp.sidebar.footer.color = themeCustom.params.sidebar.color;
        themeApp.sidebar.footer.background = themeCustom.params.sidebar.background;
        themeApp.buttonContinue.primary.background = themeCustom.params.nextButton.background;
        themeApp.buttonContinue.primary.color = themeCustom.params.nextButton.color;        
    }

    return (
        
            <MuiThemeProvider theme={themeApp}>
                <ThemeProvider theme={themeApp}>
                    {
                        props.children
                    }
                </ThemeProvider>
            </MuiThemeProvider>
    );
}