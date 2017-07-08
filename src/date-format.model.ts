/* tslint:disable radix */

/* Own modules */
import { DateFormatEnum }       from './date-format.enum';
import { DateFormatValidator }  from './date-format.validator';

export class DateFormatModel {

    public getBrazilianDate(date:string,utc?:boolean) {
        try {
            var e = date.toString().split("T");
            return this.detectDateType(e[0]) == 'br'?e[0]:this.reverseDate(e[0]);
        }catch(e) {
            console.log(e);
            return null;
        }
    }

    public date2UTC(date:string): string {
        if(date == null) {return "";}
        var dt = this.string2date(date);
        return (dt instanceof Date)?dt.getUTCFullYear()+"-"+(dt.getUTCMonth()+1)+"-"+dt.getUTCDate():"";
    }

    public getAmericanDate(date:string, utc?:boolean): string {
        try {
            if(date == "") {
                let dt = new Date();
                return this.date2string(dt, utc);
            }
            var e   = date.toString().split("T");
            var out = (!utc)? this.detectDateType(e[0]) == 'db'?e[0]:this.reverseDate(e[0]):
                              this.detectDateType(e[0]) == 'db'?this.date2UTC(e[0]):this.date2UTC(this.reverseDate(e[0]));
            var temp = out.split('-');
            var mm = (parseInt(temp[1]) < 10)?"0" + parseInt(temp[1]):temp[1];
            var dd = (parseInt(temp[2]) < 10)?"0" + parseInt(temp[2]):temp[2];
            return temp[0]+'-'+mm+'-'+ dd;
        }catch(e) {
            console.log(e);
            return null;
        }
    }

            private detectDateType(date:string) {
                try {
                    if(date.indexOf('/') !== -1) {return 'br'; }
                    if(date.indexOf('-') !== -1) {return 'db';}
                    return 'none';
                }catch(e) {console.log(e);}

            }

            private reverseDate(date:string) {
                var data = date.split(" ");
                if(data[0] == '0000-00-00'|| data[0] == '00/00/0000') {return "";}

                //console.log(data[0], data[0].match(/\//ig));
                var dateReverseSeparator = !data[0].match(/\//ig)? "-" : "/";
                var array                = data[0].split(dateReverseSeparator).reverse();

                var join = !data[0].match(/\//ig) ? "/" : "-";
                data[0] = array.join(join);
                return data.join(" ");
            }

    public string2date(str:string): Date {
        try {
            if(typeof str !== 'string') {return null;}
            if(str.length < 10) {return null;}
            var i = 10;
            while (i--) {
                if (str.charAt(i) == "_") {return null;}
            }

            str = this.getBrazilianDate(str);
            var dd   = parseInt(str.substr(0, 2));
            var mm   = parseInt(str.substr(3, 2));
            var yy   = parseInt(str.substr(6, 4));
            var date = new Date(yy, mm-1, dd);

            if(dd != date.getDate())    {return null;}
            if(mm != date.getMonth()+1) {return null;}
            if(yy != date.getFullYear()) {return null;}

            return date;
        }catch(e) {
            console.log(e);
            return null;
        }
    }

    public diffDate(date1:string, date2:string, $type:DateFormatEnum) {
        try {
            var d1   = new Date(this.getAmericanDate(date1));
            var d2   = new Date(this.getAmericanDate(date2));
            var diff = (d1.getTime() - d2.getTime())/1000;
            var year;
            switch ($type) {
                case DateFormatEnum.YEAR:
                    year = new Date(d1.getTime() - d2.getTime());
                    return year.getUTCFullYear() - 1970;
                case DateFormatEnum.MONTH:
                    year = new Date(d1.getTime() - d2.getTime());
                    var signal = (diff < 0)?-1:1;
                    return signal * year.getUTCMonth();
                case DateFormatEnum.DAY:  return diff/(60*60*24);
                case DateFormatEnum.HOUR:  return diff/(60*60);
                case DateFormatEnum.MINUTE: return diff/60;
            }
            return diff;
        }catch(e) {
            console.log(e);
            return 0;
        }
    }

    public addDate(date?:string, subType?:DateFormatEnum, amonth?:number, utc?:boolean) {
		    if (!date)   {date    = '';}
		    if (!subType) {subType = DateFormatEnum.DAY;}
		    if (!amonth) {amonth  = 1;}
        return this.subDate(date, subType, -amonth, utc);
    }

    public subDate(date?:string, subType?:DateFormatEnum, amonth?:number, utc?:boolean) {
        try {
            if (!date)   {date    = '';}
            if (!subType) {subType = DateFormatEnum.DAY;}
            if (!amonth) {amonth  = 1;}
            var d = new Date(this.getAmericanDate(date));
            if(subType == DateFormatEnum.MONTH) { d.setMonth   (d.getMonth()    - amonth);}
            if(subType == DateFormatEnum.YEAR) { d.setFullYear(d.getFullYear() - amonth);}
            // This '-2' is needed why 'new Date(this.getAmericanDate(date));', for example:
            // - With 'date'  equals to 28/01/2017
            // - getAmericanDate will return date for 28/01/2017
            // - but the 'getDate' will return 27, starting by 0 and not by 1
            if(subType == DateFormatEnum.DAY)  { d.setDate    (d.getDate()     - amonth + 2);}
            return this.date2string(d, utc);
        }catch(e) {console.log(e);}
    }

    public getMonthFirstDate(date?:string, utc?:boolean, usefullDate?:boolean): string {
        try {
            if (!date) {date = '';}
            var d = new Date(this.getAmericanDate(date));
            d.setDate(1);
            var out = this.date2string(d, utc);
            if(!usefullDate) {return out;}
            return this.getNextUsefullDate(out, utc);
        }catch(e) {console.log(e);}
    }

    /**
     * @function getMonthLastDate: return last date of month
     * @param date: string
     * @param utc: boolean convert to utc
     * @param usefullDate: boolean if set true, this function will return last month usefull date
     * @returns string last usefull date
     */
    public getMonthLastDate(date?:string, utc?:boolean, usefullDate?:boolean): string {
        try {
            if (!date) {date = '';}
            var dt = this.getAmericanDate(date);
            var e = dt.split("-");
            var d = new Date(parseInt(e[0]), parseInt(e[1]), 0);
            var out = this.date2string(d, utc);
            if(!usefullDate) {return out;}
            return this.getLastUsefullDate(out, utc);
        }catch(e) {console.log(e);}
    }

    /**
     * @function getLastUsefullDate: Find last usefull date of date
     * @param date: string date to find usefull date
     * @param utc: boolean convert to utc
     * @returns string last usefull date
     */
    public getLastUsefullDate(date?:string, utc?:boolean): string {
        return this.findUsefullDate(date, utc, false);
    }

    /**
     * @function getNextUsefullDate: Find next usefull date of date
     * @param date: string date to find usefull date
     * @param utc: boolean convert to utc
     * @returns string next usefull date
     */
    public getNextUsefullDate(date?:string, utc?:boolean): string {
        return this.findUsefullDate(date, utc, true);
    }

            private findUsefullDate(date?:string, utc?:boolean, next?:boolean): string {
                try {
                    if(!date){date = "";}
                    date    = this.getAmericanDate(date, utc);
                    var e   = date.split("-");
                    var d   = this.string2date(date);
                    var day = parseInt(e[2]);
                    var out = this.date2string(d, utc);
                    while(!DateFormatValidator._IsUsefullDay(out)) {
                        (next) ? day++ : day--;
                        d.setDate(day);
                        out = this.date2string(d, utc);
                    }
                    return out;
                }catch(e) {console.log(e);}
            }

    public date2string(d:Date, utc?:boolean, includeTime?:boolean): string {
        try {
            if (d == null || !(d instanceof Date)) {console.log(d);return "";}
            var date, time = "";
            date = this.getDateString(d, utc);
            if (includeTime) {time = "T"+this.getTimeString(d, utc);}
            return date+time;
        }catch(e) {console.log(e);}
    }

            private getDateString(d:Date, utc?:boolean): string {
                var year, month, day = "";
                if(utc) {
                    year   = d.getUTCFullYear().toString();
                    month = (d.getUTCMonth()+1).toString();
                    day   = d.getUTCDate().toString();
                } else {
                    year  = d.getFullYear().toString();
                    month = (d.getMonth()+1).toString();
                    day   = d.getDate().toString();
                }

                if(parseInt(month) < 10) {month = "0"+month;}
                if(parseInt(day) < 10)  {day = "0"+day;}
                return year+"-"+month+'-'+day;
            }

            private getTimeString(d:Date, utc?:boolean): string {
                var hours, minutes, seconds = "";
                if(utc) {
                    hours   = d.getUTCHours().toString();
                    minutes = d.getUTCMinutes().toString();
                    seconds = d.getUTCSeconds().toString();
                } else {
                    hours   = d.getHours().toString();
                    minutes = d.getMinutes().toString();
                    seconds = d.getSeconds().toString();
                }
                if(parseInt(hours) < 10)  {hours = "0"+hours;}
                if(parseInt(minutes) < 10) {minutes = "0"+minutes;}
                if(parseInt(seconds) < 10) {seconds = "0"+seconds;}
                return hours+":"+minutes+":"+seconds;
            }
}
