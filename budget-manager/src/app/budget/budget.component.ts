import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ManageBudgetDialog,
} from 'src/app/modals/manage-budget/manage-budget-dialog';

import { IBudget } from '../model/budget';
import { ISpendingTotal } from '../model/spendingTotal';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetComponent {
  private _spendingTotals: ISpendingTotal[] = [];
  private _budget = { value: 0, plannedSaving: 0 };

  lowBudget = false;
  targetSavings = 0;
  leftInBudget = 0;

  constructor(
    private _dialog: MatDialog,
  ) { }

  @Input()
  get budget(): IBudget { return this._budget }
  set budget(budget: IBudget) {
    this._budget = budget;

    this.computeTargetSavings();
    this.computeLeftInBudget();
  }

  @Input()
  get spendingTotals(): ISpendingTotal[] { return this._spendingTotals }
  set spendingTotals(spendingTotals: ISpendingTotal[]) {
    this._spendingTotals = spendingTotals;

    this.computeLeftInBudget();
  }

  @Output() changeBudgetEvent = new EventEmitter<IBudget>();


  computeTargetSavings() {
    this.targetSavings = this.budget.value * this.budget.plannedSaving;
  }

  computeLeftInBudget() {
    let totalSpent = 0;

    this.spendingTotals.forEach(spending => {
      totalSpent += spending.total;
    });

    const val = this.budget.value * (1 - this.budget.plannedSaving) - totalSpent;
    this.leftInBudget = val > 0 ? val : 0;

    this.lowBudget = this.leftInBudget < 0.2 * this.budget.value;
  }

  openDialog() {
    const dialogRef = this._dialog.open(ManageBudgetDialog, {
      disableClose: true,
      autoFocus: true,
      width: '300px',
      data: { value: this.budget.value, plannedSaving: this.budget.plannedSaving }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.changeBudgetEvent.emit({ value: result.value, plannedSaving: result.plannedSaving });
    });
  }

}
