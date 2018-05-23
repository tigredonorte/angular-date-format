import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE_PROVIDER } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDateFormatModule } from '../../../lib/src/module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDateFormatModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    MAT_DATE_LOCALE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
