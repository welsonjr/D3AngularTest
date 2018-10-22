import { Component, OnInit, ElementRef } from '@angular/core';
import { CharterService } from '../service/charter.service';
import * as d3 from 'd3';
import { Data } from '../service/data';
import { timer } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  data: Data[] = [];
  constructor(private el: ElementRef, private charter: CharterService) {

   }

  ngOnInit() {
    d3.csv('assets/data.csv')
    .then((dada) => {
        // Parse and format
        // dada.forEach(function(d) {
        //     const date = d3.timeParse('%d-%b-%y')(d.date);
        //     const close = Number.parseFloat(d.close);
        //     data.push({date: date, value: close});
        // });

    }).catch(error => console.log(error));

    const source = timer(0,1000);
    //output: 0
    const subscribe = source.subscribe(function() {
      const d: Data = {date: (new Date()) , value: Math.random() * 100 };
      console.log(d);
      this.data.push(d);
      this.charter.drawChart(this.data, this.el);
  }.bind(this));
  
}


}
