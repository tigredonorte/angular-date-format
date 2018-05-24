/* Angular modules */
import { Component, Input, forwardRef, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/* Own modules */
import { BaseDateFormatComponent } from '../../reusable/base-date-format.component';

@Component({
  selector: 'mat-date-format',
  templateUrl: './mat-date-format.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatDateFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatDateFormatComponent), multi: true }
  ]
})
export class MatDateFormatComponent extends BaseDateFormatComponent implements ControlValueAccessor, OnChanges, OnInit { }
