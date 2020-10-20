import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RouteSearchParameters, Station } from 'src/app/_domain';


@Component({
  selector: 'app-route-finder',
  templateUrl: './route-finder.component.html',
  styleUrls: ['./route-finder.component.css']
})
export class RouteFinderComponent implements OnInit {

  @Input() stations: Station[];

  departureStation: Station;
  arrivalStation: Station;
  @Output() routeParametersSelected = new EventEmitter<RouteSearchParameters>();

  constructor() { }

  ngOnInit(): void { }


  onReverse() {
    let temp = this.departureStation;
    this.departureStation = this.arrivalStation;
    this.arrivalStation = temp;
  }

  onFind() {
    let routeParameters = new RouteSearchParameters(this.departureStation, this.arrivalStation)
    this.routeParametersSelected.emit(routeParameters);
  }

}


