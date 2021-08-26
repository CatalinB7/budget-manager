import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { IBudget } from './model/budget';
import { ISpending } from './model/spending';
import { ISpendingDeleteData } from './model/spendingOperations';
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
  splitSize = 1200;

  constructor(
    private _spendingService: SpendingService, 
    private _budgetService: BudgetService, 
    private _dataService: DataService,
  ) { }

  ngOnInit(): void {
    this._budgetService.getBudget().subscribe();
    this._spendingService.getSpendingList().subscribe();
    if(window.innerWidth <= this.splitSize)
      this.colsNo = 1;
  }

  onResize(event: any) {
    if (event.target.innerWidth <= this.splitSize)
      this.colsNo = 1;
    else this.colsNo = 2;
  }

  updateBudget(newBudget: IBudget) {
    this._budgetService.editBudget(newBudget).subscribe();
  }

  onDeleteSpending(toDelete: ISpendingDeleteData) {
    this._spendingService.removeSpending(toDelete.categoryName, toDelete.spendingId).subscribe();
  }

  onAddSpending(newSpending: ISpending) {
    this._spendingService.addSpending(newSpending).subscribe();
  }
}
