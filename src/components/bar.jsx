// import React from "react";
// import CanvasJSReact from '@canvasjs/react-charts';

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// export default function Bar({ raceCounts }) {
//   const options = {
//     animationEnabled: true,
//     exportEnabled: true,
//     theme: "light2", // "light1", "dark1", "dark2"
//     title: {
//       text: "Most Breed Losts"
//     },
//     axisX: {
//       title: "Breed types",
//       reversed: true,
//     },
//     backgroundColor: "transparent",
//     axisY: {
//       title: "Number of Posts",
//       includeZero: true,
//     },
//     data: [{
//       type: "bar", // Change to "column" or "bar" if you want a bar chart
//       startAngle: 0,
//       dataPoints: raceCounts.map((race) => ({
//         y: race.count,  // Value for the chart
//         label: race.name // Label for the chart
//       }))
//     }]
//   };

//   return (
//     <div className="">
//       <CanvasJSChart options={options} />
//     </div>
//   );
// }
