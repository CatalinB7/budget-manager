import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { ISpendingCategory } from '../model/spendingCategory';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  }),
};

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

  addSpending(spending: any) {
    const body = {
      category: spending.category, 
      spending: {
        name: spending.name,
        value: spending.value,
        date: spending.date,
        recurring: "|BLANK|"
      }
    };

    return this._http.post('http://localhost:3000/expenses_categories/spendings?userId=1', body, {responseType: "text"});
  }

  addSpendingCategory(categoryName: string) {
    let body: ISpendingCategory = {name: categoryName, expenses: []};
    return this._http.post('http://localhost:3000/expenses_categories/categories?userId=1', body, {responseType: "text"});
  }

  removeSpending(categoryName: string, spendingId: string) {
    return this._http.delete(`http://localhost:3000/expenses_categories/spendings?userId=1&spendingId=${spendingId}&category=${categoryName}`, {responseType: "text"});
  }

  removeSpendingCategory(categoryName: string) {
    return this._http.delete(`http://localhost:3000/expenses_categories/categories?userId=1&name=${categoryName}`, {responseType: "text"});
  }

  editCategory(oldCategory: string, newCategory: string) {
    console.log("editing name", oldCategory, newCategory);
    return this._http.put(`http://localhost:3000/expenses_categories/categories?userId=1&oldName=${oldCategory}&newName=${newCategory}`, {},
    {responseType: "text"});

  }


}