import 'chartjs-plugin-datalabels';
import dataJson from '../assets/data';
import color from './Chart';

 export const selectedDataIndexes = [];

for (var i = 0; i < dataJson.length; i++) {
  var object = (dataJson[i]);
  if (object.hasOwnProperty('card')) {
   selectedDataIndexes.push(i); 
  }
}


export const customDataLabels = {
  
  formatter: function (value, context) {
    // Display custom label for selected dataIndex values
    if (selectedDataIndexes.includes(context.dataIndex)) {
      value = dataJson[context.dataIndex].card
    } else {
      
      value = null;
    }
    return value;
  },
  backgroundColor: 'rgba(250, 240, 241, 0.1)', // Background color for the label container
  borderRadius: 4, // Border radius for the label container
  padding: 16, // Padding inside the label container
  borderWidth: 1,
  borderColor: '#e3132b',
  color: '#e1001a', // Text color for the visible labels
  opacity: 1,
  align: 'top', // Label alignment (e.g., 'start', 'center', 'end')
  offset: 10, // Offset from the data point
  font: {
    weight: 'bold',
  },
};
