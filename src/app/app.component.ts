import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { CharterService } from './service/charter.service';
import { Data } from './service/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private el: ElementRef, private charter: CharterService) {

  }

  ngOnInit() {
    d3.csv('assets/data.csv')
    .then((dada) => {

        const data: Data[] = [];


        // Parse and format
        dada.forEach(function(d) {
            const date = d3.timeParse('%d-%b-%y')(d.date);
            const close = Number.parseFloat(d.close);
            data.push({date: date, value: close});
        });

        this.charter.drawChart(data, this.el);
    }).catch(error => console.log(error));

  }

}


