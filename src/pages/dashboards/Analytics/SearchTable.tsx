import React, { useEffect, useState } from 'react';
import { Button, Button as MuiButton, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils/index.jsx';
import AutocompleteSherwood from '../../../components/general/Autocomplete';
import ICTSelectorOMS from '../../../components/general/SmartFields/ICT/ICTSelectorOMS';
import ICT from '../../../components/general/SmartFields/ICT';
import Loader from '../../../components/Loader';
import { getStatsPerDiagnosisService } from '../../../services';
import { Bar } from "react-chartjs-2";
import { red } from '@mui/material/colors';
import { LIST_COLORS } from '../../hospital/Analytics';

interface Props extends LocalizeContextProps{
    label:string,
    title:string,
    uuidInvestigation:string,
    startDate:Date, 
    endDate:Date,
    locale:string
}

function SearchTable(props:Props){
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [ict, setICT] = useState(null);

    function renderResults(){
        if(loading){
            return <Loader />
        }
        else if(JSON.stringify(stats) === '{}' ){
            return "No hay resultados"
        }
        else if(stats !== null && ict) {
            const labels = Object.keys(stats).map(key => {
                const date = new Date(key);
                return date.toLocaleString(props.locale,{month:'short', year:'numeric'})
            })
            const data = {
                labels: labels,
                datasets: [
                  {
                    label: ict["ict"],
                    backgroundColor: LIST_COLORS[0],
                    borderColor: red[500],
                    hoverBackgroundColor: red[500],
                    hoverBorderColor: red[500],
                    data: Object.values(stats),
                    barPercentage: 1 / Object.values(stats).length + 0.2,
                    categoryPercentage: 0.5,
                  }
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
        setICT(ict);
        getStatsPerDiagnosisService(props.uuidInvestigation, ict["ict-code"], new Date(2020, 0, 1).getTime(), new Date().getTime())
            .then(response => {
                setStats(response.stats)
            })
    }
    function resetICTSelectorCallback(){ 
      setStats(null);
    }
    return(
        <Paper style={{padding:'1rem'}}>
            <Typography variant="h4" gutterBottom={true}>{props.title}</Typography>
            
              <ICT type="ict" variant='outlined' language={props.activeLanguage.code} typeMargin="normal" 
                  error={false} elementSelected={diagnoseSelectedCallBack}
                  resetICTSelectorCallback = {resetICTSelectorCallback}/>
              
            {
                renderResults()
            }
        </Paper>
    )
        
}

export default withLocalize(SearchTable)