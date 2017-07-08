/* tslint:disable radix */

/* Angular modules */
import { Component, Input, forwardRef }                       from '@angular/core';
import { OnInit, OnChanges }                                  from '@angular/core';
import { FormControl, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidatorFn }      from '@angular/forms';

/* Own modules */
import { DateFormatEnum }       from './date-format.enum';
import { DateFormatModel }      from './date-format.model';
import { DateFormatValidator }  from './date-format.validator';

@Component({
    selector: 'DateFormat',
    template:`
    <div class='input-group date'>
        <input
            type="tel"
            [class]="cssclass"
            [textMask]="{mask:dateMask}"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [name]="inputname"
            [(ngModel)]="_date"

            (focus)="focusEvent($event)"
            (keyup)="KeyUpEvent($event)"
            (keydown)="KeyDownEvent($event)"
            [disabled]="isDisabled()"
            ngDefaultControl
        />
    </div>
    `,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateFormatComponent), multi: true },
        { provide: NG_VALIDATORS    , useExisting: forwardRef(() => DateFormatComponent), multi: true }
    ]
})
export class DateFormatComponent implements ControlValueAccessor, OnChanges, OnInit {

    touchedChange  : any = () => { };
    propagateChange: any = () => { };
    validateFn     : any = () => { };
    @Input('date') _date = "";
    get date() {
        return this._date;
    }
    set date(newValue) {
        try {
            if(!newValue || newValue == "" || newValue == null) {
                this.setEmptyValue();
                return;
            }

            newValue = this.initValue(newValue);
            if(newValue == "") {return;}
            this._date = newValue;
            var temp = this.dateModel.getAmericanDate(newValue);
            this.propagateChange(temp);

        }catch(e) {
            console.log(e);
            this.setEmptyValue();
        }
    }

            private setEmptyValue() {
                this._date = "";
                this.propagateChange("");
            }

            private initValue(date:string): string {
                var temp:any = [];
                try {
                    temp = date.split("T");
                }catch(e) {
                    console.log(e);
                    temp = date;
                }

                try {
                    return this.dateModel.getBrazilianDate(temp[0]);
                }catch(e) {console.log(e);}
            }

    @Input() inputname  : string;
    @Input() cssclass   : string;
    @Input() placeholder: string;
    @Input() readonly   : string;
    @Input() minDate    : string;
    @Input() maxDate    : string;
    @Input() options    : Object;
    @Input() disabled   : boolean;

    @Input() usefullDate: boolean = false;
    @Input() weekend    : boolean = false;
    @Input() holiday    : boolean = false;

    dateModel    :DateFormatModel     = null;
    dateValidator:DateFormatValidator = null;
    dateMask =  [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    value :string;

    public constructor() {
        this.dateValidator = new DateFormatValidator();
        this.dateModel = new DateFormatModel();
        //var time = new Date().getTime() - new Date("2016-12-20").getTime();
        this.minDate            = '';
        this.maxDate            = '';
        this.placeholder        = '';
        this.value              = '';
        this.disabled           = false;
        this.cssclass           = 'form-control';
    }

    public isDisabled() {
        return this.disabled;
    }

    KeyDownEvent(e: KeyboardEvent) {
        var value = this._date;
        var num   = parseInt(e.key);
        if (isNaN(num)) {return;}
        if(typeof value === 'undefined' || value == "" || value[0] == "_") {
            return(num <= 3)?true:false;
        }

        if(value[1] == "_") {
            if(parseInt(value[0]) < 3) {return true;}
            return (num < 2)?true:false;
        }

        if(value[3] == "_") {
            return (num < 2)?true:false;
        }
        if(value[4] == "_") {
            if(parseInt(value[3]) != 0 && (num > 2)) {return false;}
            var day   = parseInt(value[0]+""+value[1]);
            var month = parseInt(value[3]+""+num);
            if(month == 2) {return day <= 29;}
            if(month == 4 || month == 6 || month == 9 || month == 11) {
                return (day <= 30)?true:false;
            }
            return (day <= 31)?true:false;
        }

        if(value[6] == "_") {
            var n = (num+1) * 1000 - 1;
            if(false === this.checkTypingMin(n)) {
                return false;
            }

            var n2 = num * 1000 - 1;
            if(false === this.checkTypingMax(n2)) {
                return false;
            }
        }

        if(value[8] == '_') {
            return true;
        }
        return true;
    }

            private checkTypingMax(n:number) {
                try {
                    if (this.maxDate !== "") {
                        var max = this.dateModel.string2date(this.maxDate);
                        if (max instanceof Date) {
                            //console.log(max.getFullYear(), n);
                            if(max.getFullYear() < n) {return false;}
                        }
                    }
                    return true;
                } catch (e) {
                    console.warn(e);
                    return false;
                }
            }

            private checkTypingMin(n:number) {
                if (this.minDate !== "") {
                    var min = this.dateModel.string2date(this.minDate);
                    if (min instanceof Date) {
                        if(min.getFullYear() > n) {return false;}
                    }
                }
                return true;
            }

    KeyUpEvent(e: KeyboardEvent)   {
        var value = this._date;
        this.date = value;
    }

    focusEvent(event:any) {
        this.touchedChange();
    }

    public ngOnInit() {
        try {
            this.touchedChange();
            if (this.minDate == 'today') {this.minDate = this.dateModel.getAmericanDate('');}
            if (this.maxDate == 'today') {this.maxDate = this.dateModel.getAmericanDate('');}
            //console.log(this.maxDate);
            var obj         = {
                minDate    : this.minDate,
                maxDate    : this.maxDate,
                holiday    : this.holiday,
                weekend    : this.weekend,
                usefullDate: this.usefullDate
            };

            this.validateFn = DateFormatValidator.validate(obj);
        }catch(e) {console.log(e);}
    }

    /***********************************************
     **BEGIN implementation of OnChanges interface**
     ***********************************************/
    ngOnChanges(inputs:any) {
        try {
            if(inputs['minDate'] && inputs['minDate'] == 'today') {
                this.minDate = this.dateModel.getAmericanDate('');
            }
            if(inputs['maxDate'] && inputs['maxDate'] == 'today') {
                this.maxDate = this.dateModel.getAmericanDate('');
            }
            if (inputs['minDate'] || inputs['maxDate'] || inputs['holiday']|| inputs['weekend'] || inputs['usefullDate']) {
                var obj         = {
                    minDate    : inputs['minDate']    ?inputs['minDate']      :this.minDate,
                    maxDate    : inputs['maxDate']    ?inputs['maxDate']      :this.maxDate,
                    holiday    : inputs['holiday']    ?inputs['holiday']      :this.holiday,
                    weekend    : inputs['weekend']    ?inputs['weekend']      :this.weekend,
                    usefullDate: inputs['usefullDate']?inputs['usefullDate'] : this.usefullDate
                };

                this.validateFn = DateFormatValidator.validate(obj);
            }
        }catch(e) {console.log(e);}
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
     writeValue(value:any) {
        if (value) {
            try {
                //console.log(value);
                this.date = value;
            }catch(e) {
                this.date = '';
            }
            //console.log(value, this.fillValue(value));
        } else {this.date = '';}
    }

    /**
     * registerOnChange(fn: any) is a method that registers a handler that should
     * be called when something in the view has changed. It gets a function
     * that tells other form directives and form controls to update their values.
     * In other words, that’s the handler function we want to call whenever
     * price changes through the view.
     */
    registerOnChange(fn:Function) {
        this.propagateChange = fn;
    }

    /**
     * registerOnTouched(fn: any) Similiar to registerOnChange(), this registers
     * a handler specifically for when a control receives a touch event.
     * We don’t need that in our custom control.
     */
    registerOnTouched(fn:Function) {
        this.touchedChange = fn;
    }
    
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean){
        this.disabled = isDisabled;
        this.readonly = (isDisabled)?"1":"";
        console.log(this.readonly, isDisabled);
    }
    /********************************************************
     **END implementation of ControlValueAccessor interface**
     ********************************************************/
}
