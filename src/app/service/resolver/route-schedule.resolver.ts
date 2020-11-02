import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { RouteSchedule } from 'src/app/_domain';
import { RouteService } from '../http';


@Injectable({ providedIn: 'root' })
export class RouteScheduleResolver implements Resolve<RouteSchedule> {

    constructor(private routeService: RouteService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RouteSchedule> {
        const id = route.paramMap.get('id');
        return this.routeService.getRouteSchedule(+id);
    }

}