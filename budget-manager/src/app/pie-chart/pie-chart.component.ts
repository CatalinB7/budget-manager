import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { ISpending } from '../model/spending';
import {
  IComputedSpendCateg,
  ISpendingCategory,
} from '../model/spendingCategory';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  data = [
    { Value: 25, Label: "Residential" },
    { Value: 12, Label: "Heating" },
    { Value: 11, Label: "Lighting" },
    { Value: 18, Label: "Other" },
    { Value: 37, Label: "Cooling" }
];

  @Input() spendingList: ISpendingCategory [] = [];
  categoryList: IComputedSpendCateg[] = []; //mapped spendingList so it contains total

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let names = changes.spendingList.currentValue.map((el: ISpendingCategory) => el.name);
    let totals: number[] = changes.spendingList.currentValue
      .map((cat: ISpendingCategory) => cat.expenses
        .reduce((a: number, b: ISpending) => a + b.value, 0));
    this.categoryList = totals.map((el, idx) => ({
      total: el,
      name: names[idx],
      expenses: changes.spendingList.currentValue[idx].expenses
    })).sort((a, b) => a.total < b.total ? -1 : 1);
    this.data = this.categoryList.map(el => ({Value: el.total, Label: el.name}));
  }
  
}
