import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';


export const BarChartLine = () => {
    const theme = useTheme();
  
    const chart = {
      options: {
        chart: {
          background: 'transparent',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#7783DB'],
        dataLabels: {
          enabled: false
        },
        grid: {
          show: false
        },
        states: {
          normal: {
            active: {
              filter: {
                type: 'none'
              }
            },
            filter: {
              type: 'none',
              value: 0
            }
          }
        },
        stroke: {
          width: 0
        },
        theme: {
          mode: theme.palette.mode
        },
        tooltip: {
          enabled: false
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false
          }
        },
        yaxis: {
          show: false
        }
      },
      series: [
        {
          data: [10, 20, 30, 40, 50, 60, 5]
        }
      ]
    };
  
    return (
      <Chart
        type="bar"
        width={120}
        {...chart}
      />
    );
  };