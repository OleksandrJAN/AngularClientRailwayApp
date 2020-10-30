import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth';
import { LoginComponent } from './login';
import { RoutePageComponent, RouteScheduleComponent } from './routes';


const routes: Routes = [
  { path: '', component: RoutePageComponent, canActivate: [AuthGuard] },
  { path: 'routes', component: RoutePageComponent, canActivate: [AuthGuard] },
  { path: 'routes/:id', component: RouteScheduleComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
