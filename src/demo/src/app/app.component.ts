import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  control: FormControl = new FormControl('');
  private minDate = '01/01/1900';
  options = {
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
