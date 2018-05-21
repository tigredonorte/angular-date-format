import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  control: FormControl = new FormControl('');
  options = {
    minDate: '1900-01-01',
    maxDate: '',
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

  dateDisplayFn = (date) => {
    date = date.split('T')[0];
    if (date.indexOf('-') !== -1) {
      date = date.split('-').join('/');
    }
    if (date.indexOf('/') === -1) {
      return date;
    }
    if (date.indexOf('/') !== 2) {
      let arrDate = date.split('/');
      arrDate = [arrDate[2], arrDate[1], arrDate[0]];
      return arrDate.join('/');
    }
    return date;
  };
}
