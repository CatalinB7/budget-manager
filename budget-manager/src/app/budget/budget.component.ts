import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ManageBudgetDialog,
} from 'src/app/modals/manage-budget/manage-budget-dialog';

import { IBudget } from '../model/budget';
import { ISpendingCategory } from '../model/spendingCategory';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetComponent implements OnChanges {
  @Input()spendingList: ISpendingCategory[] = [];
  @Input()budget: IBudget = {value: 0, plannedSaving: 0};
  
  leftInBudget = 0;
  constructor(private _dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this._dialog.open(ManageBudgetDialog, {
      disableClose: true,
      autoFocus: true,
      width: '300px',
      data: {value: this.budget.value, plannedSaving: this.budget.plannedSaving}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.budget.value = result.value;
        this.budget.plannedSaving = result.plannedSaving;
      }
    });
  }

  ngOnChanges(): void {
    let totalSpent = 0;
    this.spendingList.forEach(category => {
      category.expenses.forEach(expense => {
        totalSpent += expense.value;
      });
    });
    const val = this.budget.value * (1 - this.budget.plannedSaving) - totalSpent;
    this.leftInBudget = val > 0? val : 0;
  }
}