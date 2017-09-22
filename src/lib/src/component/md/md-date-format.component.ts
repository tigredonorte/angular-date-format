/* Angular modules */
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

/* Own modules */
import { BaseDateFormatComponent } from '../base-date-format.component';

@Component({
    selector: 'md-date-format',
    templateUrl: './md-date-format.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MdDateFormatComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MdDateFormatComponent), multi: true }
    ]
})
export class MdDateFormatComponent extends BaseDateFormatComponent implements OnInit {
  @Input() locale = 'pt-BR';

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.dateAdapter.setLocale(this.locale);
  }
}
