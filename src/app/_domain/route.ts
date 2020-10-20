import { Station, Train } from '.';

export class Route {
    id: number;
    train: Train;
    fromRouteStation: Station;
    toRouteStation: Station;
    fromUserStation: Station;
    toUserStation: Station;
    departureTime: number;
    arrivalTime: number;
    travelTime: number;
}
