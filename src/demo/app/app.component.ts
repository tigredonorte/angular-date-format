import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private minDate = '01/01/1900';
  private options = {
    minDate: '01/01/1900',
    maxDate: 'today',
    usefullDate: false,
    holiday: false,
    weekend: false
  };

  constructor() {
    this.updateDate('date');
  }

  private updateDate(ev) {
    console.log(ev);
  }
}
