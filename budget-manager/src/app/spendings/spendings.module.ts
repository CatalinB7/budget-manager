import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AddSpendingDialog } from 'src/modals/add-spending/add-spending-dialog';

import { AllMaterialModule } from '../material.module';
import { ShowIfTruncatedDirective } from '../show-if-truncated.directive';
import {
  SpendingCardComponent,
} from '../spending-card/spending-card.component';

@NgModule({
  declarations: [
    SpendingCardComponent,
    ShowIfTruncatedDirective,
    AddSpendingDialog
  ],
  imports: [
    CommonModule,
    AllMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SpendingCardComponent]
})
export class SpendingsModule { }
