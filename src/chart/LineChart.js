import XYAxis from "./lineChart/axis/XYAxis";
import Line from "./lineChart/line";
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { useEffect, useState } from "react";

const LineChart = (props) =>{
    const  iniData  = [
        { name: 'Mon', value: 0 ,count:"1"},
        { name: 'Tue', value: 0 ,count:"2"},
        { name: 'Wed', value: 0 ,count:"3"},
        { name: 'Thu', value: 0 ,count:"4"},
        { name: 'Fri', value: 0 ,count:"5"},
        { name: 'Sut', value: 0 ,count:"6"},
        { name: 'Sun', value: 0 ,count:"7"}
      ];
      const [data , setData] = useState(iniData)
      useEffect(() => {
        const fData = data?.map((i)=>{
          const element = props.data.filter((e)=> e?.DayOfWeek === i?.count)
          const total = element?.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue?.AirTime),0);
          const avg = total/element?.length
            return {...i,value: isNaN(avg)? 0 :avg} 
        })
        setData(fData) 
      }, [props.data])
      
      console.log(props.chartData,"chaaaart");
    const parentWidth = 800;

    const margins = {
      top: 20,
      right: 40,
      bottom: 20,
      left: 40,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 380 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);
    return(
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} transform={`translate(0px, -${margins?.bottom}px)`} />
          </g>
        </svg>
    )   
}

export default LineChart;