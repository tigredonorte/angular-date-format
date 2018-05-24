import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MaskedInputDirective } from 'angular2-text-mask';

import { DateFormatModelMock } from '../mock/date-format.model.mock';
import { DateFormatValidatorMock } from '../mock/date-format.validator.mock';
import { DateFormatModel } from '../model/date-format.model';
import { DateFormatValidator } from '../validator/date-format.validator';
import { BaseDateFormatComponent } from './base-date-format.component';

@Component({
  selector: 'date-format',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ImplementedBaseDateFormatComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ImplementedBaseDateFormatComponent), multi: true }
  ],
  template: `
  <input
    type='tel'
    [ngClass]='cssclass'
    [textMask]='{mask:dateMask, showMask: true, pipe: datePipe, keepCharPositions: true}'
    [placeholder]='placeholder'
    [readonly]='readonly'
    [name]='inputname'
    [formControl]='field'
    [min]="minDate"
    [max]="maxDate"
  />`
})
export class ImplementedBaseDateFormatComponent extends BaseDateFormatComponent { }

/* Third-party modules */
/* Own modules */

describe('BaseDateFormatComponent', () => {
  let comp: ImplementedBaseDateFormatComponent;
  let fixture: ComponentFixture<ImplementedBaseDateFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      declarations: [ImplementedBaseDateFormatComponent, MaskedInputDirective],
      providers: [
        { provide: DateFormatModel, useClass: DateFormatModelMock },
        { provide: DateFormatValidator, useClass: DateFormatValidatorMock },
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ImplementedBaseDateFormatComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ImplementedBaseDateFormatComponent), multi: true }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementedBaseDateFormatComponent);
    comp = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create component', () => expect(comp).toBeDefined());

  describe('testing basic methods - ', () => {
    it('test get mask YYYY-MM-DD', () => {
      expect(comp.getDateMask('YYYY-MM-DD', '_')).toEqual(['_', '_', '_', '_', '-', '_', '_', '-', '_', '_']);
    });
    it('test get date mask', () => expect(comp.getDateMask('DD/MM/YYYY', '@')).toEqual(['@', '@', '/', '@', '@', '/', '@', '@', '@', '@']));
  });

  describe('testing changes - ', () => {
    [
      { title: 'test set invalid value', value: 'a', expected: '', inputs: {} },
      { title: 'test set holiday without holiday validation', value: '2017-01-01', expected: '2017-01-01', inputs: {}},
      { title: 'test set holiday with holiday validation', value: '2017-01-01', expected: '', inputs: { holiday: true }},
      { title: 'test set holiday with usefullDate validation', value: '2017-01-01', expected: '', inputs: { usefullDate: true }},
      { title: 'test set weekend day', value: '2018-05-26', expected: '', inputs: { weekend: true }},
      { title: 'test set date before minDate', value: '2018-05-26', expected: '', inputs: { minDate: '2019-02-03' }},
      { title: 'test set date after maxDate', value: '2018-05-26', expected: '', inputs: { maxDate: '2017-02-03' }}
    ].forEach(v => it(v.title, () => {
      comp.maxDate = v.inputs['maxDate'] || '';
      comp.minDate = v.inputs['minDate'] || '';
      comp.holiday = v.inputs['holiday'] || false;
      comp.usefullDate = v.inputs['usefullDate'] || false;
      comp.weekend = v.inputs['weekend'] || false;
      comp.ngOnInit();
      comp.field.setValue(v.value);
      comp.field.updateValueAndValidity();
      expect(comp.value).toEqual(v.expected);
    }));
  });
});
