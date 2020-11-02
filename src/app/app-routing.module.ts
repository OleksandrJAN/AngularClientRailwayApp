import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth';
import { LoginComponent } from './login';
import { RoutePageComponent, RouteScheduleComponent, RoutesListComponent } from './routes';


const routes: Routes = [
  { path: '', redirectTo: 'routes', pathMatch: 'full' },
  {
    path: 'routes', component: RoutePageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: RoutesListComponent },
      { path: ':id', component: RouteScheduleComponent }
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
