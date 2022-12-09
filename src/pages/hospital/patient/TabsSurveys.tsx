import { Grid } from '@material-ui/core';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { ButtonGreyBorderGrey, WhiteTypography } from '../../../components/general/mini_components';

import { IUnit } from '../../../constants/types';
import { TabsSherwood } from '../../components/Tabs';

interface TabsSurveysProps {
    surveys: any[],
    units:IUnit[],
    surveySelectedCallback:(index:number) => void
}

const TabsSurveys: React.FC<TabsSurveysProps> = ({ surveys, units, surveySelectedCallback }) => {
    
    function renderSurveysInUnit(surveysPerUnit:{[id: string] : any[]}){
        const surveysInUnit = Object.values(surveysPerUnit).map((surveysInUnit) => <Grid container xs={12} style={{textAlign:"center"}}>{surveysInUnit.map((dataCollection, index) => {
            return(
                <Grid item xs={12} style={{textAlign:"center", marginTop:"0.5rem"}}>
                    <ButtonGreyBorderGrey data-testid={dataCollection.name} onClick={() => surveySelectedCallback(dataCollection.uuid)}>{dataCollection.name}</ButtonGreyBorderGrey>
                </Grid>
            )})
        }</Grid>)
        return(
            surveysInUnit
            )
        
    }
    function renderSurveys(){
        const orderedSurveys = surveys.sort((a,b) => a.order - b.order)
        const buttonSurveys = surveys.sort((a,b) => a.order - b.order).map((dataCollection, index) => {
            return(
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <ButtonGreyBorderGrey data-testid={dataCollection.name} onClick={() => surveySelectedCallback(dataCollection.uuid)}>{dataCollection.name}</ButtonGreyBorderGrey>
                </Grid>
            )
        });
        const filteredSurveysWithUnit = orderedSurveys.filter((survey) => survey.unit);
        if(filteredSurveysWithUnit.length === 0){
            return buttonSurveys
        }
        else{
            const surveysPerUnitDict:{[id: string] : any[]} = {};
            const unitsWithSurveys:IUnit[] = [];
            
            units.forEach((unit) => {
                const surveysInUnit = filteredSurveysWithUnit.filter((survey) => {
                    console.log(survey);
                    return survey.unit.uuid === unit.uuid
                })
                if(surveysInUnit.length > 0 && unit.uuid){
                    surveysPerUnitDict[unit.uuid] = surveysInUnit;
                    unitsWithSurveys.push(unit);
                }
                })
            const surveysPerUnit = renderSurveysInUnit(surveysPerUnitDict);
            
            if(unitsWithSurveys.length === 1){
                return renderSurveysInUnit(surveysPerUnitDict)
            }
            if(unitsWithSurveys.length === 0){
                return filteredSurveysWithUnit.map((survey) => {
                    return(
                        <Grid item xs={12} style={{textAlign:"center", marginTop:"0.5rem"}}>
                            <ButtonGreyBorderGrey data-testid={survey.name} onClick={() => surveySelectedCallback(survey.uuid)}>{survey.name}</ButtonGreyBorderGrey>
                        </Grid>
                    )
                })
            }
            return (
                <div >
                    <TabsSherwood name="Billing Info" style={{  color: "white" }} 
                        labels={unitsWithSurveys.map((unit)=> unit.name)} >
                            { renderSurveysInUnit(surveysPerUnitDict)}
                            <></>
                    </TabsSherwood>
            </div>)
        }
    }
    return (
        <>
            <Grid item xs={6} style={{textAlign:"left"}}>
                <WhiteTypography variant="body2" gutterBottom>
                    <Translate id="hospital.data-collections" />:
                </WhiteTypography>
            </Grid>
           {
                renderSurveys()
           } 
        </>
    );
};

export default TabsSurveys;
