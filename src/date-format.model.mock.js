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
var date_format_model_1 = require("./date-format.model");
var DateFormatModelMock = (function (_super) {
    __extends(DateFormatModelMock, _super);
    function DateFormatModelMock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFormatModelMock.prototype.addDate = function (date, subType, amonth, utc) {
        return '2016-01-01';
    };
    DateFormatModelMock.prototype.date2string = function (d, utc, includeTime) {
        if (includeTime) {
            return '2016-01-01T00:00:00';
        }
        return '2016-01-01';
    };
    DateFormatModelMock.prototype.date2UTC = function (date) {
        return '2016-01-01';
    };
    DateFormatModelMock.prototype.diffDate = function (date1, date2, $type) {
        try {
            var d1 = new Date(date1);
            var d2 = new Date(date2);
            var diff = (d1.getTime() - d2.getTime()) / 1000;
            return (diff > 0) ? 10 : -10;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    };
    DateFormatModelMock.prototype.getAmericanDate = function (date, utc) {
        return '01-02-2017';
    };
    DateFormatModelMock.prototype.getBrazilianDate = function (date, utc) {
        return '02/01/2017';
    };
    DateFormatModelMock.prototype.getMonthFirstDate = function (date, utc) {
        return '2016-01-01';
    };
    DateFormatModelMock.prototype.string2date = function (str) {
        if (str.length < 10) {
            return undefined;
        }
        var i = 10;
        while (i--) {
            var c = str.charAt(i);
            if (c !== '/' && c !== '-' && isNaN(parseInt(c, 10))) {
                return undefined;
            }
        }
        try {
            var dd = parseInt(str.substr(0, 2), 10);
            var mm = parseInt(str.substr(3, 2), 10);
            var yy = parseInt(str.substr(6, 4), 10);
            var date = new Date(yy, mm - 1, dd);
            if (dd !== date.getDate()) {
                return undefined;
            }
            if (mm !== date.getMonth() + 1) {
                return undefined;
            }
            if (yy !== date.getFullYear()) {
                return undefined;
            }
            return date;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    };
    DateFormatModelMock.prototype.subDate = function (date, subType, amonth, utc) {
        return '2016-01-01';
    };
    return DateFormatModelMock;
}(date_format_model_1.DateFormatModel));
exports.DateFormatModelMock = DateFormatModelMock;
