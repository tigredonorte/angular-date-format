import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDateFormatModule } from '../../lib/src/module';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, MatDateFormatModule, FormsModule, BrowserAnimationsModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
