/* Angular modules */
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/* Own modules */
import { BaseDateFormatComponent } from './base-date-format.component';

@Component({
    selector: 'date-format',
    templateUrl: './date-format.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateFormatComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateFormatComponent), multi: true }
    ]
})
export class DateFormatComponent extends BaseDateFormatComponent {}
