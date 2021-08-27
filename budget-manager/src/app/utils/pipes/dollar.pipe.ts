import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({ name: 'dollar' })
export class DollarPipe implements PipeTransform {
  decimals = 3;

  transform(value: number): string {
    const stringValue = value.toString();
    let slicedValue = stringValue;
    let newValue = '';

    const dotIndex = stringValue.indexOf('.');

    if (dotIndex > 0) {
      if (dotIndex + this.decimals < stringValue.length) {
        slicedValue = stringValue.slice(0, dotIndex + this.decimals + 1);
      }
      newValue = this.addCommas(slicedValue, dotIndex);
    } else {
      newValue = this.addCommas(slicedValue, stringValue.length);
    }

    return '$' + newValue;
  }

  addCommas(toFormat: string, startIndex: number): string {
    let formattedString = toFormat

    for (let i = startIndex - 3; i > 0; i -= 3) {
      formattedString = formattedString.slice(0, i) + ',' + formattedString.slice(i);
    }

    return formattedString;
  }
}