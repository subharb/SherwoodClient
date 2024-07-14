import TimelineIcon from '@mui/icons-material/Timeline';
import styled, { css, withTheme } from 'styled-components';
import icon_male from "../../img/icons/icon_male.svg";
import { Link } from 'react-router-dom'
import icon_female from "../../img/icons/icon_female.svg";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import icon_undefined from "../../img/icons/icon_undefined.svg";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { green, blue } from '@mui/material/colors';
import {
    Add as AddIcon,
    Info as InfoIcon,
    Image as ImageIcon,
    HighlightOff as CloseIcon,
    RemoveRedEye as RemoveRedEyeIcon,
    PanoramaFishEye as PanoramaFishEyeIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    Save as SaveIcon,
    Clear as ClearIcon,
    Delete as DeleteIcon,
    Send as SendIcon,
    Edit as EditIcon,
    AddCircle as PlusIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    ArrowBackIos as ArrowBackIosIcon,
    LocalHospital as HospitalIcon,
    MonetizationOn as MonetizationOnIcon,
    Today as TodayIcon,
    Hotel as HotelIcon,
    Undo as UndoIcon,
    PictureAsPdf as PdfIcon,
    Settings as SettingsIcon,
    ArrowBack as ArrowBackIcon,
    Today,
    DirectionsRun
  } from "@mui/icons-material";
  import {
    Icon, IconButton,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Fab as MuiFab,
    IconButton as MuiIconButton,
    
    Typography, Box, Grid, FormHelperText, FormControl, InputLabel, Select
  } from "@mui/material";  
  
  import Button from '@mui/material/Button';

import { spacing } from "@mui/system";

export const IconGenerator = withTheme((props) => {
    switch(props.type){
        case "add":
            return <AddIcon style={{color:props.theme.buttonContinue.primary.background }} />
        case "view": 
            return <RemoveRedEyeIcon style={{color:"#000"}} fontSize={props.size ? props.size : "small"}/>
        case "delete":
            return <DeleteIcon style={{color:"red"}} fontSize={props.size ? props.size : "small"}/>
        case "edit":
            return <EditIcon  fontSize={props.size ? props.size : "small"}/>
        case "hospital":
            return <HotelIcon style={{color:"#000"}} fontSize={props.size ? props.size : "small"} />
        case "appointment":
            return <Today style={{color:"#000"}} fontSize={props.size ? props.size : "small"}  />
        case "undo":
            return <UndoIcon style={{color:"#000"}} fontSize={props.size ? props.size : "small"}  />    
        case "settings":
            return <SettingsIcon style={{color:props.color ? props.color : props.theme.palette.primary.color }} fontSize={props.size ? props.size : "small"} {...props}  />
        case "back":
            return <ArrowBackIcon fontSize={props.size ? props.size : "small"} {...props}  />
        case "pharmacy":
            return <LocalPharmacyIcon style={{color:props.theme.palette.primary.color }} />
        case "outpatients":
            return <TodayIcon style={{color:props.theme.palette.primary.color }} />
        case "shoe_shop":
            return <DirectionsRun style={{color:props.theme.palette.primary.color }} />
        case "image":
            return <ImageIcon style={{color:props.theme.palette.primary.color }} />
        case "biotech":
            return <BiotechIcon fill={props.theme.palette.primary.color} fontSize={props.size ? props.size : "small"}  />
        case "info":
            return <InfoIcon style={{color:props.color ? props.color : props.theme.buttonContinue.primary.background }}  />
        case "analytics":
            return <TimelineIcon style={{color : props.theme.buttonContinue.primary.background }}   />
        case "billing":
            return <MonetizationOnIcon style={{color : props.theme.buttonContinue.primary.background }}  />
        case "pdf":
            return <PdfIcon style={{color : 'red' }}  />
        default:
            return <AddIcon />
    }
})

export const EditIconContinueColor = styled(EditIcon)`
    color:${props => props.theme.buttonContinue.primary.background}!important;
`;
export const BiotechIcon = (props) => {

    return <svg fill={props.fill} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11.5 42q-.65 0-1.075-.425Q10 41.15 10 40.5q0-.65.425-1.075Q10.85 39 11.5 39h8.9v-5.2h-.75q-4.05 0-6.85-2.8T10 24.15q0-3.05 1.675-5.525Q13.35 16.15 16.35 15.1q.2-1.9 1.775-3.2 1.575-1.3 3.575-1.15l-.55-1.55q-.25-.6.025-1.15.275-.55.875-.75l.65-.25-.05-.2q-.2-.7.025-1.35.225-.65.925-.9.7-.25 1.325.05t.975 1l.1.2.6-.2q.6-.25 1.125.025t.775.825l4.6 11.95q.25.6-.025 1.15-.275.55-.875.8l-.7.25.1.2q.3.6.025 1.25-.275.65-.925.9-.7.25-1.325-.025T28.4 22l-.1-.2-.75.25q-.6.25-1.15-.025-.55-.275-.75-.825l-.75-2q-.75.85-1.775 1.225-1.025.375-2.175.325-1.2-.05-2.375-.8t-1.775-1.9q-1.9.85-2.85 2.525Q13 22.25 13 24.15q0 2.8 1.925 4.725Q16.85 30.8 19.65 30.8H35.5q.65 0 1.075.425Q37 31.65 37 32.3q0 .65-.425 1.075-.425.425-1.075.425H25.4V39h11.1q.65 0 1.075.425Q38 39.85 38 40.5q0 .65-.425 1.075Q37.15 42 36.5 42Zm16.3-22.6 2.65-.95-4-10.3-2.65.95Zm-6.5-1.15q1.05 0 1.775-.725.725-.725.725-1.775 0-1.05-.725-1.775-.725-.725-1.775-.725-1.05 0-1.775.725-.725.725-.725 1.775 0 1.05.725 1.775.725.725 1.775.725Zm6.5 1.15Zm-6.5-3.75Zm.1 0Z"/></svg>
}



export const FieldWrapper = (props) => {
    if(props.noWrap){
        return props.children
    }
    else{
        return (
            <Grid item xs={12} sm={7} lg={4} {...props}>
                {props.children}
            </Grid>
        )
    }
}

export const GridContainer = styled(Grid)`
    display:flex;
    justify-content:center; 
    alignItems:center;
    color:${props => props.theme.palette.primary.color};
`;

export const BoxBckgr = styled(Box)`
    ${({ defaultStyles }) => !defaultStyles && css`
        background-color:${props => props.theme.palette.background.default};
        color:${props => props.theme.palette.primary.color};
    `}
    min-height:100vh;
`

export const Divider = styled(MuiDivider)(spacing);

const Fab = styled(MuiFab)(spacing);

const FabThemed = styled(Fab)`
    background-color: ${props => (props.disabled ? 'gray' : props.theme.buttonContinue.primary.background)}!important;
    color:${props => props.theme.buttonContinue.primary.color}!important;
`;

export const DeleteHolder = styled.div`
    display: flex;
    color:#E16580;
    cursor:pointer;
    align-items: center;
    justify-content: center;
`;

export const BasicButtonStyles = styled(Button)`
    ${props => !props.show} {
        display: none!important;
    }

    ${({ spaceright }) => spaceright && `
        margin-right:1rem!important;
    `}
    
`

export const IconPatient = (props) =>{

    const iconSex = props.gender.toLowerCase() === "male" ? icon_male : props.gender.toLowerCase() === "female" ? icon_female : icon_undefined;
    if(iconSex){
        return <img src={iconSex} alt={iconSex} width={props.width ? props.width : "40"} {...props} />
    }
    
    return null;
}
const GreyButtonStyles = styled(Button)`
    &&&{
        background: #E5E5E5;
        border: 3px solid ${props => props.theme.buttonContinue.primary.background};
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        text-decoration:none;
        text-align: center;
        font-weight: bold;
        color: rgba(39, 44, 42, 0.97);
        width:80%;
        @media (min-width: 768px) {
            width:20rem;
        }
    }
`;


export const ButtonOtherStyles = styled(BasicButtonStyles)`
    background-color:${props => props.theme.buttonOther.background}!important;
    color:${props => props.theme.buttonOther.color};
`;

export const ButtonCancelStyles = styled(BasicButtonStyles)`
    background-color:${props => props.theme.buttonCancel.background}!important;
    color:${props => props.theme.buttonCancel.color};
`;
export const ButtonContinueStyles = styled(BasicButtonStyles)`
    background-color:${props => !props.colorRGB ? props.theme.buttonContinue.primary.background :  props.colorRGB}!important;
    color:${props => props.color === "secondary" ? props.theme.buttonContinue.secondary.color : props.theme.buttonContinue.primary.color};
`;
export const ButtonIcon = styled(IconButton)`
    background-color:${props => props.theme.buttonContinue.background}!important;
    color:${props => props.theme.buttonContinue.color}!important;
`
export const LinkPlain = styled(Link)`
    text-decoration:none;
`
export const LinkStyled = styled(Link)`
    color:${props => props.theme.palette.primary.color};
    font-weight: 600;
    cursor:pointer;
`;

export const ListStyled = styled.ul`
    color:${props => props.theme.palette.primary.color};
    `;


export const ButtonGrey = (props) => {
    return(
        <GreyButtonStyles {...props}>
            {props.children}
        </GreyButtonStyles>)
}


export const ButtonEdit = (props) =>{
    return(
        <EditIconContinueColor {...props}>
            <EditIcon />
        </EditIconContinueColor>)
}

export const ButtonPlus = (props) =>{
    return(
        <Button {...props}>
            <PlusIcon />
        </Button>)
}

export const ButtonDelete = (props) =>{
    return(
        <DeleteHolder {...props}>
            <DeleteIcon />
        </DeleteHolder>
    )
}

export const ButtonTransfer = (props) =>{
    return(
        <Button {...props}>
            <SwapHorizIcon />
        </Button>
    )
}

export const ButtonBack = (props) =>{
    return <ButtonOtherStyles 
        variant="contained"
        color="primary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        {...props}
    >
        {props.children}
    </ButtonOtherStyles>
}

export const ButtonForward = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        color="primary"
        size="small"
        startIcon={<ArrowForwardIosIcon />}
        {...props}
    >
        {props.children}
    </ButtonContinueStyles>
}

export const ButtonContinue = (props) =>{
        return <ButtonContinueStyles
            variant="contained"
            color={props.color ? props.color : "primary"}
            size="small"
            colorRGB={green[500]}
            endIcon={<SendIcon />}
            {...props}
            data-testid={props['data-testid'] ? props['data-testid'] : "continue"}
        >
            {props.children}
        </ButtonContinueStyles>
}

export const ButtonAccept = (props) =>{
    return <ButtonContinueStyles
        variant="contained"
        color={props.color ? props.color : "primary"}
        size="small"
        {...props}
        data-testid={props['data-testid'] ? props['data-testid'] : "continue"}
    >
        {props.children}
    </ButtonContinueStyles>
}

export const ButtonOk = (props) =>{
    return <ButtonContinue 
        variant="contained"
        colorRGB={green[500]}
        style={{color:'white'}}
        size="small"
        {...props}
        data-testid={props['data-testid'] ? props['data-testid'] : "continue"}
    >
        {props.children}
    </ButtonContinue>
}

export const ButtonCancel = (props) =>{
    return <Button
        {...props}
        variant="contained"
        color="primary"
        size="small"
        endIcon={<ClearIcon />}
    >
        {props.children}
    </Button>
}

export const TypographyStyled = styled(Typography)`
    xpadding-top:2rem;
    color:${props => props.theme.palette.primary.color};
`

export const ButtonSave = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        color="primary" 
        size="small"
        startIcon={<SaveIcon />}
        {...props}
         >
            {props.children}
    </ButtonContinueStyles>
}

export const WhiteTypography = styled(Typography)`
    color:white;
    font-size: 1rem;
`;

const ButtonAction = styled.button`
    background:transparent;
    border:none;
`;
const CheckStyled = styled(CheckCircleOutlineIcon)`
    color:${props => props.checked ? 'green' : 'grey'};
`;


export const ButtonCheck2 = (props) => {
   
    function buttonClick(){
        
        props.onClick();
    }
    return <ButtonAction onClick={buttonClick} ><CheckStyled checked={props.checked}/></ButtonAction>
}

export const ButtonCheck = (props) =>{
    return <ButtonContinueStyles 
        variant="contained"
        size="small"
        color='primary'
        startIcon={<CheckCircleOutlineIcon />}
        {...props}
         >
            {props.children}
    </ButtonContinueStyles>
}

export const CheckCircleOutlineSvg = (props) => {
    return <CheckCircleOutlineIcon {...props} />
}
export const ButtonEmptyCheck = (props) =>{
    return <BasicButtonStyles 
        variant="contained" 
        size="small"
        startIcon={<PanoramaFishEyeIcon />}
        {...props}
         >
            {props.children}
    </BasicButtonStyles>
}

export const ButtonAdd = (props) =>{
    return  <FabThemed mx={2} size="small" aria-label="Add" {...props} >
                <AddIcon />
            </FabThemed>
}

export const CloseButton = (props) =>{
    return  <Button mx={2} size="small" color="secondary" aria-label="View" {...props} >
                <CloseIcon />
            </Button>
}

const CloseHolder = styled.div`
    position:relative;
    display:inline-block;
    margin-top:1rem;
    width: max-content;
`;
const CloseButtonHolder = styled.div`
    position:absolute;
    right:0px;
    margin-top:-20px;
    margin-right:-30px;
    display:${props => props.hide ? "none" : "block"};
`
export const RedFormHelperText = styled(FormHelperText)`
  color:red!important;
`

export const CloseFrame = (props) => {
    return(
        <CloseHolder>
            <CloseButtonHolder hide={props.hide}>
                <CloseButton onClick={props.onClick} />
            </CloseButtonHolder>
            {
                props.children
            }
        </CloseHolder>
    )
}

export const ButtonView = (props) =>{
    return  <Fab mx={2} size="small" color="secondary" aria-label="View" {...props} >
                <RemoveRedEyeIcon />
            </Fab>
    // return <ButtonContinueStyles
    //     variant="contained"
    //     color="primary"
    //     size="small"
    //     startIcon={<SaveIcon />}
    //      >
    //         {props.children}
    // </ButtonContinueStyles>
}

export const ButtonGreyBorderGrey = styled(ButtonGrey)`
    &&&{
        background: #E5E5E5;
        border: 5px solid #6F6C6D;
    }
`;