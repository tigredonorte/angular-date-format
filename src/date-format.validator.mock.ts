/* Angular modules */
import { ValidatorFn, AbstractControl} from '@angular/forms';

/* Own modules */
import { DateFormatModelMock } from './date-format.model.mock';
import { DateFormatValidator } from './date-format.validator';

export class DateFormatValidatorMock extends DateFormatValidator {

    dateModel:DateFormatModelMock=null;
    public constructor() {
        super();
        this.dateModel = new DateFormatModelMock();
    }

    public isValidDate(str:string): boolean {
        return(str == '')?false:true;
    }

    holidays = new Array();
    public isUsefullDay(date:string) {
        return (!this.isWeekend(date) && !this.isHoliday(date));
    }

    public isWeekend(date: string) {
        return false;
    }

    public getDateByString(dt:string): Date {
      console.log(dt);
        return new Date(dt);
    }

    public isHoliday(date:string) {
        return false;
    }

            public getHolidays(year:string): any {
                var holidays = new Array();
                holidays.push("2016-01-01");
                holidays.push("2016-02-08");
                holidays.push("2016-02-09");
                holidays.push("2016-03-25");
                holidays.push("2016-03-27");
                holidays.push("2016-04-21");
                holidays.push("2016-05-01");
                holidays.push("2016-05-26");
                holidays.push("2016-09-07");
                holidays.push("2016-10-12");
                holidays.push("2016-11-02");
                holidays.push("2016-11-15");
                holidays.push("2016-12-25");
                return holidays;
            }

    public minDateCheck(val:string, minDate:string) {
        return true;
    }

    public maxDateCheck(val:string, maxDate:string) {
        return true;
    }

    public getDateBySpecialString(date:string): string {
        return date;
    }

    public static validate(options:any): ValidatorFn {
        var validator = new DateFormatValidatorMock();
        var model     = new DateFormatModelMock();
        return function (c: AbstractControl) {
            try {
                var date     = c.value;
                var userDate = model.getBrazilianDate(date);
                if(false == validator.isValidDate(date)) {
                    return {invalidDateError: {given: userDate}};
                }
                if(false == validator.minDateCheck(date, options.minDate)) {
                    return {minDateError: {given: userDate, minDate: model.getBrazilianDate(options.minDate)}};
                }
                if(false == validator.maxDateCheck(date, options.maxDate)) {
                    return {maxDateError: {given: userDate, maxDate: model.getBrazilianDate(options.maxDate)}};
                }
                if(options.usefullDate && false == validator.isUsefullDay(date)) {
                    return {usefullDateError: {given: userDate}};
                }
                if(options.holiday && false == validator.isHoliday(date)) {
                    return {holidayError    : {given: userDate}};
                }
                if(options.weekend && false == validator.isWeekend(date)) {
                    return {weekendError    : {given: userDate}};
                }
                return null;
            }catch(e) {
                console.log(e);
                return null;
            }
        };
    }
}
