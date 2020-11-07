import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeTransformer } from 'src/app/_service';
import { RouteSchedule, Schedule, Station } from 'src/app/_domain';


@Component({
  selector: 'app-route-schedule',
  templateUrl: './route-schedule.component.html',
  styleUrls: ['./route-schedule.component.css']
})
export class RouteScheduleComponent implements OnInit {

  displayedColumns: string[] = ['station', 'arrival', 'departure', 'downtime', 'duration'];

  routeSchedule: RouteSchedule;

  private departureTime: number;
  arrivalStationName: string;
  departureStationName: string;

  constructor(
    private route: ActivatedRoute,
    private timeTransformer: TimeTransformer
  ) { }

  ngOnInit(): void {
    // get route schedule from RouteScheduleResolver 
    this.routeSchedule = this.route.snapshot.data['routeSchedule'];
    // init some component properties
    this.initProperties();
  }

  private initProperties() {
    // get departure train time
    this.departureTime = this.getSchedule(0).departureTime;
    // get first and last route stations
    let stationsCount: number = this.routeSchedule.stationsSchedule.length;
    this.arrivalStationName = this.getStation(0).name;
    this.departureStationName = this.getStation(stationsCount - 1).name;
  }

  private getStation(index: number): Station {
    return this.routeSchedule.stationsSchedule[index].station;
  }

  private getSchedule(index: number): Schedule {
    return this.routeSchedule.stationsSchedule[index].schedule;
  }


  getStationName(rowIndex: number): string {
    let station: Station = this.getStation(rowIndex);
    return station.name;
  }

  getArrivalTime(rowIndex: number): string {
    let schedule: Schedule = this.getSchedule(rowIndex);
    return this.timeTransformer.timeToNumber(schedule.arrivalTime);
  }

  getDepartureTime(rowIndex: number): string {
    let schedule: Schedule = this.getSchedule(rowIndex);
    return this.timeTransformer.timeToNumber(schedule.departureTime);
  }

  getDowntime(rowIndex: number): string {
    // there is no downtime at the departure and station stations
    if (rowIndex === 0 || rowIndex === this.routeSchedule.stationsSchedule.length - 1) {
      return TimeTransformer.LONG_DASH;
    }
    // schedule for row that are needed to calculate downtime
    let stationSchedule: Schedule = this.getSchedule(rowIndex);
    let stationArrivalTime: number = stationSchedule.arrivalTime;
    let stationDepartureTime: number = stationSchedule.departureTime;

    let downtime: number = stationDepartureTime - stationArrivalTime;
    return this.timeTransformer.timeToString(downtime);
  }

  getTravelTime(rowIndex: number): string {
    // there is no travel time at the departure station 
    if (rowIndex === 0) {
      return TimeTransformer.LONG_DASH;
    }

    let stationArrivalTime: number = this.getSchedule(rowIndex).arrivalTime;

    let travelTime: number = stationArrivalTime - this.departureTime;
    return this.timeTransformer.timeToString(travelTime);
  }

}
