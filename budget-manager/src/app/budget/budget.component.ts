import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBudget } from '../model/budget';
import { ISpendingCategory } from '../model/spendingCategory';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnChanges {
  @Input()spendingList: ISpendingCategory[] = [];
  @Input()budget: IBudget = {value: 0, plannedSaving: 0};

  leftInBudget = 0;

  constructor() {}

  ngOnChanges(): void {
    let totalSpent = 0;

    this.spendingList.forEach(category => {
      category.expenses.forEach(expense => {
        totalSpent += expense.value;
      });
    });

    this.leftInBudget = this.budget.value - totalSpent;
  }

}
