import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Station } from '../_domain';


@Injectable({ providedIn: 'root' })
export class StationService {

    private stationUrl: string = 'http://localhost:8080/stations';

    constructor(private http: HttpClient) { }


    public findStations(): Observable<Station[]> {
        return this.http.get<Station[]>(this.stationUrl);
    }
}