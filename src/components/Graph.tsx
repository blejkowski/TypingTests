import React, { useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export type GraphProps = {
  points:{
      x: number
  }[],
  labels: string[],
  title: string
}
const Graph = (props: GraphProps) => {
  return (
  <Line options={{
    plugins: {
      title: {
        display: true,
        text: `${props.title}`
      },
      legend: {
        display: false
      },
     
    },
    scales:{
        x:{
          ticks: {color: 'black'},
          grid: {
            color: '#272829'
          }
        },
        y:{
          ticks: {color: 'black'},
          grid: {
            color: '#272829'
          }
        }
    },
  }} data={{
    labels: props.labels,
    datasets: [{
    backgroundColor: '#272829',
    borderColor: '#e2b714',
    borderWidth: 1,
    data: props.points
  },

]}}/>
  )
}

export default Graph