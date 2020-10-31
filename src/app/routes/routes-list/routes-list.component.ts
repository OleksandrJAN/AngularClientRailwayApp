import { Component, Input, OnInit } from '@angular/core';
import { TimeTransformer } from 'src/app/service';

import { Route } from 'src/app/_domain';


@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  displayedColumns: string[] = ['train', 'departure', 'arrival', 'duration'];

  _routes: Route[];

  @Input() set routes(routes: Route[]) {
    this._routes = routes;
  }


  constructor(private timeTransformer: TimeTransformer) { }

  ngOnInit(): void { }


  getNumberTime(time: number): string {
    return this.timeTransformer.timeToNumber(time);
  }

  getStringTime(time: number): string {
    return this.timeTransformer.timeToString(time);
  }

}
