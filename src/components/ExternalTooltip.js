 
const getOrCreateTooltip = (chart) => {
  // Define an array to track the visibility of each tooltip

  // let tooltipElExpected = chart.canvas.parentNode.querySelector('div');
  let tooltipEl = document.getElementById('deniz');
  console.log({ tooltipEl })
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = "deniz";
    tooltipEl.style.background = '#ffb6c1';
    tooltipEl.style.borderRadius = '4px';
    tooltipEl.style.color = 'rgb(300,0,0)';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '5px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};


export const externalTooltipHandler = (context) => {
  
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  const dataIndex = context.tooltip.dataPoints[0]?.dataIndex;
  // Define an array of dataIndex values for which you want to show tooltips
  const dataIndexToShowTooltips = [2, 3]; // Add the dataIndex values you want to show tooltips for


  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
if (dataIndexToShowTooltips.includes(dataIndex)) {
  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      // THIS BLOCK ADDED
      const imageTh = document.createElement('th');
      th.style.borderWidth = 0;
      const image = document.createElement('img');
      image.style = 'width:64px , height:64px';
      image.src = context.tooltip.dataPoints[0].dataset.url;
      imageTh.appendChild(image);

      tr.appendChild(th);
      tr.appendChild(imageTh);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      //const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
    //  span.style.background = colors.backgroundColor;
      //span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }
  
  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
} else {
  tooltipEl.style.opacity = 0;
}
};

