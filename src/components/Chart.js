import Menu from './Menu';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux'
import { animation } from './animation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { externalTooltipHandler } from './ExternalTooltip';
import { customDataLabels } from './customDatalabels';
import { database } from 'faker/lib/locales/en';

const ChartHelper = () => {

  const dataJson =
    [
      { "data": null },
      { "data": 154440 },
      { "data": 1 },
      { "data": 200 },
      { "data": 110 },
      { "data": 10 },
      { "data": 200 },
      { "data": 6034 },
      { "data": 12 },
      { "data": 242424 }, { "data": 134510 },
      { "data": 150124 },
      { "data": 120 }, { "data": 110 },
      { "data": 10 },
      { "data": 45200 }, { "data": 110 },
      { "data": 140 },
      { "data": 12200 }, { "data": 110 },
      { "data": 1530 },
      { "data": 120420 }, { "data": 110 },
      { "data": 1502 },
      { "data": 10 }, { "data": 110 },
      { "data": 50 },
      { "data": 14200 },
      { "data": 40 },
      { "data": 200 }, { "data": 110 },
      { "data": 31233150 },
      { "data": 120032 }, { "data": 110 },
      { "data": 153454350 },
      { "data": 120 }, { "data": 110 },
      { "data": 10 },
      { "data": 1 }, { "data": 10 },
      { "data": 1504 },
      { "data": 12020 }, { "data": 110 },
      { "data": 15023 },
      { "data": 1200123 }, { "data": 99991200 }, { "data": 110 },
      { "data": 150 },
      { "data": 1200 }, { "data": 110 },
      { "data": 15024 },
      { "data": 1200 }, { "data": 110 },
      { "data": 150 },
      { "data": 120340 }, { "data": 110 },
      { "data": 150 },
      { "data": 1200 }, { "data": 1200 }, { "data": 110 },
      { "data": 150 },
      { "data": 1200 }, { "data": 110 },
      { "data": 1502234 },
      { "data": 1200 }, { "data": 11433423244320 },
      { "data": 15034 },
      { "data": 1200 }, { "data": 11432320 },
      { "data": 12502 },
      { "data": 1200 }, { "data": 12433200 }, { "data": 11434320 },
      { "data": 14450 },
      { "data": 4441200 }, { "data": 12343210 },
      { "data": 154340 },
      { "data": 1200 }, { "data": 110432324 },
      { "data": 1520 },
      { "data": 12200 }, { "data": 11234234320 },
      { "data": 150 },
      { "data": 1040 },
      { "data": 150 },
      { "data": 12200 }, { "data": 11234234320 },
      { "data": 150 },
      { "data": 1040 },
      { "data": 150 },
      { "data": 12200 }, { "data": 11234234320 },
      { "data": 150 },
      { "data": 1040 },
      { "data": 150 },




    ];
  var labelss = [
    'Mercury',
    '',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
  ];
  const datass = [];
  for (var i = 0; i < dataJson.length; i++) {
    var object = dataJson[i];
    datass.push(object.data);
  }
  const color = useSelector(state => state.change.value)
  const toggle = useSelector(state => state.toggle.value);
  const datas = datass;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  ChartJS.register({


  },
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,

  );

  const year = {
    id: 'year',
    beforeDraw(chart, args, pluginOptions) {
      const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x } } = chart;

      // Calculate the interval width for shading
      const numTicks = datass.length; // Number of intervals
      const intervalWidth = width / numTicks;
      const offset = intervalWidth * 0.5;

      // Shade the first 12 intervals and then leave the next 12 unshaded in a repeating pattern
      for (let i = 0; i <= numTicks; i++) {
        if ((i % 24 >= 12)) {
          const startX = left + (i * intervalWidth) + offset;
          const endX = startX + intervalWidth;
          // Shading style
          ctx.fillStyle = 'rgba(102, 102, 102, 0.2)';
          ctx.fillRect(startX, top, intervalWidth, height);
        }
      }
    },
  };



  const transformedYData = datas.map(value => Math.log10(value));
  const options = {

    layout: {
      padding: {
        left: 50
      }
    },
    chartArea: {
      backgroundColor: 'rgba(251, 85, 85, 0.4)'
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    },
    //animation,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        
        grid: {
          offset: false,
          drawOnChartArea: false,
        },
        ticks: {
          grace : false,
          beginAtZero: true,
          autoSkip: true,

        }
      },
      y: {


        type: 'linear', // Linear scale for the y-axis
        beginAtZero: true,
        suggestedMax: Math.max.apply(null, toggle ? datas : transformedYData) * (12 / 10),
        ...!toggle && {
          ticks: {
            callback: value => Math.pow(10, value).toFixed(0), // Convert back to original values
          },
        },
      },
    },

    responsive: true,
    plugins: {
      year,
      datalabels: customDataLabels,
      tooltip: {
        intersect: false,
        // external: externalTooltipHandler,
        enabled: false,
        xAlign: "left",
        yAlign: "bottom",
        border: 20,
        position: 'nearest',
        caretSize: 0,
        cornerRadius: 0,
        titleColor: 'rgb(0,30,800)',
        borderColor: 'rgb(30,0,1000)',
        opacity: 1,
        backgroundColor: 'rgba(94, 5, 97,0.4)',
        titleFont: { size: 13.2, family: "Yekan" },
        bodyFont: { size: 14.2, family: "Yekan" },
        callbacks: {
          title: (context) => {
            if (context.dataIndex !== 2) {

              return null
            }
            else {
              return `Month: ${monthNames[context[0].label - 1]}`
            }
          },
          label: (context) => {
            if (context.dataIndex === 2) {
              return 'All Time Record'
            }
            if (context.dataIndex === 3) {
              return 'EOY Sale'
            }

            const originalValue = Math.pow(10, context.parsed.y).toFixed(0);
            return null

            //return `Value: ${toggle ? context.parsed.y : originalValue}`;
          },

        },
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sign Up Line Chart',
      },

    },
  };




  var start = 1;

  var labels = [];
  labels.push('');
  while (start <= datas.length) {
    if (start === datas.length) {
      labels.push('');
      break
    }

    if (start % 12 === 0) {
      labels.push(12)
      start++
      continue
    }
    labels.push((start++) % 12)
  }



  const data = {
    labels,
    datasets: [
      {
        label: 'Sign Up',
        data: toggle ? datas : transformedYData,
        borderColor: color,
        backgroundColor: color,
        cubicInterpolationMode: "monotone",
        url: null,
        fill: false,
        pointRadius: 1,
        pointHoverRadius: 1,
      },


      /* {
         label: 'Dataset 2',
         data: labels.map(() => faker.datatype.number({ min: 1000, max: 3000 })),
         borderColor: 'rgb(53, 162, 235)',
         backgroundColor: 'rgba(53, 162, 235, 0.5)',
       }, */
    ],
  };



  return (
    <div>
      <Menu />
      <Line options={options} data={data} plugins={[year]} />
    </div>
  );
}

export default ChartHelper;
