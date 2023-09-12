import { Chip, ChipProps  } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface CustomChipProps extends ChipProps {
    // Define any additional props or styles here
    rgbcolor:any, active?:boolean
  }

export const ColourChip = styled(Chip)<CustomChipProps>`
    display: inline-block;
    align-items: center;
    height: 22px!important;
    white-space: nowrap;  
    padding: 1px!important;
    cursor: pointer;
    font-size: 0.875rem!important;
    background-color: ${(props) => props.rgbcolor}!important;
    opacity: ${(props) => props.active ? '0.5' : '1'}!important;
    color: white!important;
    border:none;
`;

// export const ColourChip = (props:any) => {
//     const [selected, setSelected] = React.useState(false);
//     function onClick(){
//         setSelected(!selected);
//         props.onClick();
//     }
//     return <ColourChipButton selected={selected} onClick={onClick} />
// }