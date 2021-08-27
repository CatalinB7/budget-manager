import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IGraphInput } from '../model/pieInput';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineGraphComponent {
  @Input() data: IGraphInput[] = [];
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

  clickBack() {
    this.toggle.emit();
  }

}
