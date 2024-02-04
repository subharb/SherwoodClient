import React, { useEffect, useMemo, useState } from 'react';
import { IField, IPatient, ISection, ISubmission, ISurvey } from '../../../constants/types';
import { BillingInfo } from '../Billing/types';
import { Button, Grid, Typography } from '@mui/material';
import { Translate } from 'react-localize-redux';
import SurveyRecordsTable from '../SurveyRecordsTable';
import { ButtonBack, TypographyStyled } from '../../../components/general/mini_components';


interface SubmissionsTableSelectorProps {
    surveys:ISurvey[],
    locale:string,
    records: ISubmission[],
    billingInfo: BillingInfo | null,
    onSelectSubmission: (index:number) => void;
}

const SubmissionsTableSelector: React.FC<SubmissionsTableSelectorProps> = ({ surveys, locale, 
                                        records, billingInfo, onSelectSubmission }) => {
    const surveysWithRecords = useMemo(() => {
        return records.reduce((acc:ISurvey[], current:ISubmission) => {
                const surveyRecord = surveys.find((survey) => {
                    return survey.uuid === current.uuidSurvey
                })
                if(surveyRecord && !acc.find((survey) => survey.uuid === surveyRecord.uuid)){
                    acc.push(surveyRecord)
                }
                return acc;
            }, [])                           
    }, [records])                  
    
    const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null);                                                                
    
    useEffect(() => {
        if(surveysWithRecords.length === 1){
            setSelectedSurvey(surveys[0]);
        }
    }, [surveysWithRecords]);

    function onSurveySelected(survey:ISurvey){
        setSelectedSurvey(survey);
    }

    function renderSelector(){
        
        return(
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='body2'>
                        <Translate id="hospital.patient.submission-table.selector.title" />
                    </Typography>
                </Grid>
                {
                    surveysWithRecords.sort((a, b) => a.order - b.order).map((survey) => {
                        return (
                            <Grid item xs={12}>
                                <Button onClick={() => onSurveySelected(survey)}>
                                    <TypographyStyled variant='body2'>
                                        {survey.name}
                                    </TypographyStyled>
                                </Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
        ) 
    }                                                                
    if(selectedSurvey){
        const surveysRecords = records.filter((record) => record.uuidSurvey === selectedSurvey.uuid)
        if(surveysRecords.length > 0){
            const fieldsSurvey:IField[] = selectedSurvey.sections.reduce((acc:IField[], current:ISection) => {
                return acc.concat(current.fields)
            }, [])
            return (
                <Grid container xs={12}>
                    {
                        surveysWithRecords.length > 1 && 
                        <Grid item xs={12}>
                            <ButtonBack onClick={() => setSelectedSurvey(null)}></ButtonBack>
                        </Grid>
                    }
                    
                    <Grid item xs={12}>
                        <SurveyRecordsTable fields={fieldsSurvey} submissions={surveysRecords} 
                            locale={locale} onSelectSubmission={(index) => onSelectSubmission(index)}  
                        />    
                    </Grid>
                </Grid>
            )
        }
        else{
            return <span>No records found</span>;
        }
        
    }
    return renderSelector()
};

export default SubmissionsTableSelector;
