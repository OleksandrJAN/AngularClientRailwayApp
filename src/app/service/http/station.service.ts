import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class StationService {

    private stationUrl: string = 'http://localhost:8080/stations';

    
    constructor(private http: HttpClient) { }


    public getStationsNames(): Observable<string[]> {
        return this.http.get<string[]>(this.stationUrl);
    }
}