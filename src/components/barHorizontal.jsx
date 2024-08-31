// import React from "react";
// import CanvasJSReact from '@canvasjs/react-charts';

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// export default function Bar({ raceCounts }) {
//   const options = {
//     animationEnabled: true,
//     exportEnabled: true,
//     theme: "light1", // "light1", "dark1", "dark2"
//     title: {
//       text: "Users Animals"
//     },
//     backgroundColor: "transparent",
//     data: [{
//       type: "pie", // Change to "column" or "bar" if you want a bar chart
//       indexLabel: `{label} user(s): {y} Animal(s)`,
//       startAngle: 0,
//       dataPoints: raceCounts.map((race) => ({
//         y: race.animalsCount,  // Value for the chart
//         label: race.userCount // Label for the chart
//       }))
//     }]
//   };

//   return (
//     <div>
//       <CanvasJSChart options={options} />
//     </div>
//   );
// }
