import React, { useState } from "react";

import Scatterplot from "./scatterChart/Scatterplot";


export default function ScatterChart({data}) {
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 400
  });

  return (
    <div className="App mb-4">
      <svg width={dimensions.width} height={dimensions.height} >
        <Scatterplot
          x={50}
          y={50}
          width={dimensions.width}
          height={dimensions.height}
          data={data}
        />
      </svg>
    </div>
  );
}


