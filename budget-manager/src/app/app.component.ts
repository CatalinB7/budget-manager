import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { IBudget } from './model/budget';
import { BudgetService } from './utils/services/budget.service';
import { DataService } from './utils/services/data.service';
import { SpendingService } from './utils/services/spending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'budget-manager';
  data$ = this._dataService.data$;
  colsNo = 2;

  constructor(
    private _spendingService: SpendingService, 
    private _budgetService: BudgetService, 
    private _dataService: DataService,
  ) { }

  ngOnInit(): void {
    this._budgetService.getBudget().subscribe();
    this._spendingService.getSpendingList().subscribe();
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 1200)
      this.colsNo = 1;
    else this.colsNo = 2;
  }

  updateBudget(newBudget: IBudget) {
    this._budgetService.editBudget(newBudget);
  }
}
