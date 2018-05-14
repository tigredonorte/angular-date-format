/* Angular modules */
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

/* Own modules */
import { BaseDateFormatComponent } from '../base-date-format.component';

interface ErrorMapping {
  invalidDateError?: string;
  minDateError?: string;
  maxDateError?: string;
  usefullDateError?: string;
  holidayError?: string;
  weekendError?: string;
}

@Component({
  selector: 'mat-date-format',
  templateUrl: './mat-date-format.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatDateFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatDateFormatComponent), multi: true }
  ]
})
export class MatDateFormatComponent extends BaseDateFormatComponent implements ControlValueAccessor, OnInit {
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

  private statusSubscription;

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.dateAdapter.setLocale(this.locale);
    const self = this;
    this.control.valueChanges.subscribe((data) => {
      self._date = data;
    });
    this.control.statusChanges.subscribe((status) => {
      if (status === 'VALID' || !Object.keys(self.control.errors || {}).length) {
        self.error = '';
        return;
      }
      const firstError = Object.keys(self.control.errors)[0];
      if (firstError === 'minDateError') {
        self.error = self.errorMapping[firstError].replace('${minDate}', self.minDate);
      } else if (firstError === 'maxDateError') {
        self.error = self.errorMapping[firstError].replace('${maxDate}', self.maxDate);
      } else {
        self.error = self.errorMapping[firstError];
      }
    });
  }
}
