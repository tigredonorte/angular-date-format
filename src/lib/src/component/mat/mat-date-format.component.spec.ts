/* Angular modules */
import { CommonModule } from '@angular/common';
import { forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaskedInputDirective } from 'angular2-text-mask';

import { DateFormatModelMock } from '../../mock/date-format.model.mock';
import { DateFormatValidatorMock } from '../../mock/date-format.validator.mock';
import { DateFormatModel } from '../../model/date-format.model';
import { DateFormatValidator } from '../../validator/date-format.validator';
import { MatDateFormatComponent } from './mat-date-format.component';

/* Third-party modules */
/* Own modules */
describe('MatDateFormatComponent', () => {
  let comp: MatDateFormatComponent;
  let fixture: ComponentFixture<MatDateFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [MatDateFormatComponent, MaskedInputDirective],
      providers: [
        { provide: DateFormatModel, useClass: DateFormatModelMock },
        { provide: DateFormatValidator, useClass: DateFormatValidatorMock },
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatDateFormatComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatDateFormatComponent), multi: true }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDateFormatComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());
});
