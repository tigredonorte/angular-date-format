import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(@Inject(LOCALE_ID) localeId, @Inject(MAT_DATE_LOCALE) matLocale) {
    console.log(localeId, matLocale);
  }
}
