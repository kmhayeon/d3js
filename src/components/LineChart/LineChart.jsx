import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const svgRef = useRef();
  
  useEffect(() => {
    const data = [12, 36, 6, 25, 20, 30, 45];
    
    const svg = d3.select(svgRef.current)
      .attr('width', 400)
      .attr('height', 200)
      .style('background-color', '#f0f0f0')
      .style('margin', '10px')
      .style('overflow', 'visible');
    
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 400]);
    
    const yScale = d3.scaleLinear()
      .domain([0, 50])
      .range([200, 0]);
    
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveMonotoneX);
    
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 3)
      .attr('d', line);
  }, []);
  
  return <svg ref={svgRef}></svg>;
}

export default LineChart;
