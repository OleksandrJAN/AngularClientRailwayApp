import { Component, OnInit } from '@angular/core';

import { RouteService, StationService } from 'src/app/service';
import { Route, RouteSearchParameters, Station } from 'src/app/_domain';


@Component({
  selector: 'app-route-page',
  templateUrl: './route-page.component.html',
  styleUrls: ['./route-page.component.css']
})
export class RoutePageComponent implements OnInit {

  stations: Station[];
  routeParameters: RouteSearchParameters;
  routes: Route[];


  constructor(
    private stationService: StationService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.stationService.findStations().subscribe(
      (stations: Station[]) => {
        this.stations = stations;
      }
    );
  }


  getRouteSearchParameters(routeParameters: RouteSearchParameters) {
    this.routeParameters = routeParameters;
    this.findRoutes();
  }

  findRoutes() {
    this.routeService.findRoutes(this.routeParameters).subscribe(
      (routes: Route[]) => {
        this.routes = routes;
      }
    );
  }

}
