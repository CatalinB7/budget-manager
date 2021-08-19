import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';

import { LegendPosition } from '@swimlane/ngx-charts';

import { ISpending } from '../model/spending';
import { IComputedSpendCateg } from '../model/spendingCategory';

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
  expenses: ISpending[] = [];
  @Input() categoryList: IComputedSpendCateg[] = [];
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

  ngOnChanges(changes: SimpleChanges) {//TODO: pass correct input, so no modifications would be required here
    this.categoryList = changes.categoryList.currentValue;
    this.data = this.categoryList.map(el => ({value: el.total, name: el.name}))
      .filter(el => el.value !=0);
  }

  toggleCharts(category: string) {
    this.togglePieDisplay();
    this.expenses = this.categoryList.filter(el => el.name == category)[0].expenses;
  }

  togglePieDisplay() {
    this.pieDisplay = !this.pieDisplay;
  }
}
