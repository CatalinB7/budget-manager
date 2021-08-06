import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  IgxItemLegendModule,
  IgxLegendModule,
  IgxPieChartModule,
} from 'igniteui-angular-charts';
import { AddSpendingDialog } from 'src/modals/add-spending/add-spending-dialog';

import {
  CategoryModalComponent,
} from '../category-modal/category-modal.component';
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
    CategoryModalComponent
  ],
  imports: [
    CommonModule,
    AllMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CategoryModalComponent,
    PieChartComponent,
    IgxPieChartModule,
    IgxLegendModule,
    IgxItemLegendModule
  ],
  exports: [SpendingCardComponent, PieChartComponent]
})
export class SpendingsModule { }
