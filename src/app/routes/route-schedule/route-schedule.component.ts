import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { RouteService } from 'src/app/service';
import { Schedule, RouteSchedule } from 'src/app/_domain';


@Component({
  selector: 'app-route-schedule',
  templateUrl: './route-schedule.component.html',
  styleUrls: ['./route-schedule.component.css']
})
export class RouteScheduleComponent implements OnInit {

  displayedColumns: string[] = ['station', 'arrival', 'departure', 'downtime', 'duration'];

  routeSchedule: RouteSchedule = new RouteSchedule();
  // error because using this.travelTime
  travelTime: number = 0;


  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('id');
        return this.routeService.findRoute(id);
      })
    ).subscribe(
      (routeSchedule: RouteSchedule) => {
        this.routeSchedule = routeSchedule;
        console.log(this.routeSchedule);
      }
    )
  }


  timeToNumber(time: number): string {
    if (time === null) {
      // return long dash
      return '\u2014';
    }

    let minutes = time % 60;
    let hours = (time - minutes) / 60;

    let minutesString = minutes < 10 ? '0' + minutes : minutes;
    let hoursString = hours < 10 ? '0' + hours : hours;
    return hoursString + ':' + minutesString;
  }

  timeToString(time: number): string {
    if (time === null) {
      // return long dash
      return '\u2014';
    }

    let minutes = time % 60;
    let hours = (time - minutes) / 60;

    let minutesString = minutes ? minutes + ' мин' : '';
    let hoursString = hours ? hours + ' ч' : '';
    return hoursString + ' ' + minutesString;
  }

  getDowntime(rowIndex: number): string {
    // there is no downtime at the departure and station stations
    if (rowIndex === 0 || rowIndex === this.routeSchedule.stationsSchedule.length - 1) {
      // return long dash
      return '\u2014';
    }

    // schedule for row that are needed to calculate downtime
    let stationSchedule: Schedule = this.routeSchedule.stationsSchedule[rowIndex].schedule;
    let stationArrivalTime = stationSchedule.arrivalTime;
    let stationDepartureTime = stationSchedule.departureTime;

    let downtime = stationDepartureTime - stationArrivalTime;
    return this.timeToString(downtime);
  }

  getTravelTime(rowIndex: number): string {
    // there is no travel time at the departure station 
    if (rowIndex === 0) {
      // return long dash
      return '\u2014';
    }

    // schedule for current and previous rows that are needed to calculate travel time
    let currStationSchedule: Schedule = this.routeSchedule.stationsSchedule[rowIndex].schedule;
    let prevStationSchedule: Schedule = this.routeSchedule.stationsSchedule[rowIndex - 1].schedule;

    let currStationArrivalTime = currStationSchedule.arrivalTime;
    let prevStationArrivalTime = prevStationSchedule.arrivalTime;
    let prevStationDepartureTime = prevStationSchedule.departureTime;

    // then rowIndex === 1, prevStationArrivalTime === null, so substract prevStationDepartureTime
    // in all other cases substract prevStationArrivalTime
    this.travelTime += currStationArrivalTime - (prevStationArrivalTime !== null ? prevStationArrivalTime : prevStationDepartureTime);
    
    return this.timeToString(this.travelTime);
  }


}
