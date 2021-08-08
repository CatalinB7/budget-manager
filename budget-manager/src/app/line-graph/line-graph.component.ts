import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ISpending } from '../model/spending';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
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
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  selectedItem = "";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.category = changes.category.currentValue;
    this.data = [{name: this.category, 
    series: (changes.data.currentValue.sort((a: any, b: any) => ('' + a.date).localeCompare(b.date) )
      .map((el:ISpending) => ({name: (el.date as unknown as string).slice(0, 10), itemName: el.name, value: el.value})) )
   }];
    // console.log("data = ", this.data);
  }

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.selectedItem = data.itemName;
  }

  onActivate(data: any): void {
    //console.log('Activate data val = ', JSON.parse(JSON.stringify(data)));
    // this.selectedItem = data.itemName;
  }

  onDeactivate(data: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  clickBack() {
    this.toggle.emit();
  }

}
