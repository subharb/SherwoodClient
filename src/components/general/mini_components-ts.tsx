import { Chip } from "@mui/material";
import styled from "styled-components";

export const ColourChip = styled(Chip)<{rgbcolor:any}>`
    height: 20px;
    padding: 4px 0;
    font-size: 90%;
    -webkit-tap-highlight-color: ${(props) => props.rgbcolor}!important;
    background-color: ${(props) => props.rgbcolor};
    color: white;
    &:hover {
        background-color: ${(props) => props.rgbcolor};
    }
    &:blur {
        background-color: ${(props) => props.rgbcolor};
    }
`;