import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserProfile } from 'src/app/_domain';


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly url: string = 'http://localhost:8080/account';

    constructor(private http: HttpClient) { }

    public getUserProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.url}/profile`);
    }

}