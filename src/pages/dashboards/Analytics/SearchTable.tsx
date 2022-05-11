import React, { useEffect, useState } from 'react';
import { Button, Button as MuiButton, Grid, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils';
import AutocompleteSherwood from '../../../components/general/Autocomplete';
import ICTSelectorOMS from '../../../components/general/SmartFields/ICT/ICTSelectorOMS';
import ICT from '../../../components/general/SmartFields/ICT';
import Loader from '../../../components/Loader';
import { getStatsPerDiagnosisService } from '../../../services/sherwoodService';
import { Bar } from "react-chartjs-2";
import { red } from '@material-ui/core/colors';

interface Props extends LocalizeContextProps{
    label:string,
    title:string,
    uuidInstitution:string,
    startDate:Date, 
    endDate:Date,
    locale:string
}

function SearchTable(props:Props){
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    

    function renderResults(){
        if(loading){
            return <Loader />
        }
        else if(JSON.stringify(stats) === '{}' ){
            return "No hay resultados"
        }
        else if(stats !== null) {
            const labels = Object.keys(stats).map(key => {
                const date = new Date(key);
                return date.toLocaleString(props.locale,{month:'short', year:'numeric'})
            })
            const data = {
                labels: labels,
                datasets: [
                  {
                    label: "Mobile",
                    backgroundColor: red[500],
                    borderColor: red[500],
                    hoverBackgroundColor: red[500],
                    hoverBorderColor: red[500],
                    data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
                    barPercentage: 0.4,
                    categoryPercentage: 0.5,
                  },
                  {
                    label: "Desktop",
                    backgroundColor: red[500],
                    borderColor: red[500],
                    hoverBackgroundColor: red[500],
                    hoverBorderColor: red[500],
                    data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
                    barPercentage: 0.4,
                    categoryPercentage: 0.5,
                  },
                ],
              };
            
              const options = {
                maintainAspectRatio: false,
                cornerRadius: 2,
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                      stacked: true,
                      ticks: {
                        stepSize: 20,
                        fontColor: "#000",
                      },
                    },
                  ],
                  xAxes: [
                    {
                      stacked: true,
                      gridLines: {
                        color: "transparent",
                      },
                      ticks: {
                        fontColor: "#000",
                      },
                    },
                  ],
                },
              };
            return <Bar data={data} options={options} />
        }
    }
    function diagnoseSelectedCallBack(ict:any){
        getStatsPerDiagnosisService(props.uuidInstitution, ict["ict-code"], props.startDate, props.endDate)
            .then(response => {
                setStats(response.stats)
            })
    }

    return(
        <Paper style={{padding:'1rem'}}>
            <Typography variant="h4" gutterBottom={true}>{props.title}</Typography>
            <ICT type="ict" variant='outlined' language={props.activeLanguage.code} typeMargin="normal" 
                error={false} elementSelected={diagnoseSelectedCallBack}/>
            {
                renderResults()
            }
        </Paper>
    )
        
}

export default withLocalize(SearchTable)