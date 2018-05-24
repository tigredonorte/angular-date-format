/* Angular modules */
import { CommonModule } from '@angular/common';
import { forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/* Third-party modules */
import { MaskedInputDirective } from 'angular2-text-mask';

/* Own modules */
import { DateFormatComponent } from './date-format.component';
import { DateFormatModel } from '../model/date-format.model';
import { DateFormatModelMock } from '../mock/date-format.model.mock';
import { DateFormatValidator } from '../validator/date-format.validator';
import { DateFormatValidatorMock } from '../mock/date-format.validator.mock';

describe('DateFormatComponent', () => {
  let comp: DateFormatComponent;
  let fixture: ComponentFixture<DateFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [DateFormatComponent, MaskedInputDirective],
      providers: [
        { provide: DateFormatModel, useClass: DateFormatModelMock },
        { provide: DateFormatValidator, useClass: DateFormatValidatorMock },
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateFormatComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateFormatComponent), multi: true }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFormatComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());
});
