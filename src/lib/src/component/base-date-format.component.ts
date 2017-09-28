/* Angular modules */
import { Input } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';

/* Own modules */
import { DateFormatModel } from '../model/date-format.model';
import { DateFormatValidator } from '../validator/date-format.validator';

export abstract class BaseDateFormatComponent implements ControlValueAccessor, OnChanges, OnInit {

    @Input() cssclass: string;
    @Input() disabled: boolean;
    @Input() inputname: string;
    @Input() maxDate: string;
    @Input() minDate: string;
    @Input() placeholder: string;
    @Input() readonly: string;

    @Input() displayFn: any = () => { };
    @Input() holiday = false;
    @Input() usefullDate = false;
    @Input() weekend = false;
    @Input() _date = '';

    value: string;
    dateModel: DateFormatModel = null;
    dateValidator: DateFormatValidator = null;

    dateMask = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    propagateChange: any = () => { };
    touchedChange: any = () => { };
    validateFn: any = () => { };

    get date() {
        return this._date;
    }
    set date(newValue) {
        try {
            if (!newValue || newValue === '' || newValue == null) {
                this.setEmptyValue();
                return;
            }

            newValue = this.initValue(newValue);
            if (newValue === '') { return; }
            this._date = newValue;

            const temp = this.displayFn(newValue);
            this.propagateChange(temp);
        } catch (e) {
            console.log(e);
            this.setEmptyValue();
        }
    }

    constructor() {
        this.dateValidator = new DateFormatValidator();
        this.dateModel = new DateFormatModel();
        this.minDate = '';
        this.maxDate = '';
        this.placeholder = '';
        this.value = '';
        this.disabled = false;
        this.cssclass = 'form-control';
        this.displayFn = this.dateModel.getAmericanDate.bind(this.dateModel);
    }

    ngOnInit() {
        try {
            this.touchedChange();
            if (this.minDate === 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if (this.maxDate === 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }

            let obj = {
                minDate: this.minDate,
                maxDate: this.maxDate,
                holiday: this.holiday,
                weekend: this.weekend,
                usefullDate: this.usefullDate
            };

            this.validateFn = DateFormatValidator.validate(obj);
        } catch (e) { console.log(e); }
    }

    public isDisabled() {
        return this.disabled;
    }

    public focusEvent(event: any) {
        this.touchedChange();
    }

    public keyDownEvent(e: KeyboardEvent) {
        const value = this._date;
        const num   = parseInt(e.key, 10);

        if (isNaN(num)) { return; }
        if (typeof value === 'undefined' || value === '' || value[0] === '_') {
            return (num <= 3) ? true : false;
        }

        if (value[1] === '_') {
            if (parseInt(value[0], 10) < 3) { return true; }
            return (num < 2) ? true : false;
        }

        if (value[3] === '_') {
            return (num < 2) ? true : false;
        }
        if (value[4] === '_') {
            if (parseInt(value[3], 10) !== 0 && (num > 2)) { return false; }

            const day   = parseInt(value[0] + '' + value[1], 10);
            const month = parseInt(value[3] + '' + num, 10);

            if (month === 2) { return day <= 29; }
            if (month === 4 || month === 6 || month === 9 || month === 11) {
                return (day <= 30) ? true : false;
            }
            return (day <= 31) ? true : false;
        }

        if (value[6] === '_') {
            const n = (num + 1) * 1000 - 1;
            if (false === this.checkTypingMin(n)) {
                return false;
            }

            const n2 = num * 1000 - 1;
            if (false === this.checkTypingMax(n2)) {
                return false;
            }
        }

        if (value[8] === '_') {
            return true;
        }
        return true;
    }

    public keyUpEvent(e: KeyboardEvent) {
        const value = this._date;
        this.date = value;
    }

    private checkTypingMax(n: number) {
        try {
            if (this.maxDate !== '') {
                const max = this.dateModel.string2date(this.maxDate);
                if (max instanceof Date) {
                    if (max.getFullYear() < n) { return false; }
                }
            }
            return true;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    private checkTypingMin(n: number) {
        if (this.minDate !== '') {
            const min = this.dateModel.string2date(this.minDate);
            if (min instanceof Date) {
                if (min.getFullYear() > n) { return false; }
            }
        }
        return true;
    }

    private initValue(date: string): string {
        let temp: any = [];
        try {
            temp = date.split('T');
        } catch (e) {
            console.log(e);
            temp = date;
        }

        try {
            return this.dateModel.getBrazilianDate(temp[0]);
        } catch (e) { console.log(e); }
    }

    private setEmptyValue() {
        this._date = '';
        this.propagateChange('');
    }

    /***********************************************
     **BEGIN implementation of OnChanges interface**
     ***********************************************/
    ngOnChanges(inputs: any) {
        try {
            if (inputs['minDate'] && inputs['minDate'] === 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['maxDate'] && inputs['maxDate'] === 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['minDate'] || inputs['maxDate'] || inputs['holiday'] || inputs['weekend'] || inputs['usefullDate']) {
                let obj = {
                    minDate: inputs['minDate'] ? inputs['minDate'] : this.minDate,
                    maxDate: inputs['maxDate'] ? inputs['maxDate'] : this.maxDate,
                    holiday: inputs['holiday'] ? inputs['holiday'] : this.holiday,
                    weekend: inputs['weekend'] ? inputs['weekend'] : this.weekend,
                    usefullDate: inputs['usefullDate'] ? inputs['usefullDate'] : this.usefullDate
                };

                this.validateFn = DateFormatValidator.validate(obj);
            }
        } catch (e) { console.log(e); }
    }



    validate(c: FormControl) {
        return this.validateFn(c);
    }

    /**********************************************************
     **BEGIN implementation of ControlValueAccessor interface**
     **********************************************************/

     /**
      * writeValue(obj: any) is the method that writes a new value from the form model
      * into the view or (if needed) DOM property. This is where we want to update our
      * counterValue model, as that’s the thing that is used in the view.
      */
     writeValue(value: any) {
        if (value) {
            try {
                this.date = value;
            } catch (e) {
                this.date = '';
            }
        } else {
            this.date = '';
        }
    }

    /**
     * registerOnChange(fn: any) is a method that registers a handler that should
     * be called when something in the view has changed. It gets a function
     * that tells other form directives and form controls to update their values.
     * In other words, that’s the handler function we want to call whenever
     * price changes through the view.
     */
    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    /**
     * registerOnTouched(fn: any) Similiar to registerOnChange(), this registers
     * a handler specifically for when a control receives a touch event.
     * We don’t need that in our custom control.
     */
    registerOnTouched(fn: Function) {
        this.touchedChange = fn;
    }

    /**
     * This function is called when the control status changes to or from 'DISABLED'.
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
        this.readonly = (isDisabled) ? '1' : '';
    }
    /********************************************************
     **END implementation of ControlValueAccessor interface**
     ********************************************************/
}
