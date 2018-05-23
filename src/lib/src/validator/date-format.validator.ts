/* Angular modules */
import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment/moment';

export class DateFormatValidator {
  static validator: DateFormatValidator = null;

  holidays = new Array();
  format = 'YYYY-MM-DD';
  formats = ['YYYY-MM-DD', 'DD/MM/YYYY'];

  public static _IsUsefullDay(date: string) {
    if (DateFormatValidator.validator === null) {
      DateFormatValidator.validator = new DateFormatValidator();
    }
    return DateFormatValidator.validator.isUsefullDay(date);
  }

  public static validate(options: any): ValidatorFn {
    const validator = new DateFormatValidator();
    return function (c: AbstractControl) {
      try {
        const userDate = c.value;
        const date = moment.utc(userDate, validator.formats).format(validator.format);
        if (date === 'Invalid date' || userDate.indexOf('_') !== -1) {
          return { invalidDateError: { given: userDate } };
        }

        if (typeof options.minDate !== 'undefined' && options.minDate === 'today') {
          options.minDate = moment.utc().format(validator.format);
        }

        if (false === validator.minDateCheck(date, options.minDate)) {
          return {
            minDateError: { given: userDate, minDate: moment.utc(options.minDate, validator.formats).format(validator.formats[1]) }
          };
        }

        if (typeof options.maxDate !== 'undefined' && options.maxDate === 'today') {
          options.maxDate = moment.utc().format(validator.format);
        }
        if (false === validator.maxDateCheck(date, options.maxDate)) {
          return {
            maxDateError: { given: userDate, maxDate: moment.utc(options.minDate, validator.formats).format(validator.formats[1]) }
          };
        }
        if (options.usefullDate && false === validator.isUsefullDay(date)) {
          return { usefullDateError: { given: userDate } };
        }
        if (options.holiday && true === validator.isHoliday(date)) {
          return { holidayError: { given: userDate } };
        }
        if (options.weekend && true === validator.isWeekend(date)) {
          return { weekendError: { given: userDate } };
        }
        return null;
      } catch (e) {
        console.warn(e);
        return null;
      }
    };
  }

  public constructor() { }

  public getDateBySpecialString(date: string): string {
    if (date === 'today') {
      return moment.utc().format(this.format)
    }
    return date;
  }

  public getDateByString(dt: string): Date {
    try {
      if (typeof dt === 'undefined' || dt === null || dt === '') {
        return null;
      }
      if (typeof dt === 'object') {
        return dt;
      }

      const e = dt.split('T');
      const temp = e[0].split('-');
      const dt2 = new Date(parseInt(temp[0], 10), parseInt(temp[1], 10) - 1, parseInt(temp[2], 10));

      if (dt2.toString() === 'Invalid Date') {
        return null;
      }
      return dt2;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  public getHolidays(year: string): any {
    if (typeof this.holidays[year] !== 'undefined') {
      return this.holidays[year];
    }

    const day = 86400;

    let dates = new Array();
    dates['pascoa'] = this.easter_date(parseInt(year, 10));
    dates['sexta_santa'] = dates['pascoa'] - 2 * day;
    dates['carnaval'] = dates['pascoa'] - 47 * day;
    dates['carnaval2'] = dates['pascoa'] - 46 * day;
    dates['corpus_cristi'] = dates['pascoa'] + 60 * day;

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
      const _date = moment.utc(date, this.formats);
      const year = _date.format('YYYY');
      this.getHolidays(year);
      const f = this.holidays[year].indexOf(_date.format('YYYY-MM-DD'));
      return this.holidays[year].indexOf(_date.format('YYYY-MM-DD')) !== -1;
    } catch (e) {
      console.warn('isHoliday failure!', e);
      return false;
    }
  }

  public isUsefullDay(date: string) {
    if (!this.isValidDate(date)) {
      return false;
    }
    return !this.isWeekend(date) && !this.isHoliday(date);
  }

  public isValidDate(str: string): boolean {
    const date = moment.utc(str, this.formats).format(this.format);
    return date === 'Invalid date' ? false : true;
  }

  public isWeekend(date: string) {
    const weekDay = this.getDateByString(date);
    if (weekDay === null) {
      return false;
    }
    return weekDay.getDay() === 0 || weekDay.getDay() === 6;
  }

  public maxDateCheck(val: string, maxDate: string) {
    const a = moment(maxDate, this.formats);
    const b = moment(val, this.formats);
    return maxDate && a.isAfter(b);
  }

  public minDateCheck(val: string, minDate: string) {
    const a = moment(minDate, this.formats);
    const b = moment(val, this.formats);
    return minDate && a.isBefore(b);
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
    I = I - 30 * Math.floor(I / 30);
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    const L = I - J;
    const M = 3 + Math.floor((L + 40) / 44);
    const D = L + 28 - 31 * Math.floor(M / 4);

    return this.padout(M) + '.' + this.padout(D);
  }

  private padout(n: number) {
    return n < 10 ? '0' + n : n;
  }
}
