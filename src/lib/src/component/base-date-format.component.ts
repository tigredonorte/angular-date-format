import { Input, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as moment from 'moment/moment';

import { DateFormatModel } from '../model/date-format.model';
import { DateFormatValidator } from '../validator/date-format.validator';

export abstract class BaseDateFormatComponent implements ControlValueAccessor, OnChanges, OnInit {
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
  @Input() format = 'YYYY-MM-DD';
  datePipe = createAutoCorrectedDatePipe(this.format);
  _date = '';
  dateMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  value: string;
  dateModel: DateFormatModel = null;
  dateValidator: DateFormatValidator = null;

  propagateChange: any = () => { };
  touchedChange: any = () => { };
  validateFn: any = () => { };

  constructor() {
    this.dateValidator = new DateFormatValidator();
    this.dateModel = new DateFormatModel();
    this.minDate = '';
    this.maxDate = '';
    this.placeholder = '';
    this.value = '';
    this.disabled = false;
    this.cssclass = 'form-control';
  }

  getDateMask = (data) => {
    const out = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === '/' || data[i] === '-') {
        out.push(data[i]);
      } else {
        out.push(/\d/);
      }
    }
    return out;
  }

  transformDate = (date, format = this.format) => date.indexOf('_') !== -1 ? date : moment.utc(date, [format]).format(format);
  get date() {
    return this._date;
  }
  set date(newValue) {
    try {
      if (!newValue || newValue.trim() === '') {
        this.setEmptyValue();
        return;
      }

      const val = this.transformDate(newValue);
      if (val === '' || val === 'Invalid date') {
        this._date = newValue;
        return;
      }
      this._date = val;
      this.propagateChange(val);
    } catch (e) {
      console.warn(e);
      this.setEmptyValue();
    }
  }

  ngOnInit() {
    try {
      this.touchedChange();
      if (this.minDate === 'today') {
        moment.utc().format(this.format);
      }
      if (this.maxDate === 'today') {
        moment.utc().format(this.format);
      }

      const obj = {
        minDate: this.minDate,
        maxDate: this.maxDate,
        holiday: this.holiday,
        weekend: this.weekend,
        usefullDate: this.usefullDate
      };

      this.validateFn = DateFormatValidator.validate(obj);
    } catch (e) {
      console.warn(e);
    }
  }

  ngOnChanges(inputs: any) {
    try {
      if (inputs['format']) {
        this.dateMask = this.getDateMask(this.format);
        this.datePipe = createAutoCorrectedDatePipe(this.format);
      }

      if (inputs['minDate'] && inputs['minDate'] === 'today') {
        this.minDate = moment.utc().format(this.format);
      }
      if (inputs['maxDate'] && inputs['maxDate'] === 'today') {
        this.maxDate = moment.utc().format(this.format);
      }
      if (inputs['minDate'] || inputs['maxDate'] || inputs['holiday'] || inputs['weekend'] || inputs['usefullDate']) {
        const obj = {
          minDate: this.minDate,
          maxDate: this.maxDate,
          holiday: this.holiday,
          weekend: this.weekend,
          usefullDate: this.usefullDate
        };

        this.validateFn = DateFormatValidator.validate(obj);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  public isDisabled() {
    return this.disabled;
  }

  public focusEvent(event: any) {
    this.touchedChange();
  }

  public keyDownEvent(e: KeyboardEvent) {
    return true;
  }

  public keyUpEvent(e: KeyboardEvent) {
    const value = this._date;
    this.date = value;
  }

  private setEmptyValue() {
    this._date = '';
    this.propagateChange('');
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  /**********************************************************
   **BEGIN implementation of ControlValueAccessor interface**
   **********************************************************/
  writeValue(value: any) {
    if (value) {
      try {
        this.date = value;
      } catch (e) {
        this.date = '';
      }
    } else {
      this.date = '';
    }
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.touchedChange = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.readonly = isDisabled ? '1' : '';
  }
  /********************************************************
   **END implementation of ControlValueAccessor interface**
   ********************************************************/
}

export default function createAutoCorrectedDatePipe(dateFormat = 'YYYY-MM-DD') {
  return function (conformedValue) {
    const indexesOfPipedChars = [];
    const dateFormatArray = dateFormat.split(/[^DMYHms]+/);
    const maxValue = { 'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'HH': 23, 'mm': 59, 'ss': 59 }
    const minValue = { 'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'HH': 0, 'mm': 0, 'ss': 0 }
    const conformedValueArr = conformedValue.split('');

    // Check first digit
    dateFormatArray.forEach((format) => {
      const position = dateFormat.indexOf(format);
      const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

      if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
        conformedValueArr[position + 1] = conformedValueArr[position];
        conformedValueArr[position] = 0;
        indexesOfPipedChars.push(position);
      }
    })

    // Check for invalid date
    const assocFormat = {};
    const isInvalid = dateFormatArray.some((format) => {
      const position = dateFormat.indexOf(format);
      const length = format.length;
      const textValue = conformedValue.substr(position, length).replace(/\D/g, '');
      const value = parseInt(textValue, 10);

      assocFormat[format] = value;
      return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
    });

    if (isInvalid) {
      return false;
    }

    if (false === checkMonthConsistency(assocFormat)) {
      return false;
    }

    return {
      value: conformedValueArr.join(''),
      indexesOfPipedChars
    };
  }

  function checkMonthConsistency(assocFormat) {
    const d = assocFormat['DD'];
    const m = assocFormat['MM'];
    if (isNaN(m) || isNaN(d)) {
      return true;
    }
    if (m === 2) {
      return d <= 29;
    }
    if (m === 4 || m === 6 || m === 9 || m === 11) {
      return d <= 30 ? true : false;
    }
    return d <= 31 ? true : false;
  }
}
