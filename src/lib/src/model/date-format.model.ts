/* Own modules */
import { DateFormatEnum }       from '../model/date-format.enum';
import { DateFormatValidator }  from '../validator/date-format.validator';

export class DateFormatModel {

    public addDate(date?: string, subType?: DateFormatEnum, amonth?: number, utc?: boolean) {
        if (!date) { date = ''; }
        if (!subType) { subType = DateFormatEnum.DAY; }
        if (!amonth) { amonth = 1; }

        return this.subDate(date, subType, -amonth, utc);
    }

    public date2string(d: Date, utc?: boolean, includeTime?: boolean): string {
        try {
            if (d == null || !(d instanceof Date)) { return ''; }
            let date, time = '';
            date = this.getDateString(d, utc);
            if (includeTime) { time = 'T' + this.getTimeString(d, utc); }
            return date + time;
        } catch (e) { console.log(e); }
    }

    public date2UTC(date: string): string {
        if (date == null) { return ''; }

        const dt = this.string2date(date);

        return (dt instanceof Date) ? dt.getUTCFullYear() + '-' + (dt.getUTCMonth() + 1) + '-' + dt.getUTCDate() : '';
    }

    public diffDate(date1: string, date2: string, $type: DateFormatEnum) {
        try {
            const d1   = new Date(this.getAmericanDate(date1));
            const d2   = new Date(this.getAmericanDate(date2));
            const diff = (d1.getTime() - d2.getTime());

            let year;
            switch ($type) {
                case DateFormatEnum.YEAR:
                    year = new Date(d1.getTime() - d2.getTime());
                    return year.getUTCFullYear() - 1970;
                case DateFormatEnum.MONTH:
                    return Math.abs(d1.getUTCMonth() - d2.getUTCMonth()) +
                      Math.abs((d1.getUTCFullYear() - d2.getUTCFullYear()) * 12);
                case DateFormatEnum.DAY:  return diff / (1000 * 60 * 60 * 24);
                case DateFormatEnum.HOUR:  return diff / (1000 * 60 * 60);
                case DateFormatEnum.MINUTE: return diff / (1000 * 60);
            }

            return diff;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    public getAmericanDate(date: string, withTime?: boolean, utc?: boolean): string {
        try {
            if (date === '') {
                let dt = new Date();
                return this.date2string(dt, utc);
            }
            const e = date.toString().split('T');
            let dateType = this.detectDateType(e[0]);
            let out = (!utc)
                ? dateType.indexOf('db') !== -1
                    ? dateType === 'db' ? e[0] : this.reverseDate(e[0])
                    : dateType === 'br' ? this.reverseDate(e[0]) : e[0]
                : dateType.indexOf('db') !== -1
                    ? this.date2UTC(dateType === 'db' ? e[0] : this.reverseDate(e[0]))
                    : this.date2UTC(dateType === 'br' ? this.reverseDate(e[0]) : e[0]);
            if (dateType.indexOf('db') === -1) {
              out = out.split('/').join('-');
            }
            const temp = out.split('-');
            const mm = (parseInt(temp[1], 10) < 10) ? '0' + parseInt(temp[1], 10) : temp[1];
            const dd = (parseInt(temp[2], 10) < 10) ? '0' + parseInt(temp[2], 10) : temp[2];

            if (e[1] && withTime) {
              return temp[0] + '-' + mm + '-' + dd + 'T' + e[1];
            }
            return temp[0] + '-' + mm + '-' + dd;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public getBrazilianDate(date: string, utc?: boolean) {
        try {
            const e = date.toString().split('T');
            const dateType = this.detectDateType(e[0]);
            const mustReverseDateType = [ 'br', 'db-reversed' ];
            const d = mustReverseDateType.indexOf(dateType) === -1 ? e[0] : this.reverseDate(e[0]);
            return dateType.indexOf('db') === -1 ? d : d.split('-').join('/');
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public getMonthFirstDate(date?: string, utc?: boolean, usefullDate?: boolean): string {
        try {
            if (!date) { date = ''; }

            let d = new Date(this.getAmericanDate(date));

            d.setDate(1);
            d.setHours(0);

            const out = this.date2string(d, utc);
            if (!usefullDate) { return out; }
            return this.getNextUsefullDate(out, utc);
        }catch (e) { console.log(e); }
    }

    /**
     * Find last usefull date of date
     * @param date: string date to find usefull date
     * @param utc: boolean convert to utc
     * @returns string last usefull date
     */
    public getLastUsefullDate(date?: string, utc?: boolean): string {
        return this.findUsefullDate(date, utc, false);
    }

    /**
     * return last date of month
     * @param date: string
     * @param utc: boolean convert to utc
     * @param usefullDate: boolean if set true, this function will return last month usefull date
     * @returns string last usefull date
     */
    public getMonthLastDate(date?: string, utc?: boolean, usefullDate?: boolean): string {
        try {
            if (!date) { date = ''; }

            const dt = this.getAmericanDate(date);
            const e = dt.split('-');
            const d = new Date(parseInt(e[0], 10), parseInt(e[1], 10), 0);

            const out = this.date2string(d, utc);
            if (!usefullDate) { return out; }
            return this.getLastUsefullDate(out, utc);
        } catch (e) { console.log(e); }
    }

    /**
     * Find next usefull date of date
     * @param date: string date to find usefull date
     * @param utc: boolean convert to utc
     * @returns string next usefull date
     */
    public getNextUsefullDate(date?: string, utc?: boolean): string {
        return this.findUsefullDate(date, utc, true);
    }

    /*
     * TODO Refactor to use getAmericanDate instead getBrazilianDate,
     * or insert a second parameter saying the format.
     *
     * WARN: The refactor should break some specs.
     */
    public string2date(str: string): Date {
        try {
            if (typeof str !== 'string') { return null; }
            if (str.length < 10) { return null; }

            let i = 10;
            while (i--) {
                if (str.charAt(i) === '_') { return null; }
            }

            str = this.getBrazilianDate(str);
            const yy   = parseInt(str.substr(0, 4), 10);
            const mm   = parseInt(str.substr(5, 2), 10);
            const dd   = parseInt(str.substr(8, 2), 10);
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

    public subDate(date?: string, subType?: DateFormatEnum, amount?: number, utc?: boolean) {
        try {
            if (!date) { date = ''; }
            if (!subType) { subType = DateFormatEnum.DAY; }
            if (!amount) { amount = 1; }

            const d = new Date(this.getAmericanDate(date));
            if (subType === DateFormatEnum.MONTH) {
              if (utc) {
                d.setUTCMonth(d.getUTCMonth() - amount);
              } else {
                d.setMonth(d.getMonth() - amount);
              }
            }
            if (subType === DateFormatEnum.YEAR) {
              if (utc) {
                d.setUTCFullYear(d.getUTCFullYear() - amount);
              } else {
                d.setFullYear(d.getFullYear() - amount);
              }
            }

            if (subType === DateFormatEnum.DAY)  {
              if (utc) {
                d.setUTCDate(d.getUTCDate() - amount);
              } else {
                d.setDate(d.getDate() - amount);
              }
            }

            return this.date2string(d, utc, date.indexOf('T') !== -1);
        } catch (e) { console.log(e); }
    }

    private detectDateType(date: string) {
        try {
            let separatorIndex = -1;
            if ((separatorIndex = date.indexOf('/')) !== -1) {
              return (separatorIndex !== 4) ? 'br' : 'br-reversed';
            }
            if ((separatorIndex = date.indexOf('-')) !== -1) {
              return (separatorIndex === 4) ? 'db' : 'db-reversed';
            }
            return 'none';
        } catch (e) { console.log(e); }
    }

    private findUsefullDate(date = '', utc?: boolean, next?: boolean): string {
        try {
            date = this.getAmericanDate(date, utc);
            const e = date.split('-');
            const d = this.string2date(date);

            let day = parseInt(e[2], 10);
            let out = this.date2string(d, utc);
            while (!DateFormatValidator._IsUsefullDay(out)) {
                (next) ? day++ : day--;
                d.setDate(day);
                out = this.date2string(d, utc);
            }

            return out;
        } catch (e) { console.log(e); }
    }

    private getDateString(d: Date, utc = false): string {
        let year, month, day = '';
        if (utc) {
            year = d.getUTCFullYear().toString();
            month = (d.getUTCMonth() + 1).toString();
            day = d.getUTCDate().toString();
        } else {
            year = d.getFullYear().toString();
            month = (d.getMonth() + 1).toString();
            day = d.getDate().toString();
        }

        if (parseInt(month, 10) < 10) { month = '0' + month; }
        if (parseInt(day, 10) < 10) { day = '0' + day; }
        return year + '-' + month + '-' + day;
    }

    private getTimeString(d: Date, utc = false): string {
        let hours, minutes, seconds = '';
        if (utc) {
            hours = d.getUTCHours().toString();
            minutes = d.getUTCMinutes().toString();
            seconds = d.getUTCSeconds().toString();
        } else {
            hours = d.getHours().toString();
            minutes = d.getMinutes().toString();
            seconds = d.getSeconds().toString();
        }
        if (parseInt(hours, 10) < 10) { hours = '0' + hours; }
        if (parseInt(minutes, 10) < 10) { minutes = '0' + minutes; }
        if (parseInt(seconds, 10) < 10) { seconds = '0' + seconds; }

        return hours + ':' + minutes + ':' + seconds;
    }

    private reverseDate(date: string) {
        const data = date.split(' ');
        if (data[0] === '0000-00-00' || data[0] === '00/00/0000') { return ''; }

        const dateReverseSeparator = !data[0].match(/\//ig) ? '-' : '/';
        const array = data[0].split(dateReverseSeparator).reverse();

        const join = data[0].match(/\//ig) ? '/' : '-';
        data[0] = array.join(join);

        return data.join(' ');
    }
}
