import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
  AddSpendingDialog,
} from '../../app/modals/add-spending/add-spending-dialog';
import { LineGraphComponent } from '../line-graph/line-graph.component';
import {
  CategoryModalComponent,
} from '../modals/category/category-modal.component';
import {
  DeleteWarningDialogComponent,
} from '../modals/delete-warning/delete-warning-dialog.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ShowIfTruncatedDirective } from '../show-if-truncated.directive';
import {
  SpendingCardComponent,
} from '../spending-card/spending-card.component';
import { DeleteWarningDialogComponent } from '../delete-warning-dialog/delete-warning-dialog.component';

@NgModule({
  declarations: [
    SpendingCardComponent,
    ShowIfTruncatedDirective,
    AddSpendingDialog,
    CategoryModalComponent,
    PieChartComponent,
    LineGraphComponent,
    DeleteWarningDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatOptionModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatNativeDateModule,
  ],
  exports: [SpendingCardComponent, PieChartComponent]
})
export class SpendingsModule { }
