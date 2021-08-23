import { Injectable } from '@angular/core';

import {
  combineLatest,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppData } from 'src/app/model/data';

import { BudgetService } from './budget.service';
import { LoadingService } from './loading.service';
import { SpendingService } from './spending.service';

@Injectable({ providedIn: 'root' })
export class DataService {
    data$: Observable<IAppData>;

    constructor(
        private _budgetService: BudgetService,
        private _spendingService: SpendingService,
        private _loadingService: LoadingService
    ) {
        this._budgetService.getBudget().subscribe();
        this._spendingService.getSpendingList().subscribe();

        const budget$ = this._budgetService.budget$;

        const spendingList$ = this._spendingService.spendingList$;

        const spendingTotals$ = this._spendingService.spendingTotals$;

        const loadingState$ = this._loadingService.loading$;

        this.data$ = combineLatest([budget$, spendingList$, spendingTotals$, loadingState$])
            .pipe(
                map(([budget, spendingList, spendingTotals, loading]) => {
                    return {
                        budget,
                        spendingList,
                        spendingTotals,
                        loading,
                    }
                })
            )

    }


}