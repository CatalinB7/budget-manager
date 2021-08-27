import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';
import { IResponse } from 'src/app/model/IResponse';

import { IBudget } from '../../model/budget';
import { BudgetResponse } from '../../model/budgetResponse';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  headers = { responseType: 'application/json' };
  duration = 1500;
  budget$ = new BehaviorSubject<IBudget>({ value: 0, plannedSaving: 0 });

  constructor(
    private _http: HttpClient,
    private _snackBarService: SnackbarService
  ) { }

  getBudget() {
    return this._http.get<BudgetResponse>('http://localhost:3000/budgets?userId=1').pipe(
      map((data) => data[0].budget),
      tap(data => this.budget$.next(data))
    );
  }

  editBudget(newBudget: IBudget) {
    return this._http.put<IResponse>('http://localhost:3000/budgets?userId=1', { budget: newBudget },
      { headers: this.headers }).pipe(
        tap(data => {
          if (data.status === 'SUCCESS') {
            this.budget$.next(newBudget);
            this._snackBarService.openSuccessSnackBar('Updated budget', this.duration);
          } else {
            this._snackBarService.openErrorSnackBar(data.response.message, this.duration);
          }
        }),
      );
  }

}