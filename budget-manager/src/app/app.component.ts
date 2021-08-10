import {
  Component,
  OnInit,
} from '@angular/core';

import { IBudget } from './model/budget';
import { ISpending } from './model/spending';
import {
  IComputedSpendCateg,
  ISpendingCategory,
} from './model/spendingCategory';
import { BudgetService } from './services/budget.service';
import { SpendingService } from './services/spending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'budget-manager';

  spendingList: ISpendingCategory[] = [];
  categoryList: IComputedSpendCateg[] = []; //mapped spendingList so it contains computed total
  budget: IBudget = {value: 0, plannedSaving: 0};

  constructor(private _spengingService: SpendingService, private _budgetService: BudgetService) {}

  ngOnInit(): void {
    this._spengingService.getSpendingList().subscribe(list => {
      this.spendingList = list;
      this.categoryList = list.map(li => ({
        name: li.name,
        expenses: li.expenses,
        total: li.expenses.reduce((a: number, b: ISpending) => a + b.value, 0)
      }));
    });
    this._budgetService.getBudget().subscribe(budget => this.budget = budget);
  }
}
