import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { DateFormatComponent } from './component/date-format.component';
import { DateFormatModel } from './model/date-format.model';
import { DateFormatValidator } from './validator/date-format.validator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextMaskModule
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
})
export class DateFormatModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DateFormatModule,
            providers: [
                DateFormatModel,
                DateFormatValidator
            ]
        };
    }
}
