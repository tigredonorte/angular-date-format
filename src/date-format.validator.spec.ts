/* Own modules */
import { DateFormatModelMock } from './date-format.model.mock';
import { DateFormatValidator } from './date-format.validator';

describe('DateFormatValidator', () => {
    let validator: DateFormatValidator;

    beforeEach(() => {
        validator = new DateFormatValidator();
        validator.dateModel = new DateFormatModelMock();
    });

    it('verifies if 12/12/2012 is a valid date', () => {
        const date = '12/12/2012';
        const validity = validator.isValidDate(date);

        expect(validity).toBe(true);
    });

    it('verifies if 13/13/2013 is not a valid date', () => {
        const date = '13/13/2013';
        const validity = validator.isValidDate(date);

        expect(validity).toBe(false);
    });

    it('verifies if 11_11_2011 is not a valid date', () => {
        const date = '11_11_2011';
        const validity = validator.isValidDate(date);

        expect(validity).toBe(false);
    });

    it('verifies if 1-1 is not an usefull day', () => {
        const date = '2017-1-1';
        const result = validator.isUsefullDay(date);

        expect(result).toBe(false);
    });

    it('verifies is 2-1 is an usefull day', () => {
        const date = '2017-1-2';
        const result = validator.isUsefullDay(date);

        expect(result).toBe(true);
    });

    it('Verifies if 12-24-1994 is a weekend day', () => {
        const date = '1994-12-24';
        const result = validator.isWeekend(date);

        expect(result).toBe(true);
    });

    it('verifies if 01-12-2017 is not a weekend day', () => {
        const date = '2017-12-1';
        const result = validator.isWeekend(date);

        expect(result).toBe(false);
    });

    it('gets Date representation for 06-15-2016', () => {
        const expected = new Date(2016, 5, 15);
        const date = '2016-6-15';
        const result = validator.getDateByString(date);

        expect(result).toEqual(expected);
    });

    it('gets null for empty date string', () => {
        const empty = '';
        const result = validator.getDateByString(empty);

        expect(result).toBeNull();
    });

    describe('<holydays>', () => {
        it('01-01-2017 was holyday', () => {
            const date = '2017-01-01';
            const result = validator.isHoliday(date);

            expect(result).toBe(true);
        });

        it('12-01-2017 was not holiday', () => {
            const date = '2017-1-12';
            const result = validator.isHoliday(date);

            expect(result).toBe(false);
        });

        it('gets a list of holydays in 2017', () => {
            const year = '2017';
            const holidays = validator.getHolidays(year);

            expect(holidays).not.toBeNull();
        });
    });

    it('::minDateCheck val: 09-21-2001 minDate: 09-11-2001 -> true', () => {
        const dateToCheck = '2001-9-21';
        const minDate = '2001-9-11';
        const checking = validator.minDateCheck(dateToCheck, minDate);

        expect(checking).toBe(true);
    });

    it('::minDateCheck val: 09-11-2001 minDate: 09-21-2001 => false', () => {
        const dateToCheck = '2001-9-11';
        const minDate = '2001-9-21';
        const checking = validator.minDateCheck(dateToCheck, minDate);

        expect(checking).toBe(false);
    });

    it('::maxDateCheck val: 09-21-2001 maxDate: 09-11-2001 -> false', () => {
        const dateToCheck = '2001-9-21';
        const maxDate = '2001-9-11';
        const checking = validator.maxDateCheck(dateToCheck, maxDate);

        expect(checking).toBe(false);
    });

    it('::maxDateCheck val: 09-11-2001 maxDate: 09-21-2001 => true', () => {
        const dateToCheck = '2001-9-11';
        const maxDate = '2001-9-21';
        const checking = validator.maxDateCheck(dateToCheck, maxDate);

        expect(checking).toBe(true);
    });

});
