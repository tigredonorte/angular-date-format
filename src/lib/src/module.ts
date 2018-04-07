import { LOCALE_ID, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_LOCALE_PROVIDER,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DateFormatComponent } from './component/date-format.component';
import { MatDateFormatComponent } from './component/mat/mat-date-format.component';
import { DateFormatModel } from './model/date-format.model';
import { DateFormatValidator } from './validator/date-format.validator';

const CommonImports = [
  CommonModule,
  FormsModule,
  TextMaskModule
];

const CommonProviders = [
  DateFormatModel,
  DateFormatValidator,
  { provide: LOCALE_ID, useValue: 'en-US' },
  MAT_DATE_LOCALE_PROVIDER
];

@NgModule({
  imports: CommonImports,
  declarations: [DateFormatComponent],
  exports: [DateFormatComponent],
  providers: CommonProviders
})
export class DateFormatModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DateFormatModule,
      providers: CommonProviders
    };
  }
}

const MaterialImports = [
  ...CommonImports,
  ReactiveFormsModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  imports: MaterialImports,
  declarations: [MatDateFormatComponent],
  exports: [MatDateFormatComponent],
  providers: CommonProviders
})
export class MatDateFormatModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MatDateFormatModule,
      providers: CommonProviders
    };
  }
}
