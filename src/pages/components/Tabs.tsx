import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import styled from "styled-components";


export function a11yProps(index:number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsStyled = styled(Tabs)(({ theme }) => ({
    "& .MuiTabs-indicator": {
        backgroundColor: theme.palette.primary.color,
    },
    "& .MuiTab-root": {
        color: theme.palette.primary.color,
        "&.Mui-selected": {
            color: theme.palette.primary.color,
        },
        "&:hover": {
            color: theme.palette.primary.color,
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

interface TabProps{
    name:string,
    children:ReactNode[],
    initTab?:number,
    labels:string[],
    style?:object,
    tabChangeCallback?:(tabSelected:number)=>void
}

const CustomTab = styled(Tab)(({ theme }) => ({
    color: theme.palette.secondary.color, // Set the color using the secondary color from the theme
    "&.Mui-selected": {
      color: theme.palette.secondary.main, // Set the color of the selected tab to red
    },
    "& .PrivateTabIndicator-colorSecondary": {
      backgroundColor: theme.palette.secondary.main, // Set the color of the indicator using the secondary color from the theme
    },
  }));



export function TabsSherwood(props:TabProps){
    const [tabSelector, setTabSelector] = useState(props.initTab ? props.initTab : 0);

    function onTabChange(event: any, value: any){
        setTabSelector(value);
        if(props.tabChangeCallback){
            props.tabChangeCallback(value)
        }
    }

    return (
        <>
        <TabsStyled value={tabSelector} onChange={onTabChange} variant="scrollable"
            
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
