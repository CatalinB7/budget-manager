import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { LegendPosition } from '@swimlane/ngx-charts';

import { ISpending } from '../model/spending';
import { IComputedSpendCateg } from '../model/spendingCategory';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  data: {name: string, value: number}[] = [];
  pieDisplay = true;
  clickedCategory = "";
  //@Input() spendingList: ISpendingCategory [] = [];
  @Input() categoryList: IComputedSpendCateg[] = []; //mapped spendingList so it contains total

  // view: [number, number] = [500, 250];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = LegendPosition.Right;
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  expenses: ISpending[] = [];

  constructor() {}

  onSelect(data: any): void {
    this.clickedCategory = data.name? data.name : data;
    this.toggleCharts(this.clickedCategory);
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
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
