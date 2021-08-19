import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { LegendPosition } from '@swimlane/ngx-charts';

import { ISpending } from '../model/spending';
import { ISpendingCategory } from '../model/spendingCategory';
import { ISpendingTotal } from '../model/spendingTotal';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {

  data: {name: string, value: number}[] = [];
  pieDisplay = true;
  clickedCategory = "";
  expensesCategory: ISpending[] = [];
  private _spendingTotals: ISpendingTotal[] = [];
  private _spendingList: ISpendingCategory[] = [];

  @Input()
  get spendingTotals(): ISpendingTotal[] { return this._spendingTotals; }
  set spendingTotals(spendingTotals: ISpendingTotal[]) {
    this.data = ((spendingTotals && spendingTotals) || [])
    .map(el => ({value: el.total, name: el.name}));
  };

  @Input()
  get spendingList(): ISpendingCategory[] { return this._spendingList; }
  set spendingList(spendingList: ISpendingCategory[]) {
    this._spendingList = spendingList;
  }

  // pie options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = LegendPosition.Right;
  scheme = 'horizon';

  constructor() {}

  onSelect(data: any): void {
    this.clickedCategory = data.name? data.name : data;
    this.toggleCharts(this.clickedCategory);
  }

  toggleCharts(category: string) {
    this.togglePieDisplay();
    let categoryIndex = this.spendingList.findIndex(el=> el.name === category);
    this.expensesCategory = this.spendingList[categoryIndex].expenses;
  }

  togglePieDisplay() {
    this.pieDisplay = !this.pieDisplay;
  }
}
