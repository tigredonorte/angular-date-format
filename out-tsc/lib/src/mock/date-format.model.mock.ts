/* Own modules */
import { DateFormatEnum } from '../model/date-format.enum';
import { DateFormatModel } from '../model/date-format.model';

export class DateFormatModelMock extends DateFormatModel {

    public addDate(date?: string, subType?: DateFormatEnum, amonth?: number, utc?: boolean) {
        return '2016-01-01';
    }

    public date2string(d: Date, utc?: boolean, includeTime?: boolean): string {
        if (includeTime) { return '2016-01-01T00:00:00'; }
        return '2016-01-01';
    }

    public date2UTC(date: string): string {
        return '2016-01-01';
    }

    public diffDate(date1: string, date2: string, $type: DateFormatEnum) {
        try {
            const d1     = new Date(date1);
            const d2     = new Date(date2);
            const diff   = (d1.getTime() - d2.getTime()) / 1000;

            return (diff > 0) ? 10 : -10;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    public getAmericanDate(date: string, utc?: boolean): string {
        return '01-02-2017';
    }

    public getBrazilianDate(date: string, utc?: boolean) {
        return '02/01/2017';
    }

    public getMonthFirstDate(date?: string, utc?: boolean) {
        return '2016-01-01';
    }

    public string2date(str: string): Date {
        if (str.length < 10) {
            return null;
        }

        let i = 10;
        while (i--) {
            let c = str.charAt(i);
            if (c !== '/' && c !== '-' && isNaN(parseInt(c, 10))) {
                return null;
            }
        }

        try {
            const dd   = parseInt(str.substr(0, 2), 10);
            const mm   = parseInt(str.substr(3, 2), 10);
            const yy   = parseInt(str.substr(6, 4), 10);
            const date = new Date(yy, mm - 1, dd);

            if (dd !== date.getDate()) { return null; }
            if (mm !== date.getMonth() + 1) { return null; }
            if (yy !== date.getFullYear()) { return null; }

            return date;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public subDate(date?: string, subType?: DateFormatEnum, amonth?: number, utc?: boolean) {
        return '2016-01-01';
    }
}
