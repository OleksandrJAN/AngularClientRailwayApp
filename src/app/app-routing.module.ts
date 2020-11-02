import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/login';
import { RoutePageComponent, RouteScheduleComponent, RoutesListComponent } from 'src/app/routes';
import { AuthGuard, RouteScheduleResolver } from './service';


const routes: Routes = [
  { path: '', redirectTo: 'routes', pathMatch: 'full' },
  {
    path: 'routes', component: RoutePageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', component: RoutesListComponent },
      { path: ':id', component: RouteScheduleComponent, resolve: { routeSchedule: RouteScheduleResolver } }
    ]
  },

  // auth paths
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
