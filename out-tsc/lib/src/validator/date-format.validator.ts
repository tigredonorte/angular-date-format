/* Angular modules */
import { ValidatorFn, AbstractControl} from '@angular/forms';

/* Own modules */
import { DateFormatEnum }   from '../model/date-format.enum';
import { DateFormatModel }  from '../model/date-format.model';

export class DateFormatValidator {

    static validator: DateFormatValidator = null;

    dateModel: DateFormatModel = null;
    holidays = new Array();

    public static _IsUsefullDay(date: string) {
        if (DateFormatValidator.validator === null) {
            DateFormatValidator.validator = new DateFormatValidator();
        }
        return DateFormatValidator.validator.isUsefullDay(date);
    }

    public static validate(options: any): ValidatorFn {
        let validator = new DateFormatValidator();
        let model = new DateFormatModel();
        return function (c: AbstractControl) {
            try {
                if (typeof options.minDate !== 'undefined'
                    && options.minDate === 'today') {
                    options.minDate = model.getAmericanDate('');
                }

                if (typeof options.maxDate !== 'undefined'
                    && options.maxDate === 'today') {
                    options.maxDate = model.getAmericanDate('');
                }

                let date = c.value;
                let userDate = model.getBrazilianDate(date);
                if (false === validator.isValidDate(date)) {
                    return {invalidDateError: {given: userDate}};
                }
                if (false === validator.minDateCheck(date, options.minDate)) {
                    return {minDateError: {given: userDate, minDate: model.getBrazilianDate(options.minDate)}};
                }
                if (false === validator.maxDateCheck(date, options.maxDate)) {
                    return {maxDateError: {given: userDate, maxDate: model.getBrazilianDate(options.maxDate)}};
                }
                if (options.usefullDate && false === validator.isUsefullDay(date)) {
                    return {usefullDateError: {given: userDate}};
                }
                if (options.holiday && false === validator.isHoliday(date)) {
                    return {holidayError: {given: userDate}};
                }
                if (options.weekend && false === validator.isWeekend(date)) {
                    return {weekendError: {given: userDate}};
                }
                return null;
            }catch (e) {
                console.log(e);
                return null;
            }
        };
    }

    public constructor() {
        this.dateModel = new DateFormatModel();
    }

    public getDateBySpecialString(date: string): string {
        if (date === 'today') { return this.dateModel.getAmericanDate(''); }
        return date;
    }

    public getDateByString(dt: string): Date {
        try {
            if (typeof dt === 'undefined' || dt === null || dt === '') { return null; }
            if (typeof dt === 'object') { return dt; }

            const e = dt.split('T');
            const temp = e[0].split('-');
            const dt2 = new Date(
                parseInt(temp[0], 10),
                parseInt(temp[1], 10) - 1,
                parseInt(temp[2], 10)
            );

            if (dt2.toString() === 'Invalid Date') { return null; }
            return dt2;
        }catch (e) {
            console.warn(e);
            return null;
        }
    }

    public getHolidays(year: string): any {
        if (typeof this.holidays[year] !== 'undefined') { return this.holidays[year]; }

        const day = 86400;

        let dates = new Array();
        dates['pascoa'] = this.easter_date(parseInt(year, 10));
        dates['sexta_santa'] = dates['pascoa'] - (2 * day);
        dates['carnaval'] = dates['pascoa'] - (47 * day);
        dates['carnaval2'] = dates['pascoa'] - (46 * day);
        dates['corpus_cristi'] = dates['pascoa'] + (60 * day);

        let holidays = new Array();
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

    public isHoliday(date: string) {
        try {
            const e0 = date.split('T');
            const dt = e0[0];
            const e = dt.split('-');
            this.getHolidays(e[0]);

            const i = this.holidays[e[0]].indexOf(dt);
            return (i !== -1);
        } catch (e) {
            console.log('isHoliday failure!', e);
            return false;
        }
    }

    public isUsefullDay(date: string) {
      if (!this.isValidDate(date)) { return false; }
      return (!this.isWeekend(date) && !this.isHoliday(date));
    }

    public isValidDate(str: string): boolean {
        const date = this.dateModel.string2date(str);
        return(date === null) ? false : true;
    }

    public isWeekend(date: string) {
        const weekDay = this.getDateByString(date);
        return (weekDay.getDay() === 0 || weekDay.getDay() === 6);
    }

    public maxDateCheck(val: string, maxDate: string) {
        maxDate = this.getDateBySpecialString(maxDate);
        if (maxDate !== '' && this.dateModel.diffDate(maxDate, val, DateFormatEnum.DAY) < 0) {
            return false;
        }
        return true;
    }

    public minDateCheck(val: string, minDate: string) {
        minDate = this.getDateBySpecialString(minDate);

        if (minDate && minDate !== '' && this.dateModel.diffDate(val, minDate, DateFormatEnum.DAY) < 0) {
            return false;
        }

        return true;
    }

    private createHolidayDate(timestamp: number): string {
        const dt = new Date(timestamp);
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    }

    private easter_date(Y: number) {
        const C = Math.floor(Y / 100);
        const N = Y - 19 * Math.floor(Y / 19);
        const K = Math.floor((C - 17) / 25);
        let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        const L = I - J;
        const M = 3 + Math.floor((L + 40) / 44);
        const D = L + 28 - 31 * Math.floor(M / 4);

        return this.padout(M) + '.' + this.padout(D);
    }

    private padout(n: number) { return (n < 10) ? '0' + n : n; }
}
