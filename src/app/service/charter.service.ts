import { Injectable, ElementRef } from '@angular/core';
import { Data } from './data';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class CharterService {

  constructor() { }

  public drawChart(data: Data[], element: ElementRef): void {

    if (!data) {
        return;
    }

    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;

    let svg = d3.select(element.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the range of the data
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);


    // Add the X Axis
    svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g').call(d3.axisLeft(y));

    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('id', 'graphLine')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line<Data>()
            .x(d => x(d.date))
            .y(d => y(d.value))
        );
  }
}
