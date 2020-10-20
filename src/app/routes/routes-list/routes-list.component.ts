import { Component, Input, OnInit } from '@angular/core';

import { Route } from 'src/app/_domain';


@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  _routes: Route[];

  displayedColumns: string[] = ['train', 'departure', 'arrival', 'duration'];

  @Input() set routes(routes: Route[]) {
    this._routes = routes;
  }

  
  constructor() { }

  ngOnInit(): void { }


  durationToString(travelTime: number): string {
    let minutes = travelTime % 60;
    let hours = (travelTime - minutes) / 60;
    return hours + ' ч ' + minutes + ' мин';
  }

  timeToString(time: number): string {
    let minutes = time % 60;
    let hours = (time - minutes) / 60;
    return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
  }



}
