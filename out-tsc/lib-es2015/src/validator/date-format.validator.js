/* Angular modules */
/* Own modules */
import { DateFormatEnum } from '../model/date-format.enum';
import { DateFormatModel } from '../model/date-format.model';
export class DateFormatValidator {
    constructor() {
        this.dateModel = null;
        this.holidays = new Array();
        this.dateModel = new DateFormatModel();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static _IsUsefullDay(date) {
        if (DateFormatValidator.validator === null) {
            DateFormatValidator.validator = new DateFormatValidator();
        }
        return DateFormatValidator.validator.isUsefullDay(date);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    static validate(options) {
        let /** @type {?} */ validator = new DateFormatValidator();
        let /** @type {?} */ model = new DateFormatModel();
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
                let /** @type {?} */ date = c.value;
                let /** @type {?} */ userDate = model.getBrazilianDate(date);
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDateBySpecialString(date) {
        if (date === 'today') {
            return this.dateModel.getAmericanDate('');
        }
        return date;
    }
    /**
     * @param {?} dt
     * @return {?}
     */
    getDateByString(dt) {
        try {
            if (typeof dt === 'undefined' || dt === null || dt === '') {
                return null;
            }
            if (typeof dt === 'object') {
                return dt;
            }
            const /** @type {?} */ e = dt.split('T');
            const /** @type {?} */ temp = e[0].split('-');
            const /** @type {?} */ dt2 = new Date(parseInt(temp[0], 10), parseInt(temp[1], 10) - 1, parseInt(temp[2], 10));
            if (dt2.toString() === 'Invalid Date') {
                return null;
            }
            return dt2;
        }
        catch (e) {
            console.warn(e);
            return null;
        }
    }
    /**
     * @param {?} year
     * @return {?}
     */
    getHolidays(year) {
        if (typeof this.holidays[year] !== 'undefined') {
            return this.holidays[year];
        }
        const /** @type {?} */ day = 86400;
        let /** @type {?} */ dates = new Array();
        dates['pascoa'] = this.easter_date(parseInt(year, 10));
        dates['sexta_santa'] = dates['pascoa'] - (2 * day);
        dates['carnaval'] = dates['pascoa'] - (47 * day);
        dates['carnaval2'] = dates['pascoa'] - (46 * day);
        dates['corpus_cristi'] = dates['pascoa'] + (60 * day);
        let /** @type {?} */ holidays = new Array();
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isHoliday(date) {
        try {
            const /** @type {?} */ e0 = date.split('T');
            const /** @type {?} */ dt = e0[0];
            const /** @type {?} */ e = dt.split('-');
            this.getHolidays(e[0]);
            const /** @type {?} */ i = this.holidays[e[0]].indexOf(dt);
            return (i !== -1);
        }
        catch (e) {
            console.log('isHoliday failure!', e);
            return false;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isUsefullDay(date) {
        if (!this.isValidDate(date)) {
            return false;
        }
        return (!this.isWeekend(date) && !this.isHoliday(date));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    isValidDate(str) {
        const /** @type {?} */ date = this.dateModel.string2date(str);
        return (date === null) ? false : true;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isWeekend(date) {
        const /** @type {?} */ weekDay = this.getDateByString(date);
        return (weekDay.getDay() === 0 || weekDay.getDay() === 6);
    }
    /**
     * @param {?} val
     * @param {?} maxDate
     * @return {?}
     */
    maxDateCheck(val, maxDate) {
        maxDate = this.getDateBySpecialString(maxDate);
        if (maxDate !== '' && this.dateModel.diffDate(maxDate, val, DateFormatEnum.DAY) < 0) {
            return false;
        }
        return true;
    }
    /**
     * @param {?} val
     * @param {?} minDate
     * @return {?}
     */
    minDateCheck(val, minDate) {
        minDate = this.getDateBySpecialString(minDate);
        if (minDate && minDate !== '' && this.dateModel.diffDate(val, minDate, DateFormatEnum.DAY) < 0) {
            return false;
        }
        return true;
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    createHolidayDate(timestamp) {
        const /** @type {?} */ dt = new Date(timestamp);
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    }
    /**
     * @param {?} Y
     * @return {?}
     */
    easter_date(Y) {
        const /** @type {?} */ C = Math.floor(Y / 100);
        const /** @type {?} */ N = Y - 19 * Math.floor(Y / 19);
        const /** @type {?} */ K = Math.floor((C - 17) / 25);
        let /** @type {?} */ I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        let /** @type {?} */ J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        const /** @type {?} */ L = I - J;
        const /** @type {?} */ M = 3 + Math.floor((L + 40) / 44);
        const /** @type {?} */ D = L + 28 - 31 * Math.floor(M / 4);
        return this.padout(M) + '.' + this.padout(D);
    }
    /**
     * @param {?} n
     * @return {?}
     */
    padout(n) { return (n < 10) ? '0' + n : n; }
}
DateFormatValidator.validator = null;
function DateFormatValidator_tsickle_Closure_declarations() {
    /** @type {?} */
    DateFormatValidator.validator;
    /** @type {?} */
    DateFormatValidator.prototype.dateModel;
    /** @type {?} */
    DateFormatValidator.prototype.holidays;
}
