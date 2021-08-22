import {
  Pipe,
  PipeTransform,
} from '@angular/core';

import { IPieInput } from 'src/app/model/pieInput';
import { ISpendingTotal } from 'src/app/model/spendingTotal';

@Pipe({
  name: 'pieInput'
})
export class PieInputPipe implements PipeTransform {

  transform(spendingTotals: ISpendingTotal[]): IPieInput[] {
    return spendingTotals.map(el => ({ value: el.total, name: el.name }));
  }

}
