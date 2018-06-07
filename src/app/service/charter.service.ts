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


    // Scale the range of the data
    const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);
    const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

    let svg = d3.select(element.nativeElement).select('svg') ;
    let g;
    if (svg.empty()) {
      svg = d3.select(element.nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

     g =  svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Add the X Axis
    g.append('g')
    .attr('id', 'xaxis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

    // Add the Y Axis
    g.append('g')
    .attr('id', 'yaxis')
    .call(d3.axisLeft(y));

    } else {
      g = svg.select('g');
      d3.select('#xaxis').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));
      d3.select('#yaxis').call(d3.axisLeft(y));
    }



  

    // d3.select('svg')
    // .select('g')
    // .append('path')
    // .attr('id', 'graphLine');

    let path = g.selectAll('#graphLine')
                .data([data])
                .attr('fill', 'none')
                .attr('id', 'graphLine')
                .attr('stroke', 'steelblue')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', d3.line<Data>()
                    .x((d: Data) => x(d.date))
                    .y((d: Data) => y(d.value)));

      path.enter()
          .append('path')
          .attr('fill', 'none')
          .attr('id', 'graphLine')
          .attr('stroke', 'steelblue')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke-width', 1.5)
          .attr('d', d3.line<Data>()
              .x((d: Data) => x(d.date))
              .y((d: Data) => y(d.value))
          )
          .merge(path)
              .attr('fill', 'none')
              .attr('id', 'graphLine')
              .attr('stroke', 'steelblue')
              .attr('stroke-linejoin', 'round')
              .attr('stroke-linecap', 'round')
              .attr('stroke-width', 1.5)
              .attr('d', d3.line<Data>()
                  .x((d: Data) => x(d.date))
                  .y((d: Data) => y(d.value)));

          d3.select('svg').on('click', () => {
            console.log(data[(data.push({date: new Date(), value: Math.random() * 1000 })) - 1]);
            this.drawChart(data, element);
          });
  }
}
