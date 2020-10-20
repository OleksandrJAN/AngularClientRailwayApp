import { Station, Train } from '.';

export class Route {
    id: number;
    train: Train;
    arrivalStation: Station;
    departureStation: Station;
    arrivalTime: number;
    departureTime: number;
    travelTime: number;
}
