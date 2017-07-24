"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Own modules */
var date_format_model_mock_1 = require("./date-format.model.mock");
var date_format_validator_1 = require("./date-format.validator");
describe('DateFormatValidator', function () {
    var validator;
    beforeEach(function () {
        validator = new date_format_validator_1.DateFormatValidator();
        validator.dateModel = new date_format_model_mock_1.DateFormatModelMock();
    });
    it('verifies if 12/12/2012 is a valid date', function () {
        var date = '12/12/2012';
        var validity = validator.isValidDate(date);
        expect(validity).toBe(true);
    });
    it('verifies if 13/13/2013 is not a valid date', function () {
        var date = '13/13/2013';
        var validity = validator.isValidDate(date);
        expect(validity).toBe(false);
    });
    it('verifies if 11_11_2011 is not a valid date', function () {
        var date = '11_11_2011';
        var validity = validator.isValidDate(date);
        expect(validity).toBe(false);
    });
    it('verifies if 1-1 is not an usefull day', function () {
        var date = '1-1-2017';
        var result = validator.isUsefullDay(date);
        expect(result).toBe(false);
    });
    xit('verifies is 2-1 is an usefull day', function () {
        var date = '2-1-2017';
        var result = validator.isUsefullDay(date);
        expect(result).toBe(true);
    });
    it('Verifies if 12-24-1994 is a weekend day', function () {
        var date = '12-24-1994';
        var result = validator.isWeekend(date);
        expect(result).toBe(true);
    });
    it('verifies if 01-12-2017 is not a weekend day', function () {
        var date = '2017-12-1';
        var result = validator.isWeekend(date);
        expect(result).toBe(false);
    });
    it('gets Date representation for 06-15-2016', function () {
        var expected = new Date(2016, 5, 15);
        var date = '2016-6-15';
        var result = validator.getDateByString(date);
        expect(result).toEqual(expected);
    });
    it('gets null for empty date string', function () {
        var empty = '';
        var result = validator.getDateByString(empty);
        expect(result).toBeNull();
    });
    describe('<holydays>', function () {
        it('01-01-2017 was holyday', function () {
            var date = '2017-01-01';
            var result = validator.isHoliday(date);
            expect(result).toBe(true);
        });
        it('12-01-2017 was not holiday', function () {
            var date = '2017-1-12';
            var result = validator.isHoliday(date);
            expect(result).toBe(false);
        });
        it('gets a list of holydays in 2017', function () {
            var year = '2017';
            var holidays = validator.getHolidays(year);
            expect(holidays).not.toBeNull();
        });
    });
    it('::minDateCheck val: 09-21-2001 minDate: 09-11-2001 -> true', function () {
        var dateToCheck = '2001-9-21';
        var minDate = '2001-9-11';
        var checking = validator.minDateCheck(dateToCheck, minDate);
        expect(checking).toBe(true);
    });
    it('::minDateCheck val: 09-11-2001 minDate: 09-21-2001 => false', function () {
        var dateToCheck = '2001-9-11';
        var minDate = '2001-9-21';
        var checking = validator.minDateCheck(dateToCheck, minDate);
        expect(checking).toBe(false);
    });
    it('::maxDateCheck val: 09-21-2001 maxDate: 09-11-2001 -> false', function () {
        var dateToCheck = '2001-9-21';
        var maxDate = '2001-9-11';
        var checking = validator.maxDateCheck(dateToCheck, maxDate);
        expect(checking).toBe(false);
    });
    it('::maxDateCheck val: 09-11-2001 maxDate: 09-21-2001 => true', function () {
        var dateToCheck = '2001-9-11';
        var maxDate = '2001-9-21';
        var checking = validator.maxDateCheck(dateToCheck, maxDate);
        expect(checking).toBe(true);
    });
});
