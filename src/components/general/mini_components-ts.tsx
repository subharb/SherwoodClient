import { Chip } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const ColourChip = styled.button<{rgbcolor:any, selected:boolean}>`
    display: inline-block;
    align-items: center;
    xheight: 32px;
    white-space: nowrap;
    border-radius:6px;
    padding: 0px 6px;
    cursor: pointer;
    font-size: 0.875rem;
    background-color: ${(props) => props.selected ? 'white' : props.rgbcolor};
    color: ${(props) => props.selected ? 'black' : 'white'};
    outline: ${(props) => '3px '+props.rgbcolor+' solid'};
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