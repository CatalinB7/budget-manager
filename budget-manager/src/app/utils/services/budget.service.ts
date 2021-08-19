import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { IBudget } from '../../model/budget';
import { BudgetResponse } from '../../model/budgetResponse';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  budget$ = new BehaviorSubject<IBudget>({ value: 0, plannedSaving: 0 });

  constructor(private _http: HttpClient) { }

  getBudget() {
    return this._http.get<BudgetResponse>('http://localhost:3000/budgets?userId=1').pipe(
      map((data) => data[0].budget),
      tap(data => this.budget$.next(data))
    );
  }

  editBudget(newBudget: IBudget) {
    this.budget$.next(newBudget);
    // TODO: API call
  }

}