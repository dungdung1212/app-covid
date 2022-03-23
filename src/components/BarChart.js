import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import React, { memo, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash'
import {useDispatch } from 'react-redux';
import {setLoader} from '../slices/loaderSlice'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  layout: {
    padding: {
      top: 25,
    },
  },
  plugins: {
    legend: {
      position: 'bottom' ,
    },
    title: {
      display: true,
      position:"bottom",
      text: 'The graph shows the total number of Confirmed, Deaths, Recovered statistics by year',
    },
  },
};
 
const BarChart = ({ chartData }) => { 
    const [dataDrawChart, setDataDrawChart] = useState() 
    const dispatch = useDispatch();
    useEffect(()=>{
          setChartNull() 
        if( Array.isArray(chartData)){ 
            dispatch(setLoader(true)) 
            formatDataByYear(chartData)
        }else{
            dispatch(setLoader(false)) 
        }
    }, [chartData])
    const formatDataByYear = async(chartData)=>{
        const result = await _.chain(chartData)
        .groupBy(arr=>
          moment(arr['Date'], 'YYYY/MM/DD').year()
        )  
        .value(); 
        const dataConfirmed=[]
        const dataDeaths=[]
        const dataRecovered=[]
        const labels = _.keys(result); 
        let totalConfirmed = 0
        let totalDeaths = 0
        let totalRecovered = 0
        for(const year of labels ){
            result[year].map((countryOneYear,index) =>{
                totalConfirmed+= countryOneYear.Confirmed
                totalDeaths+= countryOneYear.Deaths
                totalRecovered+= countryOneYear.Recovered
                if(index == result[year].length -1){
                    dataConfirmed.push(totalConfirmed);
                    dataDeaths.push(totalDeaths);
                    dataRecovered.push(totalRecovered)
                }
                if(dataConfirmed.length === labels.length){
                    setDataDrawChart(dataChartFm(labels,dataConfirmed,dataDeaths,dataRecovered ))
                    setTimeout(() => {
                        dispatch(setLoader(false))
                    }, 1000); 
                }
            })
        }
        
    }
    const dataChartFm =(labels,dataConfirmed,dataDeaths,dataRecovered )=>{
        const dataChart = {}
        dataChart.labels  = labels
        dataChart.datasets= [
            {
              label: 'Confirmed',
              data: dataConfirmed,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }, 
            {
                label: 'Deaths',
                data: dataDeaths,
                backgroundColor: 'rgba(117, 199, 80, 0.5)',
            }, 
            {
                label: 'Recovered',
                data: dataRecovered,
                backgroundColor: 'rgba(80,199,199, 0.5)',
              }, 
          ]  
        return dataChart
    }
    const setChartNull =()=>{
        setDataDrawChart(dataChartFm([''],[0],[0],[0] ))
    }
  return (
    <div> 
       {dataDrawChart?<Bar options={options} data={dataDrawChart} />:"" }   
    </div>
  )
}

export default memo(BarChart)
