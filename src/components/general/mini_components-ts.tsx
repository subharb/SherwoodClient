import { Chip, ChipProps  } from "@mui/material";
import React, { Component } from "react";
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
    .MuiChip-avatar {
        /* Set the color you want for the icon */
        color: white!important; /* Replace 'red' with your desired color */
    }
`;

const ColourButtonComponent = styled.span<CustomChipProps>`
    display: inline-block;
    align-items: center;
    height: 22px!important;
    width:22px;
    padding-top:0.1rem;
    padding-left:0.15rem;
    background-color: ${(props) => props.rgbcolor}!important;
    opacity: ${(props) => props.active ? '0.5' : '1'}!important;
    color: white!important;
    border-radius: 50%;
`;



export const ColourButton = (props) => {
    const iconStyles = {color:'#fff', fontSize:'1.1rem', textAlign:'center'}
    const ClonedElementWithMoreProps = React.cloneElement(
        props.icon, 
        { style : iconStyles}
    );
    return (
        <ColourButtonComponent {...props}>
            { ClonedElementWithMoreProps }
        </ColourButtonComponent>
    );
};
// export const ColourChip = (props:any) => {
//     const [selected, setSelected] = React.useState(false);
//     function onClick(){
//         setSelected(!selected);
//         props.onClick();
//     }
//     return <ColourChipButton selected={selected} onClick={onClick} />
// }