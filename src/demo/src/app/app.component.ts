import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form = this.fb.group({
    'date' : this.fb.control({value: ''}, [])
  });
  options = {
    minDate: '2017-01-02',
    maxDate: '2018-01-04',
    usefullDate: false,
    holiday: false,
    weekend: false
  };

  constructor(protected fb: FormBuilder) {
    this.form.get('date').valueChanges.subscribe(data => {
      console.log(data);
    });
   }
}
