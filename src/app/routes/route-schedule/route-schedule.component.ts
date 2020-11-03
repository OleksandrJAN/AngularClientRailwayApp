import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeTransformer } from 'src/app/service';
import { RouteSchedule, Schedule, Station } from 'src/app/_domain';


@Component({
  selector: 'app-route-schedule',
  templateUrl: './route-schedule.component.html',
  styleUrls: ['./route-schedule.component.css']
})
export class RouteScheduleComponent implements OnInit, AfterContentChecked, AfterViewChecked {

  displayedColumns: string[] = ['station', 'arrival', 'departure', 'downtime', 'duration'];

  routeSchedule: RouteSchedule;
  arrivalStationName: string;
  departureStationName: string;
  travelTime: number = 0;


  constructor(
    private route: ActivatedRoute,
    private timeTransformer: TimeTransformer
  ) { }

  ngOnInit(): void {
    // get route schedule from RouteScheduleResolver 
    this.routeSchedule = this.route.snapshot.data['routeSchedule'];
    this.arrivalStationName = this.routeSchedule.stationsSchedule[0].station.name;
    this.departureStationName = this.routeSchedule.stationsSchedule[this.routeSchedule.stationsSchedule.length - 1].station.name;
  }

  ngAfterContentChecked(): void {
    // because of double rows checks in table, need to set shared variable travelTime default value
    // first check is ngAfterContentChecked()
    // second check is ngAfterViewChecked()
    this.setDefaultTravelTime();
  }

  ngAfterViewChecked(): void {
    // because of double rows checks in table, need to set shared variable travelTime default value
    // first check is ngAfterContentChecked()
    // second check is ngAfterViewChecked()
    this.setDefaultTravelTime();
  }

  private setDefaultTravelTime(): void {
    this.travelTime = 0;
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
    let stationSchedule: Schedule = this.routeSchedule.stationsSchedule[rowIndex].schedule;
    let stationArrivalTime = stationSchedule.arrivalTime;
    let stationDepartureTime = stationSchedule.departureTime;

    let downtime = stationDepartureTime - stationArrivalTime;
    return this.timeTransformer.timeToString(downtime);
    // return this.timeToString(downtime);
  }

  getTravelTime(rowIndex: number): string {
    // there is no travel time at the departure station 
    if (rowIndex === 0) {
      return TimeTransformer.LONG_DASH;
    }
    // schedule for current and previous rows that are needed to calculate travel time
    let currStationSchedule: Schedule = this.routeSchedule.stationsSchedule[rowIndex].schedule;
    let prevStationSchedule: Schedule = this.routeSchedule.stationsSchedule[rowIndex - 1].schedule;

    let currStationArrivalTime = currStationSchedule.arrivalTime;
    let prevStationArrivalTime = prevStationSchedule.arrivalTime;
    let prevStationDepartureTime = prevStationSchedule.departureTime;

    // Travel time between  two stations is equal to the difference between the arrival time to
    //  first station (since there is a downtime of arrival and departure times to first station)
    //  and the arrival time to second station.
    // Then rowIndex === 1, previous station arrival time === null, so substract prevous station departure time,
    //  in all other cases substract previous station arrival time
    this.travelTime += currStationArrivalTime - (prevStationArrivalTime || prevStationDepartureTime);

    return this.timeTransformer.timeToString(this.travelTime);
  }


}
