import { Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import iconImages from "../../img/icons/images_white.png";
import iconLab from "../../img/icons/lab_white.png";
import styled from 'styled-components';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { BiotechIcon, ButtonAdd, IconGenerator, TypographyStyled } from '../../components/general/mini_components';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import { red } from '@material-ui/core/colors';

interface SectionHeaderProps{
    section:string,
    edit:boolean,
    alterTitle?:string,
    addCallback?:() => void,
    editCallback?:()=>void,
    infoCallback?:()=>void,
}

const SectionContainer = styled.div`
    display:flex;
    padding:1rem;
`;

const IconHolder = styled.div`
    padding:0.4rem 0 1rem 0rem;
`;

const SectionHeader: React.FC<SectionHeaderProps> = ({ section, edit,alterTitle, addCallback, editCallback, infoCallback }) => {
   
    function renderIcon(){
        switch(section){
            case "laboratory":
                return <IconGenerator type="biotech" color="#fff" />
            case "medical-imaging":
                return <IconGenerator type="image" />
            case "pharmacy":
                return <IconGenerator type="pharmacy" />
            case "agenda":
            case "outpatients":
                return <IconGenerator type="outpatients" />
            case "shoe_shop":
                return <IconGenerator type="shoe_shop" />
            default:
                return null;
        }
    }
    const titlePath = alterTitle ? alterTitle : `pages.hospital.${section}.title`;
    return (
        <SectionContainer>
            
                <IconHolder>
                    {
                        renderIcon()
                    }
                </IconHolder>
        
        <div>
            <TypographyStyled variant="h3" gutterBottom display="inline">
                <Translate id={titlePath} />
            </TypographyStyled>
            {
                editCallback && 
                    <IconButton 
                    onClick={(e) => {
                        editCallback();
                    }}>
                    <IconGenerator type={!edit ? "settings" : "back"} color="#fff" />
                </IconButton>
            }
            {
                infoCallback && 
                    <IconButton 
                    onClick={(e) => {
                        infoCallback();
                    }}>
                    <IconGenerator type="info" color="#fff" />
                </IconButton>
            }
            
        </div>
        {
            addCallback &&
            <ButtonAdd onClick={addCallback} />
        }
    </SectionContainer>
    
    );
};

export default SectionHeader;
