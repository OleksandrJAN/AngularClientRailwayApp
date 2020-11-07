import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Route, RouteSchedule, RouteSearchParameters } from 'src/app/_domain';


@Injectable({ providedIn: 'root' })
export class RouteService {

  private readonly url: string = 'http://localhost:8080/routes';

  constructor(private http: HttpClient) { }

  public getRoutes(routeParameters: RouteSearchParameters): Observable<Route[]> {
    const params = new HttpParams()
      .set('from', routeParameters.from)
      .set('to', routeParameters.to);

    return this.http.get<Route[]>(this.url, { params });
  }

  public getRouteSchedule(id: number): Observable<RouteSchedule> {
    return this.http.get<RouteSchedule>(`${this.url}/${id}`);
  }

}
