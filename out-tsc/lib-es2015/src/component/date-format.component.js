/* Angular modules */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
/* Own modules */
import { DateFormatModel } from '../model/date-format.model';
import { DateFormatValidator } from '../validator/date-format.validator';
export class DateFormatComponent {
    constructor() {
        this.holiday = false;
        this.usefullDate = false;
        this.weekend = false;
        this._date = '';
        this.dateModel = null;
        this.dateValidator = null;
        this.dateMask = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        this.propagateChange = () => { };
        this.touchedChange = () => { };
        this.validateFn = () => { };
        this.dateValidator = new DateFormatValidator();
        this.dateModel = new DateFormatModel();
        this.minDate = '';
        this.maxDate = '';
        this.placeholder = '';
        this.value = '';
        this.disabled = false;
        this.cssclass = 'form-control';
    }
    /**
     * @return {?}
     */
    get date() {
        return this._date;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set date(newValue) {
        try {
            if (!newValue || newValue === '' || newValue == null) {
                this.setEmptyValue();
                return;
            }
            newValue = this.initValue(newValue);
            if (newValue === '') {
                return;
            }
            this._date = newValue;
            const /** @type {?} */ temp = this.dateModel.getAmericanDate(newValue);
            this.propagateChange(temp);
        }
        catch (e) {
            console.log(e);
            this.setEmptyValue();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.touchedChange();
            if (this.minDate === 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if (this.maxDate === 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }
            let /** @type {?} */ obj = {
                minDate: this.minDate,
                maxDate: this.maxDate,
                holiday: this.holiday,
                weekend: this.weekend,
                usefullDate: this.usefullDate
            };
            this.validateFn = DateFormatValidator.validate(obj);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @return {?}
     */
    isDisabled() {
        return this.disabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    focusEvent(event) {
        this.touchedChange();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyDownEvent(e) {
        const /** @type {?} */ value = this._date;
        const /** @type {?} */ num = parseInt(e.key, 10);
        if (isNaN(num)) {
            return;
        }
        if (typeof value === 'undefined' || value === '' || value[0] === '_') {
            return (num <= 3) ? true : false;
        }
        if (value[1] === '_') {
            if (parseInt(value[0], 10) < 3) {
                return true;
            }
            return (num < 2) ? true : false;
        }
        if (value[3] === '_') {
            return (num < 2) ? true : false;
        }
        if (value[4] === '_') {
            if (parseInt(value[3], 10) !== 0 && (num > 2)) {
                return false;
            }
            const /** @type {?} */ day = parseInt(value[0] + '' + value[1], 10);
            const /** @type {?} */ month = parseInt(value[3] + '' + num, 10);
            if (month === 2) {
                return day <= 29;
            }
            if (month === 4 || month === 6 || month === 9 || month === 11) {
                return (day <= 30) ? true : false;
            }
            return (day <= 31) ? true : false;
        }
        if (value[6] === '_') {
            const /** @type {?} */ n = (num + 1) * 1000 - 1;
            if (false === this.checkTypingMin(n)) {
                return false;
            }
            const /** @type {?} */ n2 = num * 1000 - 1;
            if (false === this.checkTypingMax(n2)) {
                return false;
            }
        }
        if (value[8] === '_') {
            return true;
        }
        return true;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyUpEvent(e) {
        const /** @type {?} */ value = this._date;
        this.date = value;
    }
    /**
     * @param {?} n
     * @return {?}
     */
    checkTypingMax(n) {
        try {
            if (this.maxDate !== '') {
                const /** @type {?} */ max = this.dateModel.string2date(this.maxDate);
                if (max instanceof Date) {
                    if (max.getFullYear() < n) {
                        return false;
                    }
                }
            }
            return true;
        }
        catch (e) {
            console.warn(e);
            return false;
        }
    }
    /**
     * @param {?} n
     * @return {?}
     */
    checkTypingMin(n) {
        if (this.minDate !== '') {
            const /** @type {?} */ min = this.dateModel.string2date(this.minDate);
            if (min instanceof Date) {
                if (min.getFullYear() > n) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    initValue(date) {
        let /** @type {?} */ temp = [];
        try {
            temp = date.split('T');
        }
        catch (e) {
            console.log(e);
            temp = date;
        }
        try {
            return this.dateModel.getBrazilianDate(temp[0]);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @return {?}
     */
    setEmptyValue() {
        this._date = '';
        this.propagateChange('');
    }
    /**
     * ********************************************
     * *BEGIN implementation of OnChanges interface**
     * *********************************************
     * @param {?} inputs
     * @return {?}
     */
    ngOnChanges(inputs) {
        try {
            if (inputs['minDate'] && inputs['minDate'] === 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['maxDate'] && inputs['maxDate'] === 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['minDate'] || inputs['maxDate'] || inputs['holiday'] || inputs['weekend'] || inputs['usefullDate']) {
                let /** @type {?} */ obj = {
                    minDate: inputs['minDate'] ? inputs['minDate'] : this.minDate,
                    maxDate: inputs['maxDate'] ? inputs['maxDate'] : this.maxDate,
                    holiday: inputs['holiday'] ? inputs['holiday'] : this.holiday,
                    weekend: inputs['weekend'] ? inputs['weekend'] : this.weekend,
                    usefullDate: inputs['usefullDate'] ? inputs['usefullDate'] : this.usefullDate
                };
                this.validateFn = DateFormatValidator.validate(obj);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this.validateFn(c);
    }
    /**
     * writeValue(obj: any) is the method that writes a new value from the form model
     * into the view or (if needed) DOM property. This is where we want to update our
     * counterValue model, as that’s the thing that is used in the view.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value) {
            try {
                this.date = value;
            }
            catch (e) {
                this.date = '';
            }
        }
        else {
            this.date = '';
        }
    }
    /**
     * registerOnChange(fn: any) is a method that registers a handler that should
     * be called when something in the view has changed. It gets a function
     * that tells other form directives and form controls to update their values.
     * In other words, that’s the handler function we want to call whenever
     * price changes through the view.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * registerOnTouched(fn: any) Similiar to registerOnChange(), this registers
     * a handler specifically for when a control receives a touch event.
     * We don’t need that in our custom control.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.touchedChange = fn;
    }
    /**
     * This function is called when the control status changes to or from 'DISABLED'.
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.readonly = (isDisabled) ? '1' : '';
    }
}
/**
 * *****************************************************
 * *END implementation of ControlValueAccessor interface**
 * ******************************************************
 */
DateFormatComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-format',
                templateUrl: './date-format.component',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateFormatComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateFormatComponent), multi: true }
                ]
            },] },
];
/**
 * @nocollapse
 */
DateFormatComponent.ctorParameters = () => [];
DateFormatComponent.propDecorators = {
    'cssclass': [{ type: Input },],
    'disabled': [{ type: Input },],
    'inputname': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'minDate': [{ type: Input },],
    'options': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'readonly': [{ type: Input },],
    'holiday': [{ type: Input },],
    'usefullDate': [{ type: Input },],
    'weekend': [{ type: Input },],
    '_date': [{ type: Input },],
};
function DateFormatComponent_tsickle_Closure_declarations() {
    /**
     * *****************************************************
     * *END implementation of ControlValueAccessor interface**
     * ******************************************************
     * @type {?}
     */
    DateFormatComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DateFormatComponent.ctorParameters;
    /** @type {?} */
    DateFormatComponent.propDecorators;
    /** @type {?} */
    DateFormatComponent.prototype.cssclass;
    /** @type {?} */
    DateFormatComponent.prototype.disabled;
    /** @type {?} */
    DateFormatComponent.prototype.inputname;
    /** @type {?} */
    DateFormatComponent.prototype.maxDate;
    /** @type {?} */
    DateFormatComponent.prototype.minDate;
    /** @type {?} */
    DateFormatComponent.prototype.options;
    /** @type {?} */
    DateFormatComponent.prototype.placeholder;
    /** @type {?} */
    DateFormatComponent.prototype.readonly;
    /** @type {?} */
    DateFormatComponent.prototype.holiday;
    /** @type {?} */
    DateFormatComponent.prototype.usefullDate;
    /** @type {?} */
    DateFormatComponent.prototype.weekend;
    /** @type {?} */
    DateFormatComponent.prototype._date;
    /** @type {?} */
    DateFormatComponent.prototype.value;
    /** @type {?} */
    DateFormatComponent.prototype.dateModel;
    /** @type {?} */
    DateFormatComponent.prototype.dateValidator;
    /** @type {?} */
    DateFormatComponent.prototype.dateMask;
    /** @type {?} */
    DateFormatComponent.prototype.propagateChange;
    /** @type {?} */
    DateFormatComponent.prototype.touchedChange;
    /** @type {?} */
    DateFormatComponent.prototype.validateFn;
}
