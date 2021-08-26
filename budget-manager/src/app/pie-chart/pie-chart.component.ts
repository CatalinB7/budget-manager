import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { LegendPosition } from '@swimlane/ngx-charts';

import { IPieInput } from '../model/pieInput';
import { ISpending } from '../model/spending';
import { ISpendingCategory } from '../model/spendingCategory';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {

  pieDisplay = true;
  clickedCategory = '';
  expensesCategory: ISpending[] = [];

  @Input()
  data: IPieInput[] = [];

  private _spendingList: ISpendingCategory[] = [];

  @Input()
  get spendingList(): ISpendingCategory[] { return this._spendingList; }
  set spendingList(spendingList: ISpendingCategory[]) {
    this._spendingList = spendingList;
    if(!this.pieDisplay) {
      this.setExpensesCategory(this.clickedCategory);
    }
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
    this.setExpensesCategory(category);
    this.togglePieDisplay();
  }

  togglePieDisplay() {
    this.pieDisplay = !this.pieDisplay;
  }

  setExpensesCategory(category: string) {
    const categoryIndex = this.spendingList.findIndex(el => el.name === category);
    this.expensesCategory = [...this.spendingList[categoryIndex].expenses];
  }
}
