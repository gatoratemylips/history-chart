import Menu from './Menu';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from './toggleSlice'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';


const ChartHelper = () => {
  const dispatch = useDispatch();
  const toggle = useSelector(state => state.toggle.value);
  const datas = [1, 10, 100000, 110, 12, 100000, 35, 2932, 23423];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const transformedYData = datas.map(value => Math.log10(value));
  const options = {
    scales: {

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
      tooltip: {
        xAlign: "left",
        yAlign: "bottom",
        border: 20,
        position: 'nearest',
        caretSize: 0,
        cornerRadius: 0,
        titleColor: 'rgb(0,30,800)',
        borderColor: 'rgb(30,0,1000)',
        opacity: 0.5,
        backgroundColor: 'rgba(94, 5, 97,0.4)',
        titleFont: { size: 13.2, family: "Yekan" },
        bodyFont: { size: 14.2, family: "Yekan" },
        callbacks: {

          title: (context) => `Month: ${monthNames[context[0].label - 1]}`,
          label: (context) => {
            const originalValue = Math.pow(10, context.parsed.y).toFixed(0);

            return `Value: ${toggle ? context.parsed.y : originalValue}`;
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

  while (start <= datas.length) {
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
        borderColor: 'rgb(200, 1, 12)',
        backgroundColor: 'rgb(200, 1, 12)',
        cubicInterpolationMode: "monotone",

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
      <Menu/>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartHelper;