import { Color } from '../styling/color';
import { Formatter } from './formatter.interface';
import { DateTimeFormatter } from './date-time-formatter';

export class TimestampFormatter implements Formatter<Date> {

    constructor(private readonly dateFormatter = new DateTimeFormatter()) { }

    format(date: Date): string {

        const formatted = this.dateFormatter.format(date);
        return Color.GRAY.apply(`⏰ [ ${formatted} ]`);
    }
}