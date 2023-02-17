import React, { useMemo } from "react";
import * as d3 from "d3";

import ScatterAxis from "./ScatterAxis";

const Scatterplot = ({ x, y, width, height, data, datapoint }) => {
  const xScale = d3
    .scaleLinear()
    .domain([0, 3000])
    .range([0, width]);

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 250])
        .range([height, 0]),
    [height]
  );

  return (
    <g >
    {console.log(data,"data")}
      {data.map(d => (
        <circle cx={xScale(d[0])} cy={yScale(d[1])} r={3} />
      ))}
      <ScatterAxis x={30} y={height-20} scale={xScale} />
      <ScatterAxis x={30} y={-20} scale={yScale} type={"Left"} />
    </g>
  );
};

export default Scatterplot;
