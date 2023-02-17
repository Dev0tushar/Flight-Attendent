import React, { Component, useEffect, useState } from 'react';
import * as d3 from "d3";

const BarChart = (props) => {
  const [data,setData] = useState([])
  const margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([0, props.width])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([props.height, 0]);
  const bars = data.map(d => (
    <g key={d.name}>
      <rect
        x={xScale(d.name) + margins?.left}
        y={yScale(d.value) - margins?.bottom}
        width={xScale.bandwidth()}
        height={props.height - yScale(d.value)}
      />
    </g>
  ));

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

    useEffect(()=>{
      const newArr = props?.data?.map((item)=>{
        const arraylength = props?.data?.filter((i)=>i?.Origin === item?.Origin)?.length;
        return ({
          name: item?.Origin,
          value : arraylength
        })
      })
      const uniqueArray = Array.from(new Set(newArr.map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));
      console.log(uniqueArray,"props?.data")
      setData(uniqueArray)
    },[props?.data])

  return (
    <div>
      <svg width={props.width} height={props.height}>
        <g transform={`translate(${margins?.left}, ${props.height - margins?.bottom})`} ref={node => d3.select(node).call(xAxis)} />
        <g transform={`translate(${margins?.left}, -${margins?.bottom})`} ref={node => d3.select(node).call(yAxis)} />
        {bars}
      </svg>
    </div>
  );
}

export default BarChart
