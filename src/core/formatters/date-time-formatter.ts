import { Formatter } from './formatter.interface';

export class DateTimeFormatter implements Formatter<Date> {

    format(date: Date): string {

        const day = this.pad(date.getDate());
        const month = this.pad(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = this.pad(date.getHours());
        const minutes = this.pad(date.getMinutes());

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    private pad(num: number): string {

        return num.toString().padStart(2, '0');
    }
}