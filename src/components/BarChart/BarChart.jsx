import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SvgContainer, Tooltip } from './styled';

const BarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  
  useEffect(() => {
    const data = [
      { date: '7/10', value: 12 },
      { date: '7/11', value: 36 },
      { date: '7/12', value: 6 },
      { date: '7/13', value: 25 },
      { date: '7/14', value: 20 },
      { date: '7/15', value: 30 },
      { date: '7/16', value: 45 }
    ];
    
    const padding = 10;
    const width = 400;
    const height = 200;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);
    
    const tooltip = d3.select(tooltipRef.current)
      .style('opacity', 0);
    
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, width])
      .padding(0.4);
    
    const yScale = d3.scaleLinear()
      .domain([0, 50])
      .range([height, 0]);
    
    const xAxis = d3.axisBottom(xScale);
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
      .style('font-size', '14px')
      .on('mouseover', handleLabelMouseOver)
      .on('mouseout', handleLabelMouseOut);
    
    chart.append('g')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '14px');
    
    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.date))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .attr('fill', '#3182f6')
      .style('cursor', 'pointer')
      .on('mouseover', handleBarMouseOver)
      .on('mouseout', handleMouseOut);
    
    function handleLabelMouseOver(event, date) {
      d3.select(event.target)
        .style('fill', '#3182f6')
        .style('font-weight', '700');
      
      const barX = xScale(date) + xScale.bandwidth() / 2 + padding;
      const tooltipHeight = tooltip.node().offsetHeight;
      const value = data.find(d => d.date === date).value;
      const barY = yScale(value) - tooltipHeight + 90;
      
      const adjustedX = Math.min(barX, width + padding * 2 - tooltip.node().offsetWidth);
      const adjustedY = Math.max(barY, padding);
      
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`Value: ${value}`)
        .style('left', `${adjustedX}px`)
        .style('top', `${adjustedY}px`);
    }
    
    function handleLabelMouseOut(event) {
      d3.select(event.target)
        .style('fill', 'black')
        .style('font-weight', 'normal');
      tooltip.transition().duration(500).style('opacity', 0);
    }
    
    function handleBarMouseOver(event, d) {
      const barX = parseFloat(d3.select(event.target).attr('x')) + xScale.bandwidth() / 2 + padding;
      const tooltipHeight = tooltip.node().offsetHeight;
      const barY = yScale(d.value) - tooltipHeight + 90;
      
      const adjustedX = Math.min(barX, width + padding * 2 - tooltip.node().offsetWidth);
      const adjustedY = Math.max(barY, padding);
      
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`Value: ${d.value}`)
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
