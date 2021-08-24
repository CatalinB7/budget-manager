import {
  Pipe,
  PipeTransform,
} from '@angular/core';

import { IGraphInput } from 'src/app/model/pieInput';
import { ISpending } from 'src/app/model/spending';

import { DollarPipe } from './dollar.pipe';

@Pipe({
  name: 'graphInput'
})
export class GraphInputPipe implements PipeTransform {

  transform(expenses: ISpending[], category: string): IGraphInput[] {
    const pipe = new DollarPipe();
    
    let result: IGraphInput = { name: category, series: [] };
    const sortedExpenses = expenses.sort((a, b) => ('' + a.date).localeCompare('' + b.date));
    let sum = 0;
    result.series = sortedExpenses.map( el => { 
      sum += el.value;
      return {
        name: (el.date + '').slice(0, 10),
        value: sum,
        tooltipText: `${el.name} : ${pipe.transform(el.value)}`
      }
    });
    return [result];
  }

}
