"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* Own modules */
var date_format_model_mock_1 = require("./date-format.model.mock");
var date_format_validator_1 = require("./date-format.validator");
var DateFormatValidatorMock = (function (_super) {
    __extends(DateFormatValidatorMock, _super);
    function DateFormatValidatorMock() {
        var _this = _super.call(this) || this;
        _this.holidays = new Array();
        _this.dateModel = new date_format_model_mock_1.DateFormatModelMock();
        return _this;
    }
    DateFormatValidatorMock.validate = function (options) {
        var validator = new DateFormatValidatorMock();
        var model = new date_format_model_mock_1.DateFormatModelMock();
        return function (c) {
            try {
                var date = c.value;
                var userDate = model.getBrazilianDate(date);
                if (false === validator.isValidDate(date)) {
                    return { invalidDateError: { given: userDate } };
                }
                if (false === validator.minDateCheck(date, options.minDate)) {
                    return { minDateError: { given: userDate, minDate: model.getBrazilianDate(options.minDate) } };
                }
                if (false === validator.maxDateCheck(date, options.maxDate)) {
                    return { maxDateError: { given: userDate, maxDate: model.getBrazilianDate(options.maxDate) } };
                }
                if (options.usefullDate && false === validator.isUsefullDay(date)) {
                    return { usefullDateError: { given: userDate } };
                }
                if (options.holiday && false === validator.isHoliday(date)) {
                    return { holidayError: { given: userDate } };
                }
                if (options.weekend && false === validator.isWeekend(date)) {
                    return { weekendError: { given: userDate } };
                }
                return null;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        };
    };
    DateFormatValidatorMock.prototype.getDateBySpecialString = function (date) {
        return date;
    };
    DateFormatValidatorMock.prototype.getDateByString = function (dt) {
        return new Date(dt);
    };
    DateFormatValidatorMock.prototype.getHolidays = function (year) {
        var holidays = new Array();
        holidays.push('2016-01-01');
        holidays.push('2016-02-08');
        holidays.push('2016-02-09');
        holidays.push('2016-03-25');
        holidays.push('2016-03-27');
        holidays.push('2016-04-21');
        holidays.push('2016-05-01');
        holidays.push('2016-05-26');
        holidays.push('2016-09-07');
        holidays.push('2016-10-12');
        holidays.push('2016-11-02');
        holidays.push('2016-11-15');
        holidays.push('2016-12-25');
        return holidays;
    };
    DateFormatValidatorMock.prototype.isHoliday = function (date) {
        return false;
    };
    DateFormatValidatorMock.prototype.isUsefullDay = function (date) {
        return (!this.isWeekend(date) && !this.isHoliday(date));
    };
    DateFormatValidatorMock.prototype.isValidDate = function (str) {
        return (str === '') ? false : true;
    };
    DateFormatValidatorMock.prototype.isWeekend = function (date) {
        return false;
    };
    DateFormatValidatorMock.prototype.maxDateCheck = function (val, maxDate) {
        return true;
    };
    DateFormatValidatorMock.prototype.minDateCheck = function (val, minDate) {
        return true;
    };
    return DateFormatValidatorMock;
}(date_format_validator_1.DateFormatValidator));
exports.DateFormatValidatorMock = DateFormatValidatorMock;
