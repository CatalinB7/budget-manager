import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({name: 'dollar'})
export class DollarPipe implements PipeTransform {
    transform(value: number): string {
      return '$' + value;
    }
  }