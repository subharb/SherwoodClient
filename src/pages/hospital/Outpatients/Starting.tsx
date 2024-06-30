import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { ButtonAdd, LinkStyled, ListStyled, TypographyStyled } from '../../../components/general/mini_components';
import { IAgenda, IBox } from '../../../constants/types';
import { IService } from '../Service/types';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import { HOSPITAL_BILLING } from '../../../routes/urls';

interface StartingProps {
    hasBoxes:boolean
    hasServices:boolean,
    hasBillingInfo:boolean,
    callbackAddBox:() => void
    callbackAddService:() => void
    callbackAddAgenda:() => void
}

const RowElement = styled.div`
    display: flex;
    align-items: center;
    height:60px;
`;
const ButtonContainer = styled.div`
    text-align:center;
    width: 3rem;
`;

const StartingOutpatients: React.FC<StartingProps> = ({ hasBoxes, hasServices, hasBillingInfo, callbackAddBox, callbackAddAgenda, callbackAddService }) => {

    if(!hasBillingInfo){
        return (
            <div style={{padding:'1rem'}}>
                <TypographyStyled variant='body2'><Translate id="pages.hospital.outpatients.edit.no_billing" /><LinkStyled to={HOSPITAL_BILLING}><Translate id="general.here" /></LinkStyled></TypographyStyled>
            </div>
        )
    }
    return (
        
<>          <div style={{padding:'1rem'}}>
                <TypographyStyled variant='body2'><Translate id="pages.hospital.outpatients.edit.first_setup.title" /></TypographyStyled>
                <ListStyled>
                    <li><TypographyStyled variant='body2'><Translate id="pages.hospital.outpatients.edit.first_setup.explanation.box" /></TypographyStyled></li>
                    <li><TypographyStyled variant='body2'><Translate id="pages.hospital.outpatients.edit.first_setup.explanation.service" /></TypographyStyled></li>
                    <li><TypographyStyled variant='body2'><Translate id="pages.hospital.outpatients.edit.first_setup.explanation.agenda" /></TypographyStyled></li>
                </ListStyled>
                
            </div>
            
            <div style={{width:'50%', padding:'1rem'}}>
                <Card style={{padding : '1rem'}}>
                
                    <RowElement>
                        <div style={{width: '10rem'}}>
                            <Typography variant='body2'>1. Box</Typography>
                        </div>
                        <ButtonContainer >
                            {
                                hasBoxes && <CheckIcon color='secondary' />
                            }
                        </ButtonContainer>
                        <ButtonContainer >
                            <ButtonAdd onClick={callbackAddBox}  />
                        </ButtonContainer>
                    </RowElement> 
                    <RowElement>
                        <div style={{width: '10rem'}}>
                            <Typography variant='body2'>2. Service</Typography>
                        </div>
                        <ButtonContainer>
                            {
                                hasServices && <CheckIcon color='secondary' />
                            }
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonAdd onClick={callbackAddService} />
                        </ButtonContainer>
                    </RowElement> 
                    <RowElement>
                        <div style={{width: '10rem'}}>
                            <Typography variant='body2'>3. Agenda</Typography>
                        </div>
                        <ButtonContainer>
                            
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonAdd disabled={!hasBoxes || !hasServices} 
                                onClick={callbackAddService} />
                        </ButtonContainer>
                    </RowElement> 
                
                    
        </Card>
        </div>
        </>
    );
};

export default StartingOutpatients;
