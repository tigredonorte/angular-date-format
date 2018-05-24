import { CommonModule } from '@angular/common';
import { forwardRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskedInputDirective } from 'angular2-text-mask';

import { createAutoCorrectedDatePipe } from './create-auto-corrected-date.pipe';


/* Third-party modules */
/* Own modules */

describe('createAutoCorrectedDatePipe', () => {

  let datePipe = null;

  describe('testing auto completes', () => {
    it('should return empty value', () => {
      datePipe = createAutoCorrectedDatePipe('YYYY-MM-DD', false);
      expect(datePipe('____-__-__')).toEqual({ value: '', indexesOfPipedChars: [] });
    });

    it('should return value with format', () => {
      datePipe = createAutoCorrectedDatePipe('YYYY-MM-DD', true);
      expect(datePipe('____-__-__')).toEqual({ value: '____-__-__', indexesOfPipedChars: [] });
    });

    it('should complete month in other format', () => {
      datePipe = createAutoCorrectedDatePipe('YYYY-MM-DD', true);
      expect(datePipe('____-9_-__')).toEqual({ value: '____-09-__', indexesOfPipedChars: [5] });
    });
  });

  describe('testing auto completes', () => {
    beforeEach(() => datePipe = createAutoCorrectedDatePipe('DD/MM/YYYY', true));
    it('should return correct date', () => expect(datePipe('23/03/2017')).toEqual({ value: '23/03/2017', indexesOfPipedChars: [] }));
    it('testing auto complete day', () => expect(datePipe('5_/__/____')).toEqual({ value: '05/__/____', indexesOfPipedChars: [0] }));
    it('auto complete month', () => expect(datePipe('05/3_/____')).toEqual({ value: '05/03/____', indexesOfPipedChars: [3] }));
    it('not auto complete day 2', () => expect(datePipe('2_/__/____')).toEqual({ value: '2_/__/____', indexesOfPipedChars: [] }));
  });
});
