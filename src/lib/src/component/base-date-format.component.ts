import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn, FormControl } from '@angular/forms';
import { DateFormatValidator } from '../validator/date-format.validator';
import { BaseFieldComponet, TranslationObject } from '../base-field.component';
import * as moment from 'moment/moment';
import { createAutoCorrectedDatePipe } from '../pipe/create-auto-corrected-date.pipe';

export interface ErrorMapping extends TranslationObject {
  invalidDateError?: string,
  minDateError?: string,
  maxDateError?: string,
  usefullDateError?: string,
  holidayError?: string,
  weekendError?: string
};

export class BaseDateFormatComponent extends BaseFieldComponet {

  @Input() cssclass: string;
  @Input() disabled: boolean;
  @Input() inputname: string;
  @Input() maxDate: string;
  @Input() minDate: string;
  @Input() placeholder: string;
  @Input() readonly: string;
  @Input() holiday = false;
  @Input() usefullDate = false;
  @Input() weekend = false;
  @Input() forceMask = false;
  @Input() format = 'YYYY-MM-DD';
  datePipe = createAutoCorrectedDatePipe(this.format, this.forceMask);
  dateMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  transformDate = (date, format = this.format) => date.indexOf('_') !== -1 ? date : moment.utc(date, [format, 'YYYY-MM-DD']).format(format);
  constructor() {
    super();
  }

  ngOnChanges(inputs: any) {
    try {
      if (inputs['format']) {
        this.dateMask = this.getDateMask(this.format);
        this.datePipe = createAutoCorrectedDatePipe(this.format, this.forceMask);
      }
      if (inputs['minDate'] && inputs['minDate'] === 'today') {
        this.minDate = moment.utc().format(this.format);
      }
      if (inputs['maxDate'] && inputs['maxDate'] === 'today') {
        this.maxDate = moment.utc().format(this.format);
      }
    } catch (e) {
      console.warn(e);
    }
    super.ngOnChanges(inputs);
  }

  getDateMask = (data, digit: any = /\d/) => {
    const out = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === '/' || data[i] === '-') {
        out.push(data[i]);
      } else {
        out.push(digit);
      }
    }
    return out;
  }

  getErrorMessage(): string {
    const errors = this.getTranslations();
    for (let i in errors) {
      if (this.field.hasError(i)) {
        if(this['get_' + i]) {
          return this['get_' + i](errors[i]);
        }
        return errors[i];
      }
    }
    return '';
  }

  getValidateFn(): ValidatorFn {
    return DateFormatValidator.validate({
      minDate: this.minDate,
      maxDate: this.maxDate,
      holiday: this.holiday,
      weekend: this.weekend,
      usefullDate: this.usefullDate
    });
  }

  getValidators(): ValidatorFn | ValidatorFn[] {
    return [this.getValidateFn()];
  }

  getTranslations(): ErrorMapping {
    return {
      invalidDateError: 'Insert a valid date.',
      minDateError: 'Insert a date after ${minDate}.',
      maxDateError: 'Insert a date before ${maxDate}.',
      usefullDateError: 'Insert a usefull date.',
      holidayError: 'Not insert a holiday date.',
      weekendError: 'Not insert a weekend date.'
    };
  }

  getOptions() {
    return {};
  }

  getOutput(date) {
    return moment.utc(date, [this.format, 'YYYY-MM-DD']).format('YYYY-MM-DD');
  }

  private get_minDateError(str) {
    const dt = this.transformDate(this.minDate);
    return str.replace('${minDate}', (dt === 'Invalid date') ? this.minDate : dt);
  }

  private get_maxDateError(str) {
    const dt = this.transformDate(this.maxDate);
    return str.replace('${maxDate}', (dt === 'Invalid date') ? this.maxDate : dt);
  }
}
