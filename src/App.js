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

export default function App() {
  const [toggle, setToggle] = useState(false);

  const datas = [1, 10, 100, 110,12, 1000];
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
        type: toggle ? "linear" : 'logarithmic',
      
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

            return `Sign Ups: ${toggle ? context.parsed.y : originalValue}`;
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
 
  function deneme(){
    if(!toggle){
      return value => Math.pow(10, value).toFixed(0);
    }

  }
  function deneme2(){
    if(toggle){
      return datas;
    }else{
      return transformedYData;
    }
    
    }
  
 

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

  const onClickHelper = () => {
    setToggle(!toggle);
  }

  return (
    <div>
      <button style={{ backgroundColor: "black" }} onClick={onClickHelper}>Switch between logarithmic and linear</button>
      {toggle && <span> deneme </span>}
      {<Line options={options} data={data} />}
    </div>
  );

}

