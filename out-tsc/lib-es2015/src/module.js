/* Angular modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/* Own modules */
import { DateFormatComponent } from './component/date-format.component';
import { DateFormatModel } from './model/date-format.model';
import { DateFormatValidator } from './validator/date-format.validator';
export class DateFormatModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: DateFormatModule,
            providers: [
                DateFormatModel,
                DateFormatValidator
            ]
        };
    }
}
DateFormatModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    DateFormatComponent,
                ],
                exports: [
                    DateFormatComponent
                ],
                providers: [
                    DateFormatModel,
                    DateFormatValidator
                ]
            },] },
];
/**
 * @nocollapse
 */
DateFormatModule.ctorParameters = () => [];
function DateFormatModule_tsickle_Closure_declarations() {
    /** @type {?} */
    DateFormatModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DateFormatModule.ctorParameters;
}
