"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Own modules */
var date_format_enum_1 = require("../model/date-format.enum");
var date_format_validator_1 = require("../validator/date-format.validator");
var DateFormatModel = (function () {
    function DateFormatModel() {
    }
    DateFormatModel.prototype.addDate = function (date, subType, amonth, utc) {
        if (!date) {
            date = '';
        }
        if (!subType) {
            subType = date_format_enum_1.DateFormatEnum.DAY;
        }
        if (!amonth) {
            amonth = 1;
        }
        return this.subDate(date, subType, -amonth, utc);
    };
    DateFormatModel.prototype.date2string = function (d, utc, includeTime) {
        try {
            if (d == null || !(d instanceof Date)) {
                return '';
            }
            var date = void 0, time = '';
            date = this.getDateString(d, utc);
            if (includeTime) {
                time = 'T' + this.getTimeString(d, utc);
            }
            return date + time;
        }
        catch (e) {
            console.log(e);
        }
    };
    DateFormatModel.prototype.date2UTC = function (date) {
        if (date == null) {
            return '';
        }
        var dt = this.string2date(date);
        return (dt instanceof Date) ? dt.getUTCFullYear() + '-' + (dt.getUTCMonth() + 1) + '-' + dt.getUTCDate() : '';
    };
    DateFormatModel.prototype.diffDate = function (date1, date2, $type) {
        try {
            var d1 = new Date(this.getAmericanDate(date1));
            var d2 = new Date(this.getAmericanDate(date2));
            var diff = (d1.getTime() - d2.getTime()) / 1000;
            var year = void 0;
            switch ($type) {
                case date_format_enum_1.DateFormatEnum.YEAR:
                    year = new Date(d1.getTime() - d2.getTime());
                    return year.getUTCFullYear() - 1970;
                case date_format_enum_1.DateFormatEnum.MONTH:
                    year = new Date(d1.getTime() - d2.getTime());
                    var signal = (diff < 0) ? -1 : 1;
                    return signal * year.getUTCMonth();
                case date_format_enum_1.DateFormatEnum.DAY: return diff / (60 * 60 * 24);
                case date_format_enum_1.DateFormatEnum.HOUR: return diff / (60 * 60);
                case date_format_enum_1.DateFormatEnum.MINUTE: return diff / 60;
            }
            return diff;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    };
    DateFormatModel.prototype.getAmericanDate = function (date, utc) {
        try {
            if (date === '') {
                var dt = new Date();
                return this.date2string(dt, utc);
            }
            var e = date.toString().split('T');
            var out = (!utc)
                ? this.detectDateType(e[0]) === 'db'
                    ? e[0] : this.reverseDate(e[0])
                : this.detectDateType(e[0]) === 'db'
                    ? this.date2UTC(e[0]) : this.date2UTC(this.reverseDate(e[0]));
            var temp = out.split('-');
            var mm = (parseInt(temp[1], 10) < 10) ? '0' + parseInt(temp[1], 10) : temp[1];
            var dd = (parseInt(temp[2], 10) < 10) ? '0' + parseInt(temp[2], 10) : temp[2];
            return temp[0] + '-' + mm + '-' + dd;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    };
    DateFormatModel.prototype.getBrazilianDate = function (date, utc) {
        try {
            var e = date.toString().split('T');
            return this.detectDateType(e[0]) === 'br' ? e[0] : this.reverseDate(e[0]);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    };
    DateFormatModel.prototype.getMonthFirstDate = function (date, utc, usefullDate) {
        try {
            if (!date) {
                date = '';
            }
            var d = new Date(this.getAmericanDate(date));
            d.setDate(1);
            d.setHours(0);
            var out = this.date2string(d, utc);
            if (!usefullDate) {
                return out;
            }
            return this.getNextUsefullDate(out, utc);
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @function getLastUsefullDate: Find last usefull date of date
     * @param date: string date to find usefull date
     * @param utc: boolean convert to utc
     * @returns string last usefull date
     */
    DateFormatModel.prototype.getLastUsefullDate = function (date, utc) {
        return this.findUsefullDate(date, utc, false);
    };
    /**
     * @function getMonthLastDate: return last date of month
     * @param date: string
     * @param utc: boolean convert to utc
     * @param usefullDate: boolean if set true, this function will return last month usefull date
     * @returns string last usefull date
     */
    DateFormatModel.prototype.getMonthLastDate = function (date, utc, usefullDate) {
        try {
            if (!date) {
                date = '';
            }
            var dt = this.getAmericanDate(date);
            var e = dt.split('-');
            var d = new Date(parseInt(e[0], 10), parseInt(e[1], 10), 0);
            var out = this.date2string(d, utc);
            if (!usefullDate) {
                return out;
            }
            return this.getLastUsefullDate(out, utc);
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @function getNextUsefullDate: Find next usefull date of date
     * @param date: string date to find usefull date
     * @param utc: boolean convert to utc
     * @returns string next usefull date
     */
    DateFormatModel.prototype.getNextUsefullDate = function (date, utc) {
        return this.findUsefullDate(date, utc, true);
    };
    /*
     * TODO Refactor to use getAmericanDate instead getBrazilianDate,
     * or insert a second parameter saying the format.
     *
     * WARN: The refactor should break some specs.
     */
    DateFormatModel.prototype.string2date = function (str) {
        try {
            if (typeof str !== 'string') {
                return null;
            }
            if (str.length < 10) {
                return null;
            }
            var i = 10;
            while (i--) {
                if (str.charAt(i) === '_') {
                    return null;
                }
            }
            str = this.getBrazilianDate(str);
            var dd = parseInt(str.substr(0, 2), 10);
            var mm = parseInt(str.substr(3, 2), 10);
            var yy = parseInt(str.substr(6, 4), 10);
            var date = new Date(yy, mm - 1, dd);
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
    };
    DateFormatModel.prototype.subDate = function (date, subType, amonth, utc) {
        try {
            if (!date) {
                date = '';
            }
            if (!subType) {
                subType = date_format_enum_1.DateFormatEnum.DAY;
            }
            if (!amonth) {
                amonth = 1;
            }
            var d = new Date(this.getAmericanDate(date));
            if (subType === date_format_enum_1.DateFormatEnum.MONTH) {
                d.setMonth(d.getMonth() - amonth);
            }
            if (subType === date_format_enum_1.DateFormatEnum.YEAR) {
                d.setFullYear(d.getFullYear() - amonth);
            }
            if (subType === date_format_enum_1.DateFormatEnum.DAY) {
                d.setDate(d.getDate() - amonth + 2);
            }
            return this.date2string(d, utc);
        }
        catch (e) {
            console.log(e);
        }
    };
    DateFormatModel.prototype.detectDateType = function (date) {
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
    };
    DateFormatModel.prototype.findUsefullDate = function (date, utc, next) {
        if (date === void 0) { date = ''; }
        try {
            date = this.getAmericanDate(date, utc);
            var e = date.split('-');
            var d = this.string2date(date);
            var day = parseInt(e[2], 10);
            var out = this.date2string(d, utc);
            while (!date_format_validator_1.DateFormatValidator._IsUsefullDay(out)) {
                (next) ? day++ : day--;
                d.setDate(day);
                out = this.date2string(d, utc);
            }
            return out;
        }
        catch (e) {
            console.log(e);
        }
    };
    DateFormatModel.prototype.getDateString = function (d, utc) {
        if (utc === void 0) { utc = false; }
        var year, month, day = '';
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
    };
    DateFormatModel.prototype.getTimeString = function (d, utc) {
        if (utc === void 0) { utc = false; }
        var hours, minutes, seconds = '';
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
    };
    DateFormatModel.prototype.reverseDate = function (date) {
        var data = date.split(' ');
        if (data[0] === '0000-00-00' || data[0] === '00/00/0000') {
            return '';
        }
        var dateReverseSeparator = !data[0].match(/\//ig) ? '-' : '/';
        var array = data[0].split(dateReverseSeparator).reverse();
        var join = !data[0].match(/\//ig) ? '/' : '-';
        data[0] = array.join(join);
        return data.join(' ');
    };
    return DateFormatModel;
}());
exports.DateFormatModel = DateFormatModel;
