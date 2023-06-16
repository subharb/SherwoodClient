import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { ButtonAdd } from '../../../components/general/mini_components';
import { IAgenda, IBox } from '../../../constants/types';
import { IService } from '../Service/types';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';

interface StartingProps {
    hasBoxes:boolean
    hasServices:boolean
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

const StartingOutpatients: React.FC<StartingProps> = ({ hasBoxes, hasServices, callbackAddBox, callbackAddAgenda, callbackAddService }) => {

    return (
        
<>          <div style={{padding:'1rem'}}>
                <Typography variant='body2'>In order to start using outpatients you need to have the following elements set up:</Typography>
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
