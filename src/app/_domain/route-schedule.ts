import { Schedule, Station, Train } from '.';

export interface RouteSchedule {
    train: Train;
    stationsSchedule: { station: Station, schedule: Schedule }[];
}