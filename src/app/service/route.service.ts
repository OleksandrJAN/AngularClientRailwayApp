import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Route, RouteSchedule, RouteSearchParameters } from '../_domain';


@Injectable({ providedIn: 'root' })
export class RouteService {

  private routeUrl: string = 'http://localhost:8080/routes';

  constructor(private http: HttpClient) { }


  public findRoutes(routeParameters: RouteSearchParameters): Observable<Route[]> {
    const params = new HttpParams()
      .set('from', String(routeParameters.departureStation.id))
      .set('to', String(routeParameters.arrivalStation.id));

    return this.http.get<Route[]>(this.routeUrl, { params });
  }

  public findRoute(id: number): Observable<RouteSchedule> {
    return this.http.get<RouteSchedule>(this.routeUrl + '/' + id);
  }

}
