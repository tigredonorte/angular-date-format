"use strict";
/* Angular modules */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/* Own modules */
var date_format_model_1 = require("../model/date-format.model");
var date_format_validator_1 = require("../validator/date-format.validator");
var DateFormatComponent = (function () {
    function DateFormatComponent() {
        this.holiday = false;
        this.usefullDate = false;
        this.weekend = false;
        this._date = '';
        this.dateModel = null;
        this.dateValidator = null;
        this.dateMask = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        this.propagateChange = function () { };
        this.touchedChange = function () { };
        this.validateFn = function () { };
        this.dateValidator = new date_format_validator_1.DateFormatValidator();
        this.dateModel = new date_format_model_1.DateFormatModel();
        this.minDate = '';
        this.maxDate = '';
        this.placeholder = '';
        this.value = '';
        this.disabled = false;
        this.cssclass = 'form-control';
    }
    Object.defineProperty(DateFormatComponent.prototype, "date", {
        /**
         * @return {?}
         */
        get: function () {
            return this._date;
        },
        /**
         * @param {?} newValue
         * @return {?}
         */
        set: function (newValue) {
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
                var /** @type {?} */ temp = this.dateModel.getAmericanDate(newValue);
                this.propagateChange(temp);
            }
            catch (e) {
                console.log(e);
                this.setEmptyValue();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateFormatComponent.prototype.ngOnInit = function () {
        try {
            this.touchedChange();
            if (this.minDate === 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if (this.maxDate === 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }
            var /** @type {?} */ obj = {
                minDate: this.minDate,
                maxDate: this.maxDate,
                holiday: this.holiday,
                weekend: this.weekend,
                usefullDate: this.usefullDate
            };
            this.validateFn = date_format_validator_1.DateFormatValidator.validate(obj);
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @return {?}
     */
    DateFormatComponent.prototype.isDisabled = function () {
        return this.disabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DateFormatComponent.prototype.focusEvent = function (event) {
        this.touchedChange();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DateFormatComponent.prototype.keyDownEvent = function (e) {
        var /** @type {?} */ value = this._date;
        var /** @type {?} */ num = parseInt(e.key, 10);
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
            var /** @type {?} */ day = parseInt(value[0] + '' + value[1], 10);
            var /** @type {?} */ month = parseInt(value[3] + '' + num, 10);
            if (month === 2) {
                return day <= 29;
            }
            if (month === 4 || month === 6 || month === 9 || month === 11) {
                return (day <= 30) ? true : false;
            }
            return (day <= 31) ? true : false;
        }
        if (value[6] === '_') {
            var /** @type {?} */ n = (num + 1) * 1000 - 1;
            if (false === this.checkTypingMin(n)) {
                return false;
            }
            var /** @type {?} */ n2 = num * 1000 - 1;
            if (false === this.checkTypingMax(n2)) {
                return false;
            }
        }
        if (value[8] === '_') {
            return true;
        }
        return true;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DateFormatComponent.prototype.keyUpEvent = function (e) {
        var /** @type {?} */ value = this._date;
        this.date = value;
    };
    /**
     * @param {?} n
     * @return {?}
     */
    DateFormatComponent.prototype.checkTypingMax = function (n) {
        try {
            if (this.maxDate !== '') {
                var /** @type {?} */ max = this.dateModel.string2date(this.maxDate);
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
    };
    /**
     * @param {?} n
     * @return {?}
     */
    DateFormatComponent.prototype.checkTypingMin = function (n) {
        if (this.minDate !== '') {
            var /** @type {?} */ min = this.dateModel.string2date(this.minDate);
            if (min instanceof Date) {
                if (min.getFullYear() > n) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormatComponent.prototype.initValue = function (date) {
        var /** @type {?} */ temp = [];
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
    };
    /**
     * @return {?}
     */
    DateFormatComponent.prototype.setEmptyValue = function () {
        this._date = '';
        this.propagateChange('');
    };
    /**
     * ********************************************
     * *BEGIN implementation of OnChanges interface**
     * *********************************************
     * @param {?} inputs
     * @return {?}
     */
    DateFormatComponent.prototype.ngOnChanges = function (inputs) {
        try {
            if (inputs['minDate'] && inputs['minDate'] === 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['maxDate'] && inputs['maxDate'] === 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['minDate'] || inputs['maxDate'] || inputs['holiday'] || inputs['weekend'] || inputs['usefullDate']) {
                var /** @type {?} */ obj = {
                    minDate: inputs['minDate'] ? inputs['minDate'] : this.minDate,
                    maxDate: inputs['maxDate'] ? inputs['maxDate'] : this.maxDate,
                    holiday: inputs['holiday'] ? inputs['holiday'] : this.holiday,
                    weekend: inputs['weekend'] ? inputs['weekend'] : this.weekend,
                    usefullDate: inputs['usefullDate'] ? inputs['usefullDate'] : this.usefullDate
                };
                this.validateFn = date_format_validator_1.DateFormatValidator.validate(obj);
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    DateFormatComponent.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    /**
     * writeValue(obj: any) is the method that writes a new value from the form model
     * into the view or (if needed) DOM property. This is where we want to update our
     * counterValue model, as that’s the thing that is used in the view.
     * @param {?} value
     * @return {?}
     */
    DateFormatComponent.prototype.writeValue = function (value) {
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
    };
    /**
     * registerOnChange(fn: any) is a method that registers a handler that should
     * be called when something in the view has changed. It gets a function
     * that tells other form directives and form controls to update their values.
     * In other words, that’s the handler function we want to call whenever
     * price changes through the view.
     * @param {?} fn
     * @return {?}
     */
    DateFormatComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * registerOnTouched(fn: any) Similiar to registerOnChange(), this registers
     * a handler specifically for when a control receives a touch event.
     * We don’t need that in our custom control.
     * @param {?} fn
     * @return {?}
     */
    DateFormatComponent.prototype.registerOnTouched = function (fn) {
        this.touchedChange = fn;
    };
    /**
     * This function is called when the control status changes to or from 'DISABLED'.
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {?} isDisabled
     * @return {?}
     */
    DateFormatComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.readonly = (isDisabled) ? '1' : '';
    };
    return DateFormatComponent;
}());
/**
 * *****************************************************
 * *END implementation of ControlValueAccessor interface**
 * ******************************************************
 */
DateFormatComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'date-format',
                templateUrl: './date-format.component',
                providers: [
                    { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return DateFormatComponent; }), multi: true },
                    { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return DateFormatComponent; }), multi: true }
                ]
            },] },
];
/**
 * @nocollapse
 */
DateFormatComponent.ctorParameters = function () { return []; };
DateFormatComponent.propDecorators = {
    'cssclass': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'inputname': [{ type: core_1.Input },],
    'maxDate': [{ type: core_1.Input },],
    'minDate': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'readonly': [{ type: core_1.Input },],
    'holiday': [{ type: core_1.Input },],
    'usefullDate': [{ type: core_1.Input },],
    'weekend': [{ type: core_1.Input },],
    '_date': [{ type: core_1.Input },],
};
exports.DateFormatComponent = DateFormatComponent;
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
