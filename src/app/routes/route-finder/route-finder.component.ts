import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { RouteParametersStorage, StationService } from 'src/app/service';
import { RouteSearchParameters } from 'src/app/_domain';


@Component({
  selector: 'app-route-finder',
  templateUrl: './route-finder.component.html',
  styleUrls: ['./route-finder.component.css']
})
export class RouteFinderComponent implements OnInit {

  stations: string[];
  departureStation: string;
  arrivalStation: string;


  constructor(
    private router: Router,
    private stationService: StationService,
    private routeParametersStorage: RouteParametersStorage
  ) { }

  ngOnInit(): void {
    // get list of stations names
    this.getStations();
    // get latest search parameters for routes
    this.getLatestRouteParameters();
  }


  private getStations() {
    this.stationService.getStationsNames().subscribe(
      (stations: string[]) => {
        this.stations = stations;
      }
    );
  }

  private getLatestRouteParameters() {
    let latestRouteParameters: RouteSearchParameters = this.routeParametersStorage.routeParametersValue;
    if (latestRouteParameters) {
      this.departureStation = latestRouteParameters.from;
      this.arrivalStation = latestRouteParameters.to;
    }
  }


  onReverse() {
    // swap stations
    let temp = this.departureStation;
    this.departureStation = this.arrivalStation;
    this.arrivalStation = temp;
  }

  onFind() {
    // update new route parameters
    let routeParameters: RouteSearchParameters = { from: this.departureStation, to: this.arrivalStation };
    this.routeParametersStorage.updateRouteParameters(routeParameters);
    // navigate to route list component
    this.router.navigate(['routes']);
  }

}


