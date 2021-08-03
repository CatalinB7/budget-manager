import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { IBudget } from '../model/budget';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  budget$ = new BehaviorSubject<IBudget>({ monthlyBudget: 0, targetSavings: 0 });

  constructor(private _http: HttpClient) { }

  getBudget(): Observable<IBudget> {
    return this._http.get('http://localhost:3000/budgets?userId=1').pipe(
      map((data: any) => data[0].budget)
    );
  }

}