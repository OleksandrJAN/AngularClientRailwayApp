import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth';
import { LoginComponent } from './login';
import { RoutePageComponent } from './routes';


const routes: Routes = [
  { path: '', component: RoutePageComponent, canActivate: [AuthGuard] },
  { path: 'routes', component: RoutePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'routes/:id', component: FilmPageComponent }

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
