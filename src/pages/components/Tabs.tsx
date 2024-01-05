import { Box, Tab, Tabs, Typography, TabProps } from "@mui/material";
import { ReactNode, useState } from "react";
import styled from "styled-components";


export function a11yProps(index:number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface CustomTabProps extends TabProps {
    whiteBackground?: boolean;
  }

const TabsStyled = styled(Tabs)<CustomTabProps>(({ theme, whiteBackground }) => ({
    "& .MuiTabs-indicator": {
        backgroundColor: theme.palette.primary.color,
    },
    "& .MuiTab-root": {
        color: whiteBackground ? "grey" : theme.palette.primary.color,
        "&.Mui-selected": {
            color: whiteBackground ? "black" : theme.palette.primary.color,
        },
        "&:hover": {
            color: whiteBackground ? "black" : theme.palette.primary.color,
        },
    }
}));
interface TabPanelProps{
    children:any,
    value:number,
    index : number

}
export function TabPanel(props:TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

interface TabSherwoodProps{
    name:string,
    children:ReactNode[],
    initTab?:number,
    labels:string[],
    style?:object,
    whiteBackground:boolean,
    tabChangeCallback?:(tabSelected:number)=>void
}

const CustomTab = styled(Tab)(({ theme }) => ({
    color: "red",//theme.palette.secondary.color, // Set the color using the secondary color from the theme
    "&.Mui-selected": {
      color: "red", //theme.palette.secondary.main, // Set the color of the selected tab to red
    },
    "& .PrivateTabIndicator-colorSecondary": {
      backgroundColor: theme.palette.secondary.main, // Set the color of the indicator using the secondary color from the theme
    },
  }));



export function TabsSherwood(props:TabSherwoodProps){
    const [tabSelector, setTabSelector] = useState(props.initTab ? props.initTab : 0);

    function onTabChange(event: any, value: any){
        setTabSelector(value);
        if(props.tabChangeCallback){
            props.tabChangeCallback(value)
        }
    }

    return (
        <>
        <TabsStyled whiteBackground={props.whiteBackground} value={tabSelector} onChange={onTabChange} variant="scrollable"
            scrollButtons="auto"  aria-label={props.name} {...props}>
            {
                props.labels.map((label, index) => {
                    
                    return <CustomTab label={label} {...a11yProps(index)} />;
                })
            }
        </TabsStyled>
        {
            props.children.map((child, index) => {
                if(Array.isArray(child)){
                    return child.map((child, subIndex) => {
                        return(
                            <TabPanel value={tabSelector} index={index+subIndex} >
                                {child}
                            </TabPanel>
                        )
                    }) 
                }
                else{
                    return(
                        <TabPanel value={tabSelector} index={index} >
                            {child}
                        </TabPanel>
                    )
                }   
                
            }) 
        }
        </>
    )
}
