# angular-date-format 

Angular2 date format component. Check our [documentation](https://gorilainvest.github.io/angular-date-format/)

## Requirements

- npm
- Angular2

## Installation

To install this library, run:

```bash
$ npm install angular-date-format --save
```

## Usage

Include in your module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AngularDateFormatModule } from 'angular-date-format';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    AngularDateFormatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<date-format
  [minDate]="options.minDate"
  [maxDate]="options.maxDate"
  [usefullDate]="options.usefullDate"
  [holiday]="options.holiday"
  [weekend]="options.weekend"
  placeholder="DD/MM/YYYY"
  (ngModelChange)="updateDate($event)">
</date-format>
```

## Development

To run demo application
```bash
$ npm start
$ npm start
```

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT
