/* Own modules */
import { DateFormatEnum } from '../model/date-format.enum';
import { DateFormatValidator } from '../validator/date-format.validator';
export class DateFormatModel {
    /**
     * @param {?=} date
     * @param {?=} subType
     * @param {?=} amonth
     * @param {?=} utc
     * @return {?}
     */
    addDate(date, subType, amonth, utc) {
        if (!date) {
            date = '';
        }
        if (!subType) {
            subType = DateFormatEnum.DAY;
        }
        if (!amonth) {
            amonth = 1;
        }
        return this.subDate(date, subType, -amonth, utc);
    }
    /**
     * @param {?} d
     * @param {?=} utc
     * @param {?=} includeTime
     * @return {?}
     */
    date2string(d, utc, includeTime) {
        try {
            if (d == null || !(d instanceof Date)) {
                return '';
            }
            let /** @type {?} */ date, /** @type {?} */ time = '';
            date = this.getDateString(d, utc);
            if (includeTime) {
                time = 'T' + this.getTimeString(d, utc);
            }
            return date + time;
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    date2UTC(date) {
        if (date == null) {
            return '';
        }
        const /** @type {?} */ dt = this.string2date(date);
        return (dt instanceof Date) ? dt.getUTCFullYear() + '-' + (dt.getUTCMonth() + 1) + '-' + dt.getUTCDate() : '';
    }
    /**
     * @param {?} date1
     * @param {?} date2
     * @param {?} $type
     * @return {?}
     */
    diffDate(date1, date2, $type) {
        try {
            const /** @type {?} */ d1 = new Date(this.getAmericanDate(date1));
            const /** @type {?} */ d2 = new Date(this.getAmericanDate(date2));
            const /** @type {?} */ diff = (d1.getTime() - d2.getTime()) / 1000;
            let /** @type {?} */ year;
            switch ($type) {
                case DateFormatEnum.YEAR:
                    year = new Date(d1.getTime() - d2.getTime());
                    return year.getUTCFullYear() - 1970;
                case DateFormatEnum.MONTH:
                    year = new Date(d1.getTime() - d2.getTime());
                    const /** @type {?} */ signal = (diff < 0) ? -1 : 1;
                    return signal * year.getUTCMonth();
                case DateFormatEnum.DAY: return diff / (60 * 60 * 24);
                case DateFormatEnum.HOUR: return diff / (60 * 60);
                case DateFormatEnum.MINUTE: return diff / 60;
            }
            return diff;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    }
    /**
     * @param {?} date
     * @param {?=} utc
     * @return {?}
     */
    getAmericanDate(date, utc) {
        try {
            if (date === '') {
                let /** @type {?} */ dt = new Date();
                return this.date2string(dt, utc);
            }
            const /** @type {?} */ e = date.toString().split('T');
            const /** @type {?} */ out = (!utc)
                ? this.detectDateType(e[0]) === 'db'
                    ? e[0] : this.reverseDate(e[0])
                : this.detectDateType(e[0]) === 'db'
                    ? this.date2UTC(e[0]) : this.date2UTC(this.reverseDate(e[0]));
            const /** @type {?} */ temp = out.split('-');
            const /** @type {?} */ mm = (parseInt(temp[1], 10) < 10) ? '0' + parseInt(temp[1], 10) : temp[1];
            const /** @type {?} */ dd = (parseInt(temp[2], 10) < 10) ? '0' + parseInt(temp[2], 10) : temp[2];
            return temp[0] + '-' + mm + '-' + dd;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    /**
     * @param {?} date
     * @param {?=} utc
     * @return {?}
     */
    getBrazilianDate(date, utc) {
        try {
            const /** @type {?} */ e = date.toString().split('T');
            return this.detectDateType(e[0]) === 'br' ? e[0] : this.reverseDate(e[0]);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    /**
     * @param {?=} date
     * @param {?=} utc
     * @param {?=} usefullDate
     * @return {?}
     */
    getMonthFirstDate(date, utc, usefullDate) {
        try {
            if (!date) {
                date = '';
            }
            let /** @type {?} */ d = new Date(this.getAmericanDate(date));
            d.setDate(1);
            d.setHours(0);
            const /** @type {?} */ out = this.date2string(d, utc);
            if (!usefullDate) {
                return out;
            }
            return this.getNextUsefullDate(out, utc);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * \@function getLastUsefullDate: Find last usefull date of date
     * @param {?=} date
     * @param {?=} utc
     * @return {?}
     */
    getLastUsefullDate(date, utc) {
        return this.findUsefullDate(date, utc, false);
    }
    /**
     * \@function getMonthLastDate: return last date of month
     * @param {?=} date
     * @param {?=} utc
     * @param {?=} usefullDate
     * @return {?}
     */
    getMonthLastDate(date, utc, usefullDate) {
        try {
            if (!date) {
                date = '';
            }
            const /** @type {?} */ dt = this.getAmericanDate(date);
            const /** @type {?} */ e = dt.split('-');
            const /** @type {?} */ d = new Date(parseInt(e[0], 10), parseInt(e[1], 10), 0);
            const /** @type {?} */ out = this.date2string(d, utc);
            if (!usefullDate) {
                return out;
            }
            return this.getLastUsefullDate(out, utc);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * \@function getNextUsefullDate: Find next usefull date of date
     * @param {?=} date
     * @param {?=} utc
     * @return {?}
     */
    getNextUsefullDate(date, utc) {
        return this.findUsefullDate(date, utc, true);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    string2date(str) {
        try {
            if (typeof str !== 'string') {
                return null;
            }
            if (str.length < 10) {
                return null;
            }
            let /** @type {?} */ i = 10;
            while (i--) {
                if (str.charAt(i) === '_') {
                    return null;
                }
            }
            str = this.getBrazilianDate(str);
            const /** @type {?} */ dd = parseInt(str.substr(0, 2), 10);
            const /** @type {?} */ mm = parseInt(str.substr(3, 2), 10);
            const /** @type {?} */ yy = parseInt(str.substr(6, 4), 10);
            const /** @type {?} */ date = new Date(yy, mm - 1, dd);
            if (dd !== date.getDate()) {
                return null;
            }
            if (mm !== date.getMonth() + 1) {
                return null;
            }
            if (yy !== date.getFullYear()) {
                return null;
            }
            return date;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    /**
     * @param {?=} date
     * @param {?=} subType
     * @param {?=} amonth
     * @param {?=} utc
     * @return {?}
     */
    subDate(date, subType, amonth, utc) {
        try {
            if (!date) {
                date = '';
            }
            if (!subType) {
                subType = DateFormatEnum.DAY;
            }
            if (!amonth) {
                amonth = 1;
            }
            const /** @type {?} */ d = new Date(this.getAmericanDate(date));
            if (subType === DateFormatEnum.MONTH) {
                d.setMonth(d.getMonth() - amonth);
            }
            if (subType === DateFormatEnum.YEAR) {
                d.setFullYear(d.getFullYear() - amonth);
            }
            if (subType === DateFormatEnum.DAY) {
                d.setDate(d.getDate() - amonth + 2);
            }
            return this.date2string(d, utc);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    detectDateType(date) {
        try {
            if (date.indexOf('/') !== -1) {
                return 'br';
            }
            if (date.indexOf('-') !== -1) {
                return 'db';
            }
            return 'none';
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @param {?=} date
     * @param {?=} utc
     * @param {?=} next
     * @return {?}
     */
    findUsefullDate(date = '', utc, next) {
        try {
            date = this.getAmericanDate(date, utc);
            const /** @type {?} */ e = date.split('-');
            const /** @type {?} */ d = this.string2date(date);
            let /** @type {?} */ day = parseInt(e[2], 10);
            let /** @type {?} */ out = this.date2string(d, utc);
            while (!DateFormatValidator._IsUsefullDay(out)) {
                (next) ? day++ : day--;
                d.setDate(day);
                out = this.date2string(d, utc);
            }
            return out;
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @param {?} d
     * @param {?=} utc
     * @return {?}
     */
    getDateString(d, utc = false) {
        let /** @type {?} */ year, /** @type {?} */ month, /** @type {?} */ day = '';
        if (utc) {
            year = d.getUTCFullYear().toString();
            month = (d.getUTCMonth() + 1).toString();
            day = d.getUTCDate().toString();
        }
        else {
            year = d.getFullYear().toString();
            month = (d.getMonth() + 1).toString();
            day = d.getDate().toString();
        }
        if (parseInt(month, 10) < 10) {
            month = '0' + month;
        }
        if (parseInt(day, 10) < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }
    /**
     * @param {?} d
     * @param {?=} utc
     * @return {?}
     */
    getTimeString(d, utc = false) {
        let /** @type {?} */ hours, /** @type {?} */ minutes, /** @type {?} */ seconds = '';
        if (utc) {
            hours = d.getUTCHours().toString();
            minutes = d.getUTCMinutes().toString();
            seconds = d.getUTCSeconds().toString();
        }
        else {
            hours = d.getHours().toString();
            minutes = d.getMinutes().toString();
            seconds = d.getSeconds().toString();
        }
        if (parseInt(hours, 10) < 10) {
            hours = '0' + hours;
        }
        if (parseInt(minutes, 10) < 10) {
            minutes = '0' + minutes;
        }
        if (parseInt(seconds, 10) < 10) {
            seconds = '0' + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    reverseDate(date) {
        const /** @type {?} */ data = date.split(' ');
        if (data[0] === '0000-00-00' || data[0] === '00/00/0000') {
            return '';
        }
        const /** @type {?} */ dateReverseSeparator = !data[0].match(/\//ig) ? '-' : '/';
        const /** @type {?} */ array = data[0].split(dateReverseSeparator).reverse();
        const /** @type {?} */ join = !data[0].match(/\//ig) ? '/' : '-';
        data[0] = array.join(join);
        return data.join(' ');
    }
}
