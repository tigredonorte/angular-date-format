/* Angular modules */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Own modules */
import { DateFormatComponent } from './date-format.component';
import { DateFormatModel } from './date-format.model';
import { DateFormatValidator } from './date-format.validator';

export * from './date-format.component';
export * from './date-format.enum';
export * from './date-format.model';
export * from './date-format.validator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DateFormatComponent
  ],
  exports: [
    DateFormatComponent,
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
