import { Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import iconImages from "../../img/icons/images_white.png";
import iconLab from "../../img/icons/lab_white.png";
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';
import { BiotechIcon, ButtonAdd, IconGenerator } from '../../components/general/mini_components';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

interface SectionHeaderProps {
    section:string,
    edit:boolean,
    addCallback?:() => void,
    editCallback?:()=>void,
    infoCallback?:()=>void,
}

const IconHolder = styled.div`
    padding:0.7rem 1rem;
`;

const TypographyStyled = styled(Typography)`
    color:${props => props.theme.palette.primary.color};
`

const SectionHeader: React.FC<SectionHeaderProps> = ({ section, edit, addCallback, editCallback, infoCallback }) => {
   
    function renderIcon(){
        switch(section){
            case "laboratory":
                return <IconGenerator type="biotech" />
            case "medical-imaging":
                return <img src={iconImages } alt="images" width="20" />
            case "pharmacy":
                return <IconGenerator type="pharmacy" />
            case "shoe_shop":
                return <IconGenerator type="shoe_shop" />
            default:
                return null;
        }
    }
    return (
        <>
        <IconHolder>
            {
                renderIcon()
            }
        </IconHolder>
        <div>
            <TypographyStyled variant="h3" gutterBottom display="inline">
                <Translate id={`pages.hospital.${section}.title`} />
            </TypographyStyled>
            {
                editCallback && 
                    <IconButton 
                    onClick={(e) => {
                        editCallback();
                    }}>
                    <IconGenerator type={!edit ? "settings" : "back"} />
                </IconButton>
            }
            {
                infoCallback && 
                    <IconButton 
                    onClick={(e) => {
                        infoCallback();
                    }}>
                    <IconGenerator type="info" />
                </IconButton>
            }
            
        </div>
        {
            addCallback &&
            <ButtonAdd onClick={addCallback} />
        }
    </>
    
    );
};

export default SectionHeader;
