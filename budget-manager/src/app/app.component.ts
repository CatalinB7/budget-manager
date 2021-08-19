import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

import { IBudget } from './model/budget';
import { ISpending } from './model/spending';
import {
  IComputedSpendCateg,
  ISpendingCategory,
} from './model/spendingCategory';
import { BudgetService } from './utils/services/budget.service';
import { SpendingService } from './utils/services/spending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'budget-manager';
  spendingList: ISpendingCategory[] = [];
  spendingTotals: ISpendingTotal[] = [];
  budget: IBudget = {value: 0, plannedSaving: 0};
  colsNo = 2;

  constructor(private _spengingService: SpendingService, private _budgetService: BudgetService) {
    this._spengingService.spendingList$.subscribe(value => this.spendingList = value);
    this._spengingService.spendingTotals$.subscribe(value => this.spendingTotals = value);
    this._budgetService.budget$.subscribe(value => this.budget = value);
  }

  ngOnInit(): void {
    this._spengingService.getSpendingList().subscribe();
    this._budgetService.getBudget().subscribe();
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 1200) 
      this.colsNo = 1;
    else this.colsNo = 2;
  }
}
