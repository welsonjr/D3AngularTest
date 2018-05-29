import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    let margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    let svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.csv('assets/data.csv').then((data) => {
        // Parse and format
        data.forEach(function(d) {
             d.date = d3.timeParse('%d-%b-%y')(d.date);
            d.close = +d.close;
        });
        console.log(data);

        // Scale the range of the data
        let x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);
        let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.close)])
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
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(d => x(d.date))
            .y(d => y(d.close))
        );


    }).catch((err) => {
        console.log(err);
    });


  }
}
