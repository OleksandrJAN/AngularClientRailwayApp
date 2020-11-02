import { Schedule, Station, Train } from '.';

export class RouteSchedule {
    train: Train;
    stationsSchedule: { station: Station, schedule: Schedule }[];
}