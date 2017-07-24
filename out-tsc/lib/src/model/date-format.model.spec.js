"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Own modules */
var date_format_enum_1 = require("./date-format.enum");
var date_format_model_1 = require("./date-format.model");
describe('DateFormatModel', function () {
    var model;
    beforeAll(function () {
        model = new date_format_model_1.DateFormatModel();
    });
    describe('gets brazilian date from', function () {
        it('non-brazilian date', function () {
            var expectedBrDate = '1900/01/02T00:00:00-02:00';
            var nonBrDate = '02-01-1900T00:00:00-02:00';
            var brDate = model.getBrazilianDate(nonBrDate);
            expect(brDate).toEqual(expectedBrDate);
        });
        it('brazilian date', function () {
            var expectedBrDate = '1900/01/02T00:00:00-02:00';
            var brDate = '02-01-1900T00:00:00-02:00';
            brDate = model.getBrazilianDate(brDate);
            expect(brDate).toEqual(expectedBrDate);
        });
        it('UTC non-brazilian date', function () {
            var expectedBrDate = '1900/01/02T00:00:00-02:00';
            var nonBrDateUTC = '02-01-1900';
            var brDate = model.getBrazilianDate(nonBrDateUTC);
            expect(brDate).toEqual(expectedBrDate);
        });
        it('UTC brazilian date', function () {
            var expectedBrDate = '1900/01/02T00:00:00-02:00';
            var brDateUTC = '02-01-1900';
            var brDate = model.getBrazilianDate(brDateUTC);
            expect(brDate).toEqual(expectedBrDate);
        });
    });
    describe('gets UTC brazilian date from', function () {
        it('non-brazilian date', function () {
            var expectedBrDateUTC = '1900/01/02';
            var nonBrDate = '02-01-1900T00:00:00-02:00';
            var brDateUTC = model.getBrazilianDate(nonBrDate, true);
            expect(brDateUTC).toEqual(expectedBrDateUTC);
        });
        it('brazilian date', function () {
            var expectedBrDateUTC = '1900/01/02';
            var brDate = '02-01-1900T00:00:00-02:00';
            var brDateUTC = model.getBrazilianDate(brDate, true);
            expect(brDateUTC).toEqual(expectedBrDateUTC);
        });
        it('UTC non-brazilian date', function () {
            var expectedBrDateUTC = '1900/01/02';
            var nonBrDateUTC = '02-01-1900';
            var brDateUTC = model.getBrazilianDate(nonBrDateUTC, true);
            expect(brDateUTC).toEqual(expectedBrDateUTC);
        });
        it('UTC brazilian date', function () {
            var expectedBrDateUTC = '1900/01/02';
            var brDateUTC = '02-01-1900';
            brDateUTC = model.getBrazilianDate(brDateUTC, true);
            expect(brDateUTC).toEqual(expectedBrDateUTC);
        });
    });
    it('gets UTC date from non-UTC date (american)', function () {
        var expectedUTCDate = '1900-2-1';
        var nonUTCDate = '1900-02-01T00:00:00-02:00';
        var resultUTCDate = model.date2UTC(nonUTCDate);
        expect(resultUTCDate).toEqual(expectedUTCDate);
    });
    it('gets UTC date from non-UTC date (brazilian)', function () {
        var expectedUTCDate = '1900/01/02';
        var nonUTCDate = '1900/01/02T00:00:00-02:00';
        var resultUTCDate = model.date2UTC(nonUTCDate);
        expect(resultUTCDate).toEqual(expectedUTCDate);
    });
    describe('gets american date from', function () {
        it('non-american date', function () {
            var expectedAmDate = '1900-01-02T00:00:00-02:00';
            var nonAmDate = '02/01/1900T00:00:00-02:00';
            var amDate = model.getAmericanDate(nonAmDate);
            expect(amDate).toEqual(expectedAmDate);
        });
        it('american date', function () {
            var expectedAmDate = '1900-01-02T00:00:00-02:00';
            var amDate = '02-01-1900T00:00:00-02:00';
            amDate = model.getAmericanDate(amDate);
            expect(amDate).toEqual(expectedAmDate);
        });
        it('UTC non-american date', function () {
            var expectedAmDate = '1900-01-02T00:00:00-02:00';
            var nonAmDateUTC = '02/01/1900';
            var amDate = model.getAmericanDate(nonAmDateUTC, true);
            expect(amDate).toEqual(expectedAmDate);
        });
        it('UTC american date', function () {
            var expectedAmDate = '1900-01-02T00:00:00-02:00';
            var amDateUTC = '02-01-1900';
            var amDate = model.getAmericanDate(amDateUTC, true);
            expect(amDate).toEqual(expectedAmDate);
        });
    });
    describe('gets UTC american date from', function () {
        it('non-american date', function () {
            var expectedAmDateUTC = '1900-01-02';
            var nonAmDate = '02/01/1900T00:00:00-02:00';
            var amDateUTC = model.getAmericanDate(nonAmDate);
            expect(amDateUTC).toEqual(expectedAmDateUTC);
        });
        it('american date', function () {
            var expectedAmDateUTC = '1900-01-02';
            var amDate = '02-01-1900T00:00:00-02:00';
            var amDateUTC = model.getAmericanDate(amDate);
            expect(amDateUTC).toEqual(expectedAmDateUTC);
        });
        it('UTC non-american date', function () {
            var expectedAmDateUTC = '1900-01-02';
            var nonAmDateUTC = '02/01/1900';
            var amDateUTC = model.getAmericanDate(nonAmDateUTC, true);
            expect(amDateUTC).toEqual(expectedAmDateUTC);
        });
        it('UTC american date', function () {
            var expectedAmDateUTC = '1900-01-02';
            var amDateUTC = '02-01-1900';
            amDateUTC = model.getAmericanDate(amDateUTC, true);
            expect(amDateUTC).toEqual(expectedAmDateUTC);
        });
    });
    describe('::string2date', function () {
        it('invalid string input', function () {
            var expected = null;
            var input = 'planeta dos gorilas';
            var result = model.string2date(input);
            expect(result).toEqual(expected);
        });
        it('input date malformatted', function () {
            var expected = null;
            var input = '01_01_2017';
            var result = model.string2date(input);
            expect(result).toEqual(expected);
        });
        it('american input date', function () {
            var input = '01-01-2017T09:00:00-02:00';
            var expected = new Date('01-01-2017');
            var result = model.string2date(input);
            expect(result).toEqual(expected);
        });
        it('american UTC input date', function () {
            var input = '01-01-2017';
            var expected = new Date(input);
            var result = model.string2date(input);
            expect(result).toEqual(expected);
        });
        it('brazilian input date', function () {
            var input = '01/01/2017T09:00:00-02:00';
            var expected = new Date('01/01/2017');
            var result = model.string2date(input);
            expect(result).toEqual(expected);
        });
        it('brazilian UTC input date', function () {
            var input = '01/01/2017';
            var expected = new Date(input);
            var result = model.string2date(input);
            expect(result).toEqual(expected);
        });
    });
    describe('::diffDate', function () {
        it('01/01/1975 differ from 01/01/2016 by 41 years', function () {
            var expected = 41;
            var date1 = '2016/01/01';
            var date2 = '1975/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.YEAR);
            expect(diff).toEqual(expected);
        });
        it('01/01/2016 differ from 01/01/1975 by -41 years', function () {
            var expected = -41;
            var date1 = '1975/01/01';
            var date2 = '2016/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.YEAR);
            expect(diff).toEqual(expected);
        });
        it('01/01/1994 differ from 01/02/2001 by 85 months', function () {
            var expected = 85;
            var date1 = '2001/01/01';
            var date2 = '1994/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.MONTH);
            expect(diff).toEqual(expected);
        });
        it('01/01/2001 differ from 01/02/1994 by -85 months', function () {
            var expected = 85;
            var date1 = '1994/01/01';
            var date2 = '2001/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.MONTH);
            expect(diff).toEqual(expected);
        });
        it('01/01/2010 differ from 01/06/2010 by 151 days', function () {
            var expected = 151;
            var date1 = '2010/01/06';
            var date2 = '2010/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.DAY);
            expect(diff).toEqual(expected);
        });
        it('01/06/2010 differ from 01/01/2010 by -151 days', function () {
            var expected = -151;
            var date1 = '2010/01/01';
            var date2 = '2010/01/06';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.DAY);
            expect(diff).toEqual(expected);
        });
        it('01/01/1996 differ from 03/01/1996 by 48 hours', function () {
            var expected = 48;
            var date1 = '1996/03/01';
            var date2 = '1996/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.HOUR);
            expect(diff).toEqual(expected);
        });
        it('03/01/1996 differ from 01/01/1996 by -48 hours', function () {
            var expected = -48;
            var date1 = '1996/01/01';
            var date2 = '1996/03/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.HOUR);
            expect(diff).toEqual(expected);
        });
        it('01/01/1988 differ from 02/01/1998 by 1440 minutes', function () {
            var expected = 1440;
            var date1 = '1988/02/01';
            var date2 = '1988/01/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.MINUTE);
            expect(diff).toEqual(expected);
        });
        it('02/01/1988 differ from 01/01/1998 by -1440 minutes', function () {
            var expected = -1440;
            var date1 = '1988/01/01';
            var date2 = '1988/02/01';
            var diff = model.diffDate(date1, date2, date_format_enum_1.DateFormatEnum.MINUTE);
            expect(diff).toEqual(expected);
        });
    });
    describe('::addDate', function () {
        it('adds 1 year to date 1-1-1999', function () {
            var expected = '2000-1-1T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.YEAR, 1, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.YEAR, 1, false);
            expect(result).toEqual(expected);
        });
        it('adds 1 year to date 1-1-1999 in UTC', function () {
            var expected = '2000-01-01';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.YEAR, 1, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.YEAR, 1, true);
            expect(result).toEqual(expected);
        });
        it('adds 10 months to date 1-1-1999', function () {
            var expected = '1999-11-01T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 10, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 10, false);
            expect(result).toEqual(expected);
        });
        it('adds 10 months to date 1-1-1999 in UTC', function () {
            var expected = '1999-11-01';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 10, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 10, true);
            expect(result).toEqual(expected);
        });
        it('adds 22 months to date 1-1-1999', function () {
            var expected = '2000-11-01T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 22, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 22, false);
            expect(result).toEqual(expected);
        });
        it('adds 22 months to date 1-1-1999 in UTC', function () {
            var expected = '2000-11-01';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 22, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.MONTH, 22, true);
            expect(result).toEqual(expected);
        });
        it('adds 7 days to date 1-1-1999', function () {
            var expected = '1999-01-8T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 7, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 7, false);
            expect(result).toEqual(expected);
        });
        it('adds 7 days to date 1-1-1999 in UTC', function () {
            var expected = '1999-01-08';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 7, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 7, true);
            expect(result).toEqual(expected);
        });
        it('adds 38 days to date 1-1-1999', function () {
            var expected = '1999-02-8T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, false);
            expect(result).toEqual(expected);
        });
        it('adds 38 days to date 1-1-1999 in UTC', function () {
            var expected = '1999-02-08';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.addDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, true);
            expect(result).toEqual(expected);
        });
    });
    describe('::subDate', function () {
        it('subtracts 1 year to date 1-1-1999', function () {
            var expected = '1998-01-01T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.YEAR, 0, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.YEAR, 0, false);
            expect(result).toEqual(expected);
        });
        it('subtracts 1 year to date 1-1-1999 in UTC', function () {
            var expected = '1998-01-01';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.YEAR, 0, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.YEAR, 0, true);
            expect(result).toEqual(expected);
        });
        it('subtracts 10 months to date 1-11-1999', function () {
            var expected = '1999-01-01T00:00:00-02:00';
            var date = '1999-11-1T00:00:00-02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 9, false);
            expect(result).toEqual(expected);
            date = '1999-11-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 9, false);
            expect(result).toEqual(expected);
        });
        it('subtracts 10 months to date 1-11-1999 in UTC', function () {
            var expected = '1999-01-01';
            var date = '1999-11-1T00:00:00+02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 10, true);
            expect(result).toEqual(expected);
            date = '1999-11-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 10, true);
            expect(result).toEqual(expected);
        });
        it('subtracts 22 months to date 1-11-1999', function () {
            var expected = '1998-01-01T00:00:00-02:00';
            var date = '1999-11-1T00:00:00-02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 21, false);
            expect(result).toEqual(expected);
            date = '1999-11-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 21, false);
            expect(result).toEqual(expected);
        });
        it('subtracts 22 months to date 1-11-1999 in UTC', function () {
            var expected = '1998-01-01';
            var date = '1999-11-1T00:00:00+02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 22, true);
            expect(result).toEqual(expected);
            date = '1999-11-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.MONTH, 22, true);
            expect(result).toEqual(expected);
        });
        it('subtracts 7 days to date 1-1-1999', function () {
            var expected = '1998-12-25T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 6, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 6, false);
            expect(result).toEqual(expected);
        });
        it('subtracts 7 days to date 1-1-1999 in UTC', function () {
            var expected = '1998-12-25';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 7, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 7, true);
            expect(result).toEqual(expected);
        });
        it('subtracts 38 days to date 1-1-1999', function () {
            var expected = '1998-11-24T00:00:00-02:00';
            var date = '1999-1-1T00:00:00-02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, false);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, false);
            expect(result).toEqual(expected);
        });
        it('subtracts 38 days to date 1-1-1999 in UTC', function () {
            var expected = '1998-11-24';
            var date = '1999-1-1T00:00:00+02:00';
            var result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, true);
            expect(result).toEqual(expected);
            date = '1999-1-1';
            result = model.subDate(date, date_format_enum_1.DateFormatEnum.DAY, 38, true);
            expect(result).toEqual(expected);
        });
    });
    it('gets first date from month of 24/12/1994', function () {
        var expected = '1994-12-01';
        var input = '1994-12-24T05:00:00-02:00';
        var result = model.getMonthFirstDate(input, false);
        expect(result).toEqual(expected);
    });
    it('gets first date from month of 24/12/1994 in UTC', function () {
        var expected = '1994-12-01';
        var input = '1994-12-24';
        var result = model.getMonthFirstDate(input, true);
        expect(result).toEqual(expected);
    });
});
