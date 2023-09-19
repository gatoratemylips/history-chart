import Menu from './Menu';
import React, { useEffect, useState } from "react";
import { selectedDataIndexes } from './customDatalabels';
import Hammer from "hammerjs";
import 'chartjs-plugin-annotation';
import * as zoom from 'chartjs-plugin-zoom'
import zoomOptions from '../zoom';
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { animation } from './animation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { externalTooltipHandler } from './ExternalTooltip';
import { customDataLabels } from './customDatalabels';
import { database } from 'faker/lib/locales/en';
import dataJson from '../assets/data.js'
import { color } from 'faker/lib/locales/en/commerce';
const ChartHelper = () => {


  const datass = [];
  for (var i = 0; i < dataJson.length; i++) {
    var object = dataJson[i];
    datass.push(object.value);
  }

  const color = useSelector(state => state.change.value);
  const toggle = useSelector(state => state.toggle.value);
  let datas = datass;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  ChartJS.register({


  },
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    zoomPlugin,
    zoom

  );
  const annotations = [
    {
      type: 'box',
      xMin: '2023-01-01',
      xMax: '2023-01-31',
      yMin: 0, // Adjust the y-axis position as needed
      yMax: 100,
      backgroundColor: 'rgba(255, 0, 0, 0.2)', // Background color for the annotation
    },
    // Add more annotations for other months as needed
  ];

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
          ctx.fillStyle = 'rgb(245, 245, 245)';
          ctx.fillRect(startX, top, intervalWidth, height);
        }
      }
    },
  };

  // scaleCards plugin
  const scaleCards = {
    id: 'scaleCards',
    beforeDatasetsDraw(chart) {
      const { ctx, data, scales: { x, y } } = chart;
      ctx.save();
  
      const cardWidth = 40; // Width of each card
      const cardHeight = 20; // Height of each card
      const cardPadding = 10; // Padding between cards
      const tickSpacing = 60; // Spacing between ticks
      const tickHeight = 10; // Height of the tick marks
  
      data.datasets[0].cards.forEach((cardText, index) => {
        const tickX = x.left + (index + 1) * tickSpacing; // Position the tick
  
        // Draw the flagpole connecting to the tick
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.moveTo(tickX, y.bottom);
        ctx.lineTo(tickX, y.bottom + tickHeight);
        ctx.stroke();
  
        const cardX = tickX - cardWidth / 2;
        const cardY = y.bottom + tickHeight + cardPadding;
  
        // Draw the card background
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'rgba(255, 26, 104, 0.2)';
        ctx.rect(cardX, cardY, cardWidth, cardHeight);
        ctx.fill();
        ctx.stroke();
  
        // Draw the card text (split by spaces)
        const words = cardText.split(' ');
        const maxLines = 2; // Maximum lines of text per card
        const lineHeight = 12; // Line height for text
        const maxTextWidth = cardWidth - cardPadding * 2;
        let textY = cardY + cardHeight / 2 - ((maxLines * lineHeight) / 2);
  
        for (let i = 0; i < maxLines && words.length > 0; i++) {
          const line = [];
          let lineText = '';
  
          while (words.length > 0 && ctx.measureText(lineText + words[0]).width <= maxTextWidth) {
            line.push(words.shift());
            lineText = line.join(' ');
          }
  
          ctx.font = 'bold 10px sans-serif';
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.fillText(lineText, cardX + cardWidth / 2, textY + lineHeight * (i + 1));
        }
      });
  
      ctx.restore();
    },
  };
  

  /* const transformedYData = datas.map(value => Math.log10(value));
  console.log(Math.max.apply(null, toggle ? datas : transformedYData)) */

  const eventAnnotations = [
    [], // For label 1 (no events)
    [
      { text: 'Event 1', description: 'Description for Event 1' },
      { text: 'Event 2', description: 'Description for Event 2' },
    ], // For label 2 (two events)
    [], // For label 3 (no events)
    // Add more arrays for other labels
  ];

  /*  // Generate annotations for event boxes based on eventAnnotations
   const generateAnnotations = () => {
     const annotations = [];
     
     labels.forEach((label, index) => {
       const events = eventAnnotations[index];
 
       if (events.length > 0) {
         const labelX = index;
         const labelY = -15; // Adjust the Y position as needed
 
         events.forEach((event, eventIndex) => {
           const eventX = labelX;
           const eventY = labelY - (eventIndex * 15); // Adjust the spacing between events
 
           annotations.push({
             type: 'box',
             xMin: eventX - 0.4, // Adjust the X position as needed
             xMax: eventX + 0.4, // Adjust the X position as needed
             yMin: eventY - 5, // Adjust the Y position as needed
             yMax: eventY + 5, // Adjust the Y position as needed
             backgroundColor: 'rgba(255, 0, 0, 0.2)',
             label: {
               content: event.text,
               enabled: true, // Show the event name
               position: 'top', // Adjust the position as needed
             },
           });
         });
       }
     });
 
     return annotations;
   }; */

  const options = {
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
    responsive: false,
    // animation:  toggle ? animation: null,
    layout: {
      
    },
    chartArea: {
      backgroundColor: 'rgba(251, 85, 85, 0.4)'
    },
    /* transitions: {
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
    }, */
    //animation,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {

        grace: 5,
        grid: {
          offset: false,
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: 10,
          },

          grace: false,
          beginAtZero: true,
          autoSkip: false,

          maxRotation: 0
        },



      },
      y: {
        type: toggle ? 'linear' : 'logarithmic', // Linear scale for the y-axis
        beginAtZero: false,
        /*  suggestedMax: Math.max.apply(null,dataJson.map(item => item.value)) * 1.2,
         suggestedMin: Math.min.apply(null, dataJson.map(item => item.value)) * 0.8, */
        gridLines: {
          display: true,
          offsetGridLines: false,
          drawOnChartArea: true,
          drawBorder: false

        },
        ticks: {


        },

      },
    },

    responsive: true,
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true // SET SCROOL ZOOM TO TRUE
          }
        },
        pan: {
          enabled: true
        }
      },
      /*  annotation: {
         annotations: generateAnnotations(),
       }, */

      /*  zoom: {
         // Container for pan options
         pan: {
           // Boolean to enable panning
           enabled: true,
 
           // Panning directions. Remove the appropriate direction to disable 
           // Eg. 'y' would only allow panning in the y direction
           mode: 'xy'
         },
 
         // Container for zoom options
         zoom: {
           wheel: {
           // Boolean to enable zooming
           enabled: true,
 
           // Zooming directions. Remove the appropriate direction to disable 
           // Eg. 'y' would only allow zooming in the y direction
           mode: 'xy',
         }
       }
       }, */
      year,
      datalabels: customDataLabels,
     // scaleCards,

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
        data: datas,
        borderColor: color,
        backgroundColor: color,
        cubicInterpolationMode: "monotone",
        borderWidth: 2,
        url: null,
        fill: false,
        pointRadius: function (context) {
          if (selectedDataIndexes.includes(context.dataIndex)) {
            return 5; // Adjust the radius as needed for data points with labels
          } else {
            return 0; // Default radius for data points without labels
          }
        },
        pointHoverRadius: 6,
        pointStyle: 'circle',
        pointBackgroundColor: 'rgba(255, 255, 255, 0.5)',
        cards: ['Salsdfe 1d', 'Salesdfsdf 2', 'Salsdfsde 3', 'Salesdfsdf 4', 'Salsdfsdfe 5', 'Salsdfsdfsdffe 6', 'Sale asdasdasdsa7', 'Salsdfsdfafse 8', 'sfsaasdasdfsafadfas'],
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
      <Line options={options} data={data} plugins={[year, zoomOptions]} />

    </div>
  );
}
export default ChartHelper;
