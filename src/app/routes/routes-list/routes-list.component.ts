import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { RouteParametersStorage, RouteService, TimeTransformer } from 'src/app/service';
import { Route, RouteSearchParameters } from 'src/app/_domain';


@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit, OnDestroy {

  private routeParametersChanged$: Subscription;

  displayedColumns: string[] = ['train', 'departure', 'arrival', 'duration'];
  routes: Route[];


  constructor(
    private routeService: RouteService,
    private routeParametersStorage: RouteParametersStorage,
    private timeTransformer: TimeTransformer
  ) { }

  ngOnInit(): void {
    this.routeParametersChanged$ = this.routeParametersStorage.routeParameters$.subscribe(
      (routeParameters: RouteSearchParameters) => {
        if (routeParameters) {
          this.getRoutes(routeParameters);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routeParametersChanged$.unsubscribe();
  }


  private getRoutes(routeParameters: RouteSearchParameters) {
    this.routeService.getRoutes(routeParameters).subscribe(
      (routes: Route[]) => {
        this.routes = routes;
      }
    );
  }


  getNumberTime(time: number): string {
    return this.timeTransformer.timeToNumber(time);
  }

  getStringTime(time: number): string {
    return this.timeTransformer.timeToString(time);
  }

}
