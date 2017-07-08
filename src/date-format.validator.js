"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Own modules */
var date_format_enum_1 = require("./date-format.enum");
var date_format_model_1 = require("./date-format.model");
var DateFormatValidator = (function () {
    function DateFormatValidator() {
        this.dateModel = null;
        this.holidays = new Array();
        this.dateModel = new date_format_model_1.DateFormatModel();
    }
    DateFormatValidator._IsUsefullDay = function (date) {
        if (DateFormatValidator.validator === null) {
            DateFormatValidator.validator = new DateFormatValidator();
        }
        return DateFormatValidator.validator.isUsefullDay(date);
    };
    DateFormatValidator.validate = function (options) {
        var validator = new DateFormatValidator();
        var model = new date_format_model_1.DateFormatModel();
        return function (c) {
            try {
                if (typeof options.minDate !== 'undefined'
                    && options.minDate === 'today') {
                    options.minDate = model.getAmericanDate('');
                }
                if (typeof options.maxDate !== 'undefined'
                    && options.maxDate === 'today') {
                    options.maxDate = model.getAmericanDate('');
                }
                var date = c.value;
                var userDate = model.getBrazilianDate(date);
                if (false === validator.isValidDate(date)) {
                    return { invalidDateError: { given: userDate } };
                }
                if (false === validator.minDateCheck(date, options.minDate)) {
                    return { minDateError: { given: userDate, minDate: model.getBrazilianDate(options.minDate) } };
                }
                if (false === validator.maxDateCheck(date, options.maxDate)) {
                    return { maxDateError: { given: userDate, maxDate: model.getBrazilianDate(options.maxDate) } };
                }
                if (options.usefullDate && false === validator.isUsefullDay(date)) {
                    return { usefullDateError: { given: userDate } };
                }
                if (options.holiday && false === validator.isHoliday(date)) {
                    return { holidayError: { given: userDate } };
                }
                if (options.weekend && false === validator.isWeekend(date)) {
                    return { weekendError: { given: userDate } };
                }
                return null;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        };
    };
    DateFormatValidator.prototype.getDateBySpecialString = function (date) {
        if (date === 'today') {
            return this.dateModel.getAmericanDate('');
        }
        return date;
    };
    DateFormatValidator.prototype.getDateByString = function (dt) {
        try {
            if (typeof dt === 'undefined' || dt === null || dt === '') {
                return null;
            }
            if (typeof dt === 'object') {
                return dt;
            }
            var e = dt.split('T');
            var temp = e[0].split('-');
            var dt2 = new Date(parseInt(temp[0], 10), parseInt(temp[1], 10) - 1, parseInt(temp[2], 10));
            if (dt2.toString() === 'Invalid Date') {
                return null;
            }
            return dt2;
        }
        catch (e) {
            console.warn(e);
            return null;
        }
    };
    DateFormatValidator.prototype.getHolidays = function (year) {
        if (typeof this.holidays[year] !== 'undefined') {
            return this.holidays[year];
        }
        var day = 86400;
        var dates = new Array();
        dates['pascoa'] = this.easter_date(parseInt(year, 10));
        dates['sexta_santa'] = dates['pascoa'] - (2 * day);
        dates['carnaval'] = dates['pascoa'] - (47 * day);
        dates['carnaval2'] = dates['pascoa'] - (46 * day);
        dates['corpus_cristi'] = dates['pascoa'] + (60 * day);
        var holidays = new Array();
        holidays.push(year + '-01-01');
        holidays.push(this.createHolidayDate(dates['carnaval']));
        holidays.push(this.createHolidayDate(dates['carnaval2']));
        holidays.push(this.createHolidayDate(dates['sexta_santa']));
        holidays.push(this.createHolidayDate(dates['pascoa']));
        holidays.push(year + '-04-21');
        holidays.push(year + '-05-01');
        holidays.push(year + '-09-07');
        holidays.push(this.createHolidayDate(dates['corpus_cristi']));
        holidays.push(year + '-10-12');
        holidays.push(year + '-11-02');
        holidays.push(year + '-11-15');
        holidays.push(year + '-12-25');
        this.holidays[year] = holidays;
        return holidays;
    };
    DateFormatValidator.prototype.isHoliday = function (date) {
        try {
            var e0 = date.split('T');
            var dt = e0[0];
            var e = dt.split('-');
            this.getHolidays(e[0]);
            var i = this.holidays[e[0]].indexOf(dt);
            return (i !== -1);
        }
        catch (e) {
            console.log('isHoliday failure!', e);
            return false;
        }
    };
    DateFormatValidator.prototype.isUsefullDay = function (date) {
        if (!this.isValidDate(date)) {
            return false;
        }
        return (!this.isWeekend(date) && !this.isHoliday(date));
    };
    DateFormatValidator.prototype.isValidDate = function (str) {
        var date = this.dateModel.string2date(str);
        return (date === null) ? false : true;
    };
    DateFormatValidator.prototype.isWeekend = function (date) {
        var weekDay = this.getDateByString(date);
        return (weekDay.getDay() === 0 || weekDay.getDay() === 6);
    };
    DateFormatValidator.prototype.maxDateCheck = function (val, maxDate) {
        maxDate = this.getDateBySpecialString(maxDate);
        if (maxDate !== '' && this.dateModel.diffDate(maxDate, val, date_format_enum_1.DateFormatEnum.DAY) < 0) {
            return false;
        }
        return true;
    };
    DateFormatValidator.prototype.minDateCheck = function (val, minDate) {
        minDate = this.getDateBySpecialString(minDate);
        if (minDate && minDate !== '' && this.dateModel.diffDate(val, minDate, date_format_enum_1.DateFormatEnum.DAY) < 0) {
            return false;
        }
        return true;
    };
    DateFormatValidator.prototype.createHolidayDate = function (timestamp) {
        var dt = new Date(timestamp);
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    };
    DateFormatValidator.prototype.easter_date = function (Y) {
        var C = Math.floor(Y / 100);
        var N = Y - 19 * Math.floor(Y / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);
        return this.padout(M) + '.' + this.padout(D);
    };
    DateFormatValidator.prototype.padout = function (n) { return (n < 10) ? '0' + n : n; };
    return DateFormatValidator;
}());
DateFormatValidator.validator = null;
exports.DateFormatValidator = DateFormatValidator;
