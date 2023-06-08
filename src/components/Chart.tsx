import "chart.js/auto";
import { Line } from 'react-chartjs-2';

interface IChartProps {
    histories: {
        price:string[],
        timestamp:string[]
    }
}

const Chart = ({ histories } : IChartProps) => {
    const data = {
        labels:histories.timestamp,
        datasets: [{
            label:"Price in USD",
            data:histories.price,
            borderColor:"#0071bd",
            fill:false 
        }]
    }
  
    return <Line 
       data={data}
       options={{
        responsive:true,
        maintainAspectRatio:false
       }}
    />
}

export default Chart;