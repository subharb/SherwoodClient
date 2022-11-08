import { Chip } from "@material-ui/core";
import styled from "styled-components";

export const ColourChip = styled(Chip)<{rgbcolor:any}>`
    height: 20px;
    padding: 4px 0;
    font-size: 90%;
    background-color: ${(props) => props.rgbcolor};
    color: ${(props) => props.theme.palette.common.white};
`;