import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { RouteSearchParameters } from 'src/app/_domain';


@Injectable({ providedIn: 'root' })
export class RouteParametersStorage {

    private routeParametersSubject: BehaviorSubject<RouteSearchParameters>;
    public routeParameters$: Observable<RouteSearchParameters>;

    constructor() {
        this.routeParametersSubject = new BehaviorSubject<RouteSearchParameters>(null);
        this.routeParameters$ = this.routeParametersSubject.asObservable();
    }

    public updateRouteParameters(routeParameters: RouteSearchParameters) {
        this.routeParametersSubject.next(routeParameters);
    }

}