import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { RouteSearchParameters } from 'src/app/_domain';


@Injectable({ providedIn: 'root' })
export class RouteParametersStorage {

    private routeParametersSubject: BehaviorSubject<RouteSearchParameters>;
    public routeParameters$: Observable<RouteSearchParameters>;

    constructor() {
        // get latest route parameters from session storage on page refresh
        let routeParameters: RouteSearchParameters = JSON.parse(sessionStorage.getItem('latestRouteParameters'));
        this.routeParametersSubject = new BehaviorSubject<RouteSearchParameters>(routeParameters);
        this.routeParameters$ = this.routeParametersSubject.asObservable();
    }

    public get routeParametersValue(): RouteSearchParameters {
        return this.routeParametersSubject.value;
    }

    public updateRouteParameters(routeParameters: RouteSearchParameters) {
        // store latest route search parameters in session storage to keep data between page refreshes for each browser tab
        sessionStorage.setItem('latestRouteParameters', JSON.stringify(routeParameters));
        this.routeParametersSubject.next(routeParameters);
    }

}