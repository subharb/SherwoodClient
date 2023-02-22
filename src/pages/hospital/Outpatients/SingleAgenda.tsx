import { Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { ColourChip } from '../../../components/general/mini_components-ts';
import { IAgenda, IBox } from '../../../constants/types';
import {researcherFullName} from '../../../utils';

interface SingleAgendaProps {
    uuidAgenda: string;
}

const SingleAgenda: React.FC<SingleAgendaProps> = ({ uuidAgenda }) => {
    return (
        <>
        </>
    );
};

export default SingleAgenda;

interface SingleAgendaCoreProps {
    agenda: IAgenda
}

export const SingleAgendaCore: React.FC<SingleAgendaCoreProps> = ({ agenda }) => { 
    function renderAgendaInfo(){
        const box = agenda.box as IBox;
        return(
            <Grid item xs={12}>
                <Card style={{padding:"1rem"}}>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="general.name" />: </span>{agenda.name}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.doctor" />: </span>{researcherFullName(agenda.principalResearcher)}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.departments.department" />: </span>{agenda.department ? agenda.department : <Translate id="general.not_defined" />}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.slotsPerDay" />: </span>{agenda.slotsPerDay}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.box.title" />: </span>{box.name}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.week_days" />: </span>{agenda.daysWeek.map((day) => {
                        return <ColourChip size="small" label={<Translate id={`general.week_days.${day}`}  />} rgbcolor="#000" />
                    })}</Typography> </div>
                </Card>  
            </Grid>
        )
    }
    return (
        <>
            {
                renderAgendaInfo()
            }
            
        </>
    );
};
