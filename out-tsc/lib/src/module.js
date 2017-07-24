"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Angular modules */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
/* Own modules */
var date_format_component_1 = require("./component/date-format.component");
var date_format_model_1 = require("./model/date-format.model");
var date_format_validator_1 = require("./validator/date-format.validator");
var DateFormatModule = DateFormatModule_1 = (function () {
    function DateFormatModule() {
    }
    DateFormatModule.forRoot = function () {
        return {
            ngModule: DateFormatModule_1,
            providers: [
                date_format_model_1.DateFormatModel,
                date_format_validator_1.DateFormatValidator
            ]
        };
    };
    return DateFormatModule;
}());
DateFormatModule = DateFormatModule_1 = __decorate([
    core_1.NgModule({
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
    })
], DateFormatModule);
exports.DateFormatModule = DateFormatModule;
var DateFormatModule_1;
