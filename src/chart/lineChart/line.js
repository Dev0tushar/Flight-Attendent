import React, { useEffect, useRef } from 'react';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

const Line = (props) => {
    const ref = useRef(null)
    function updateChart() {
        const {
              lineGenerator, xScale, yScale, data,
            } = props;
    
        const t = transition().duration(1000);
    
        const line = select('#line');
        const dot = selectAll('.circle');
    
        line
          .datum(data)
          .transition(t)
          .attr('d', lineGenerator);
      }
    useEffect(()=>{
        const node = ref.current;
        const { xScale, yScale, data, lineGenerator } = props;
    
        const initialData = data.map(d => ({
          name: d.name,
          value: 0
        }));
    
        select(node)
          .append('path')
          .datum(initialData)
          .attr('id', 'line')
          .attr('stroke', 'black')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .attr('d', lineGenerator);
        
        updateChart()
    },[])

    useEffect(()=>{
        updateChart()
    },[props?.data])
    return <g className="line-group" ref={ref} transform={props?.transform} />;
}

// class Line extends React.Component {
//   constructor() {
//     super();
//     this.ref = React.createRef();
//   }
//   componentDidMount() {
    
//   }
//   componentDidUpdate() {
//     this.updateChart();
//   }
  
//   render() {
//     return <g className="line-group" ref={this.ref} />;
//   }
// }

export default Line;
