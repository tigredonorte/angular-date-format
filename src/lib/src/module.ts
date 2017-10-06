import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  DateFormatValidator
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

@NgModule({
  imports: [
    ...CommonImports,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
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
