import { Component, Input, OnInit } from '@angular/core';

import { Route } from 'src/app/_domain';


@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  _routes: Route[];

  @Input() set routes(routes: Route[]) {
    this._routes = routes;
  }

  
  constructor() { }

  ngOnInit(): void { }

}
