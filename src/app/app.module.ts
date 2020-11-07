import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor, JwtInterceptor } from './_service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { RoutesListComponent, RouteFinderComponent, RoutePageComponent, RouteScheduleComponent } from './routes';
import { UserProfileComponent } from './user';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoutesListComponent,
    RouteFinderComponent,
    RoutePageComponent,
    RouteScheduleComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }