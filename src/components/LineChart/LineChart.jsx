import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {SvgContainer} from "./styled";

const LineChart = () => {
  const svgRef = useRef();
  
  useEffect(() => {
    const data = [12, 36, 6, 25, 20, 30, 45];
    
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#f0f0f0')
      .style('margin', '10px')
      .style('overflow', 'visible')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    
    const yScale = d3.scaleLinear()
      .domain([0, 50])
      .range([height, 0]);
    
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);
    
    svg.append('g')
      .call(yAxis);
    
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
    
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '5px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);
    
    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 4)
      .attr('fill', 'red')
      .on('mouseover', (event, d) => {
        showTooltip(event, d);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
    
    svg.selectAll('.tick text')
      .on('mouseover', function(event, d) {
        const index = d;  // x축의 인덱스가 그대로 넘어옴
        showTooltip(event, data[index], xScale(index), yScale(data[index]));
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
    
    function showTooltip(event, value, cx = event.pageX, cy = event.pageY) {
      const tooltipWidth = 50; // 대략적인 툴팁 너비
      const tooltipHeight = 30; // 대략적인 툴팁 높이
      const offset = 5;
      
      let xPosition = cx + offset;
      let yPosition = cy - offset;
      
      // 화면의 오른쪽과 아래를 벗어나지 않도록 위치 조정
      if (xPosition + tooltipWidth > window.innerWidth) {
        xPosition = cx - tooltipWidth - offset;
      }
      if (yPosition + tooltipHeight > window.innerHeight) {
        yPosition = cy - tooltipHeight - offset;
      }
      
      tooltip.style('opacity', 1)
        .html(`Value: ${value}`)
        .style('left', `${xPosition}px`)
        .style('top', `${yPosition}px`);
    }
  }, []);
  
  return (
    <SvgContainer ref={svgRef}></SvgContainer>
  )
}

export default LineChart;
