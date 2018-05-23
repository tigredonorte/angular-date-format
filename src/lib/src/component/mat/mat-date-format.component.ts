/* Angular modules */
import { Component, Input, forwardRef, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/* Own modules */
import { BaseDateFormatComponent } from '../base-date-format.component';

export interface ErrorMapping {
  invalidDateError?: string,
  minDateError?: string,
  maxDateError?: string,
  usefullDateError?: string,
  holidayError?: string,
  weekendError?: string
};

@Component({
  selector: 'mat-date-format',
  templateUrl: './mat-date-format.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatDateFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatDateFormatComponent), multi: true }
  ]
})
export class MatDateFormatComponent extends BaseDateFormatComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input()
  errorMapping: ErrorMapping = {
    invalidDateError: 'Insert a valid date.',
    minDateError: 'Insert a date after ${minDate}.',
    maxDateError: 'Insert a date before ${maxDate}.',
    usefullDateError: 'Insert a usefull date.',
    holidayError: 'Not insert a holiday date.',
    weekendError: 'Not insert a weekend date.'
  };
  @Input() control: FormControl;
  @Input() locale = 'pt-BR';

  public error = '';

  public ngOnChanges(input) {
    super.ngOnChanges(input);
    this.control.setValidators([this.validateFn]);
    this.control.updateValueAndValidity();
  }

  ngOnInit() {
    super.ngOnInit();
    this.control.statusChanges.subscribe((status) => {
      if (status === 'VALID' || !Object.keys(this.control.errors || {}).length) {
        this.error = '';
        return;
      }
      const firstError = Object.keys(this.control.errors)[0];
      if (firstError === 'minDateError') {
        this.error = this.errorMapping[firstError].replace('${minDate}', this.transformDate(this.minDate));
      } else if (firstError === 'maxDateError') {
        this.error = this.errorMapping[firstError].replace('${maxDate}', this.transformDate(this.maxDate));
      } else {
        this.error = this.errorMapping[firstError];
      }
    });
  }

}
