import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateFormatModule } from 'angular-date-format';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, DateFormatModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
