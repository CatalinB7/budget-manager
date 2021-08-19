import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ISpending } from '../model/spending';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineGraphComponent {
  @Input() data: any[] = [];
  @Input() category: string = "";
  @Output() toggle = new EventEmitter<void>();
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Value($)';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454']
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {//TODO: make the input for this component equal to data on line 43
    this.category = changes.category.currentValue;
    let sortedArr: ISpending[] = changes.data.currentValue.sort((a: any, b: any) => ('' + a.date).localeCompare(b.date))
      .map((el: ISpending) => ({...el}));
    let values = sortedArr.map((el: any) => el.value);
    for (let i = 1; i < sortedArr.length; i++) sortedArr[i].value += sortedArr[i - 1].value;
    this.data = [{
      name: [this.category],
      series: sortedArr.
        map((el: ISpending, idx: number) => ({
          name: (el.date as unknown as string).slice(0, 10),
          itemName: el.name, value: el.value,
          tooltipText: `${el.name} : ${values[idx]}$`
        }))
    }];
  }

  clickBack() {
    this.toggle.emit();
  }

}
