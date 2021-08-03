import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import { ISpendingCategory } from '../model/spendingCategory';

@Injectable({ providedIn: 'root' })
export class SpendingService {
  spendingList$ = new BehaviorSubject<ISpendingCategory[]>([{ name: '', expenses: [] }]);

  constructor(private _http: HttpClient) {}

  getSpendingList(): Observable<ISpendingCategory[]> {
    return this._http.get('http://localhost:3000/expenses_categories?userId=1').pipe(
      map((data: any) => data[0].categories),
      tap(data => this.spendingList$.next(data))
    );
  }
}