import React from 'react';
import Chart from 'chart.js/auto';
import { useState } from 'react';



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
import { Line } from 'react-chartjs-2';
import faker from 'faker';
const datas = [1, 150, 100, 10000, 10000000];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var thing = true;
const ChartComponent = () => {
  const [scaleType, setScaleType] = useState('linear'); // Initial scale type is linear

  const toggleScale = () => {
    setScaleType(prevScaleType => prevScaleType === 'linear' ? 'logarithmic' : 'linear');
  };

  // Rest of your component code
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      type: 'linear',
      beginAtZero: true,
      ticks: {
        callback: value => Math.pow(10, value).toFixed(0), // Convert back to original values
      },
      //suggestedMax: Math.max.apply(null, datas)*(12/10),
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      titleFont: { size: 13.2, family: "Yekan" },
      bodyFont: { size: 14.2, family: "Yekan" },
      callbacks: {
        title: (context) => `Month: ${monthNames[context[0].label - 1]}`,
        label: (context) => {
          const originalValue = Math.pow(10, context.parsed.y).toFixed(0);

          return `Sign Ups: ${originalValue}`;
        },
      },
    },
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

var years = 2;
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
const transformedYData = datas.map(value => Math.log10(value));

export const data = {
  labels,
  datasets: [
    {
      label: 'Sign Up',
      data: transformedYData,
      borderColor: 'rgb(5, 989, 132)',
      backgroundColor: 'rgb(5, 989, 132)',
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


export default function App() {
  const [toggle, setToggle] = useState(false);
  console.log("toggle");

  const onClickHelper = () => {
    
  }

  return (
    <div>
      <button style={{backgroundColor:"black"}} onClick={onClickHelper}>Switch between logarithmic and linear</button>
      {toggle && <span> deneme</span>}
      {<Line options={options} data={data} />}
    </div>
  );

}

