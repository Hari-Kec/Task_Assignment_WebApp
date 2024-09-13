// // dashboard.jsx
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the components required for Chart.js
// ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; // You can use Utils.months({count: 7}) or any other way to generate labels
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'My First Dataset',
//       data: [65, 59, 80, 81, 56, 55, 40],
//       fill: false,
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1
//     }]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `${context.label}: ${context.raw} units`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default Dashboard;
