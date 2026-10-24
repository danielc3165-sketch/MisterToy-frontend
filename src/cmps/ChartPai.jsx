import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

import { getData } from '../services/dashboard.service';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartPai(){
  const [labelsNums,setLabelsNums] = useState([])

  useEffect(()=>{
    getData()
    .then((arr)=>setLabelsNums(arr))
  },[])
  
  

  const data = {
  labels:  ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle'] ,
  datasets: [
    {
      label: '# of Votes',
      data: labelsNums,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
    
    // if(!nums) return
    // console.log('N',nums)

    return <section>
    <div className='chart'>
    <h2>toys that are in stock</h2>
    <Pie data={data} />
    </div>
    </section>
}

