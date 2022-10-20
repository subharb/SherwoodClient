import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { ReactNode, useState } from "react";
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";


export function a11yProps(index:number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
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
    style:object,
    tabChangeCallback?:(tabSelected:number)=>void
}


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
        <Tabs value={tabSelector} onChange={onTabChange}  variant="scrollable"
          scrollButtons="auto"  aria-label={props.name} {...props}>
            {
                props.labels.map((label, index) => {
                    
                    return <Tab label={label} {...a11yProps(index)} />;
                })
            }
        </Tabs>
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
