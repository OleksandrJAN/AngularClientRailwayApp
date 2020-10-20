import { Station } from '.';

export class RouteSearchParameters {
    constructor(
        public departureStation: Station,
        public arrivalStation: Station
    ) { }
}