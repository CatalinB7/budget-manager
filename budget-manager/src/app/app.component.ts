import { Component, OnInit } from '@angular/core';
import { IBudget } from './model/budget';
import { ISpendingCategory } from './model/spendingCategory';
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
  budget: IBudget = {monthlyBudget: 0, targetSavings: 0};

  constructor(private _spengingService: SpendingService, private _budgetService: BudgetService) {}

  ngOnInit(): void {
    this._spengingService.getSpendingList().subscribe(list => this.spendingList = list);
    this._budgetService.getBudget().subscribe(budget => this.budget = budget);
  }
}
