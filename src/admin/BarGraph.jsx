import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { AxiosApi } from '../AxiosApi';
const BarGraph = () => {
  const [positiveCount, setPositiveCount]=useState();
  const [negativeCount, setNegativeCount]=useState();
  const getCounts=async()=>{
    try {
      const response = await AxiosApi.get(`graph`)
  console.log(response);
  setPositiveCount(response.data.data.Positive);
  setNegativeCount(response.data.data.Negative);
    } catch (error) {
  
      console.log(error);
    }
  }
  useEffect(()=>{
getCounts();
  }, [])
  const  options= {
        chart: {
          id: "basic-bar"
        },
        
        xaxis: {
          categories: ["Positive Tweets", "Negative Tweets"]
        },
        colors: ['#00E396', '#FF4560']
      };

    const  series= [
        {
          name: "Tweets",
          data: [positiveCount, negativeCount]
        }
      ]
 
  
  return (
    <div>
         <div className="app">
        <div className="row flex justify-center">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="700"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarGraph