import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';
import { colors } from '@mui/material';


export const RadialChartLine = ({series}: {series: number[]}) => {
    const theme = useTheme();
  
    const chart = {
        options: {
          chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
              show: false
            },
            zoom: false
          },
          colors: [
            'rgba(86, 100, 210, 0.5)',
            '#FFB547',
            '#7BC67E',
            '#64B6F7',
            colors.blueGrey[700]
          ],
          dataLabels: {
            enabled: false
          },
          legend: {
            fontSize: 14,
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.subtitle2.fontWeight,
            itemMargin: {
              vertical: 8
            },
            markers: {
              width: 8,
              height: 8
            },
            show: false
          },
          stroke: {
            width: 0
          },
          theme: {
            mode: theme.palette.mode
          }
        },
        series: series
      };
  
    return (
        <Chart
          height={110}
          type="donut"
          {...chart}
        />
    );
  };