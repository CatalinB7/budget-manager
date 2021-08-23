import {
  Pipe,
  PipeTransform,
} from '@angular/core';

import {
  IComputedSpendCateg,
  ISpendingCategory,
} from 'src/app/model/spendingCategory';
import { ISpendingTotal } from 'src/app/model/spendingTotal';

@Pipe({
  name: 'spendcardInput'
})
export class SpendcardInputPipe implements PipeTransform {

  transform(list: ISpendingCategory[], totals: ISpendingTotal[]): IComputedSpendCateg[] {
    if(list.length !== totals.length) return []; //error
    return list.map( (el, idx) => {
      return {
        ...el,
        total: totals[idx].total
      };
    })
  }

}
