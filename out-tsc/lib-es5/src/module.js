"use strict";
/* Angular modules */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
/* Own modules */
var date_format_component_1 = require("./component/date-format.component");
var date_format_model_1 = require("./model/date-format.model");
var date_format_validator_1 = require("./validator/date-format.validator");
var DateFormatModule = (function () {
    function DateFormatModule() {
    }
    /**
     * @return {?}
     */
    DateFormatModule.forRoot = function () {
        return {
            ngModule: DateFormatModule,
            providers: [
                date_format_model_1.DateFormatModel,
                date_format_validator_1.DateFormatValidator
            ]
        };
    };
    return DateFormatModule;
}());
DateFormatModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule
                ],
                declarations: [
                    date_format_component_1.DateFormatComponent,
                ],
                exports: [
                    date_format_component_1.DateFormatComponent
                ],
                providers: [
                    date_format_model_1.DateFormatModel,
                    date_format_validator_1.DateFormatValidator
                ]
            },] },
];
/**
 * @nocollapse
 */
DateFormatModule.ctorParameters = function () { return []; };
exports.DateFormatModule = DateFormatModule;
function DateFormatModule_tsickle_Closure_declarations() {
    /** @type {?} */
    DateFormatModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DateFormatModule.ctorParameters;
}
