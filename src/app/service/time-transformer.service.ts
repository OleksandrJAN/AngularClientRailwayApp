import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class TimeTransformer {
    public static readonly LONG_DASH: string = '\u2014';

    // return time in "hh:mm" pattern
    timeToNumber(time: number): string {
        if (time === null) {
            return TimeTransformer.LONG_DASH;
        }

        let minutes = time % 60;
        let hours = (time - minutes) / 60;

        let minutesString = minutes < 10 ? '0' + minutes : minutes;
        let hoursString = hours < 10 ? '0' + hours : hours;
        return hoursString + ':' + minutesString;
    }

    // return time in "hh ч mm мин" pattern
    timeToString(time: number): string {
        if (time === null) {
            return TimeTransformer.LONG_DASH;
        }

        let minutes = time % 60;
        let hours = (time - minutes) / 60;

        let minutesString = minutes ? minutes + ' мин' : '';
        let hoursString = hours ? hours + ' ч' : '';
        return hoursString + ' ' + minutesString;
    }


}