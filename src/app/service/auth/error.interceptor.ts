import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 401 && !err.url.endsWith('login')) {
                    // auto logout if 401 response returned
                    this.authenticationService.logout();
                    location.reload();
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }

}