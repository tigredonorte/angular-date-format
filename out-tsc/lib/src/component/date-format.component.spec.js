"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Angular modules */
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
/* Third-party modules */
var angular2_text_mask_1 = require("angular2-text-mask");
/* Own modules */
var date_format_component_1 = require("./date-format.component");
var date_format_model_1 = require("./date-format.model");
var date_format_model_mock_1 = require("./date-format.model.mock");
var date_format_validator_1 = require("./date-format.validator");
var date_format_validator_mock_1 = require("./date-format.validator.mock");
describe('DateFormatComponent', function () {
    var comp;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [date_format_component_1.DateFormatComponent, angular2_text_mask_1.MaskedInputDirective],
            providers: [
                { provide: date_format_model_1.DateFormatModel, useClass: date_format_model_mock_1.DateFormatModelMock },
                { provide: date_format_validator_1.DateFormatValidator, useClass: date_format_validator_mock_1.DateFormatValidatorMock },
                { provide: forms_2.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return date_format_component_1.DateFormatComponent; }), multi: true },
                { provide: forms_2.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return date_format_component_1.DateFormatComponent; }), multi: true }
            ]
        });
        fixture = testing_1.TestBed.createComponent(date_format_component_1.DateFormatComponent);
        comp = fixture.componentInstance;
        comp.minDate = '01-01-2016';
        comp.maxDate = '01-01-2017';
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    describe('entering invalid values', function () {
        var expectedEmptyValue = '';
        var resultFromInvalidValue;
        it('blank spaces', function () {
            comp.date = '       ';
            resultFromInvalidValue = comp.date;
            expect(resultFromInvalidValue).toEqual(expectedEmptyValue);
        });
        it('undefined', function () {
            comp.date = undefined;
            resultFromInvalidValue = comp.date;
            expect(resultFromInvalidValue).toEqual(expectedEmptyValue);
        });
        it('null', function () {
            comp.date = null;
            resultFromInvalidValue = comp.date;
            expect(resultFromInvalidValue).toEqual(expectedEmptyValue);
        });
        it('textual string', function () {
            comp.date = 'this is an invalid value for date';
            resultFromInvalidValue = comp.date;
            expect(resultFromInvalidValue).toEqual(expectedEmptyValue);
        });
    });
    it('should valid american date being applied', function () {
        var expectedValue = '01-16-2017';
        var emptyValue = '';
        comp.date = '01-16-2017';
        var result = comp.date;
        expect(result).toEqual(expectedValue);
        expect(result).not.toEqual(emptyValue);
    });
    it('should valid brazilian date being applied', function () {
        var expectedValue = '16/01/2017';
        var emptyValue = '';
        comp.date = '16/01/2017';
        var result = comp.date;
        expect(result).toEqual(expectedValue);
        expect(result).not.toEqual(emptyValue);
    });
    it('should key events accepting numbers', function () {
        var e;
        e = {
            key: '4'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp.keyUpEvent(e);
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '1_/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('1_/__/____');
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '11/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('11/__/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '11/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('11/__/____');
    });
    it('should key events ignoring not numbers keys', function () {
        var e;
        e = { key: 'a' };
        expect(comp.keyDownEvent(e)).toBe(undefined);
        e = { key: 'A' };
        expect(comp.keyDownEvent(e)).toBe(undefined);
        e = { key: '&' };
        expect(comp.keyDownEvent(e)).toBe(undefined);
    });
    it('should not accepting dates less than #minDate=01-01-2016', function () {
        var e;
        expect(comp.minDate).toBe('01-01-2016');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '1_/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('1_/__/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/__/____');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/0_/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/0_/____');
        e = {
            key: '9'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/2___';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2___');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '5'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '6'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/2016';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2016');
    });
    it('should accepting dates between #minDate=01-01-2016 and #maxDate=01-01-2017', function () {
        var e;
        expect(comp.minDate).toBe('01-01-2016');
        expect(comp.maxDate).toBe('01-01-2017');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '1_/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('1_/__/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/__/____');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/0_/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/0_/____');
        e = {
            key: '9'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '3'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/2___';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2___');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/2___';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2___');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '5'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '7'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '6'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/2016';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2016');
    });
    it('should not accepting dates more than #maxDate=01-01-2017', function () {
        var e;
        expect(comp.maxDate).toBe('01-01-2017');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '1_/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('1_/__/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/__/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/__/____');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/0_/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/0_/____');
        e = {
            key: '9'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '3'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/____';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/____');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/2___';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2___');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/2___';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2___');
        e = {
            key: '0'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '2'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/20__';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/20__');
        e = {
            key: '1'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '7'
        };
        expect(comp.keyDownEvent(e)).toBe(false);
        comp._date = '12/09/201_';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/201_');
        e = {
            key: '6'
        };
        expect(comp.keyDownEvent(e)).toBe(true);
        comp._date = '12/09/2016';
        comp.keyUpEvent(e);
        expect(comp._date).toEqual('12/09/2016');
    });
});
