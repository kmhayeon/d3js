import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SvgContainer, Tooltip } from './styled';

const BarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  
  useEffect(() => {
    const data = [12, 36, 6, 25, 20, 30, 45];
    
    const padding = 10;
    const width = 400;
    const height = 200;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);
    
    const tooltip = d3.select(tooltipRef.current)
      .style('opacity', 0);
    
    const xScale = d3.scaleBand()
      .domain(data.map((_, index) => index))
      .range([0, width])
      .padding(0.4);
    
    const yScale = d3.scaleLinear()
      .domain([0, 50])
      .range([height, 0]);
    
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    const chart = svg.append('g')
      .attr('transform', `translate(${padding}, ${padding})`);
    
    chart.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .selectAll('text')
      .style('fill', 'black')
      .style('cursor', 'pointer')
      .attr("dy", "0.75em")
      .on('mouseover', handleLabelMouseOver)
      .on('mouseout', handleLabelMouseOut);
    
    chart.append('g')
      .call(yAxis);
    
    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(i))
      .attr('y', yScale)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d))
      .attr('fill', 'teal')
      .style('cursor', 'pointer')
      .on('mouseover', handleBarMouseOver)
      .on('mouseout', handleMouseOut);
    
    function handleLabelMouseOver(event, index) {
      const label = d3.select(event.target);
      label.style('font-size', '16px');
      
      const barX = xScale(index) + xScale.bandwidth() / 2 + padding;
      const tooltipHeight = tooltip.node().offsetHeight;
      const barY = yScale(data[index]) - tooltipHeight - 10;
      
      const adjustedX = Math.min(barX, width + padding * 2 - tooltip.node().offsetWidth);
      const adjustedY = Math.max(barY, padding);
      
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`Value: ${data[index]}`)
        .style('left', `${adjustedX}px`)
        .style('top', `${adjustedY}px`);
    }
    
    function handleLabelMouseOut(event) {
      d3.select(event.target).style('font-size', '12px');
      tooltip.transition().duration(500).style('opacity', 0);
    }
    
    function handleBarMouseOver(event, d) {
      const barX = parseFloat(d3.select(event.target).attr('x')) + xScale.bandwidth() / 2 + padding;
      const tooltipHeight = tooltip.node().offsetHeight;
      const barY = yScale(d) - tooltipHeight - 10;
      
      const adjustedX = Math.min(barX, width + padding * 2 - tooltip.node().offsetWidth);
      const adjustedY = Math.max(barY, padding);
      
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`Value: ${d}`)
        .style('left', `${adjustedX}px`)
        .style('top', `${adjustedY}px`);
    }
    
    function handleMouseOut() {
      tooltip.transition().duration(500).style('opacity', 0);
    }
  }, []);
  
  return (
    <>
      <SvgContainer ref={svgRef}></SvgContainer>
      <Tooltip ref={tooltipRef}></Tooltip>
    </>
  );
}

export default BarChart;
