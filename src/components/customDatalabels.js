import 'chartjs-plugin-datalabels';
const selectedDataIndexes = [0, 2, 4];
export const customDataLabels = {
  formatter: function (value, context) {
    // Display custom label for selected dataIndex values
    if (selectedDataIndexes.includes(context.dataIndex)) {
      
      return 'Custom Label ' + context.dataIndex;
      
    } else {
      return null;
    }
  },
  backgroundColor: '#ffebed', // Background color for the label container
  borderRadius: 4, // Border radius for the label container
  padding: 16, // Padding inside the label container
  borderWidth : 1,

  borderColor: '#e3132b', 
  color: '#e1001a', // Text color for the visible labels
  display: 'auto', // Use 'auto' to automatically hide labels when they overlap
  align: 'end', // Label alignment (e.g., 'start', 'center', 'end')
  offset: 4, // Offset from the data point
  font: {
    weight: 'bold',
  },
};
