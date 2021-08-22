import { Injectable } from '@angular/core';

import {
  combineLatest,
  Observable,
} from 'rxjs';
import {
  map,
  startWith,
} from 'rxjs/operators';
import { IAppData } from 'src/app/model/data';

import { BudgetService } from './budget.service';
import { SpendingService } from './spending.service';

@Injectable({ providedIn: 'root' })
export class DataService {
    data$: Observable<IAppData> | undefined;

    constructor(
        private _budgetService: BudgetService,
        private _spendingService: SpendingService
    ) { 
        this.init();
    }

    init() {
        const budget$ = this._budgetService.budget$
            .pipe(
                startWith({ value: 0, plannedSaving: 0 })
            );

        const spendingList$ = this._spendingService.spendingList$
            .pipe(
                startWith([])
            );
        
        const spendingTotals$ = this._spendingService.spendingTotals$
            .pipe(
                startWith([])
            );
        
        this.data$ = combineLatest([budget$, spendingList$, spendingTotals$])
            .pipe(
                map(([budget, spendingList, spendingTotals]) => {
                    return {
                        budget,
                        spendingList,
                        spendingTotals,
                    }
                })
            )
    }

}