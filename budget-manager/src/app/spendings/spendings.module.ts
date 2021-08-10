import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
  AddSpendingDialog,
} from '../../modals/add-spending/add-spending-dialog';
import {
  CategoryModalComponent,
} from '../category-modal/category-modal.component';
import { LineGraphComponent } from '../line-graph/line-graph.component';
import { AllMaterialModule } from '../material.module';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ShowIfTruncatedDirective } from '../show-if-truncated.directive';
import {
  SpendingCardComponent,
} from '../spending-card/spending-card.component';

@NgModule({
  declarations: [
    SpendingCardComponent,
    ShowIfTruncatedDirective,
    AddSpendingDialog,
    CategoryModalComponent,
    PieChartComponent,
    LineGraphComponent
  ],
  imports: [
    CommonModule,
    AllMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [SpendingCardComponent, PieChartComponent]
})
export class SpendingsModule { }
