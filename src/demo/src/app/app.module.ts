import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE_PROVIDER } from '@angular/material';
import { MatDateFormatModule } from 'angular-date-format';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatDateFormatModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    MAT_DATE_LOCALE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
