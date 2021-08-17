import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Observable,
  Subject,
} from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { Recurrence } from '../enums/recurrences';
import { ISpendingCategory } from '../model/spendingCategory';
import { ISpendingTotal } from '../model/spendingTotal';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }),
};

@Injectable({ providedIn: 'root' })
export class SpendingService {
  spendingList: ISpendingCategory[] = [];
  spendingList$ = new Subject<ISpendingCategory[]>();

  spendingTotals$ = new Subject<ISpendingTotal[]>();

  constructor(private _http: HttpClient) {
    this.spendingList$.subscribe(data => this.spendingList = data);
  }

  handleResponse(data: string) {
    if (data === "OK") {
      this.computeTotals();
    } else {
      location.reload();
    }
  }

  computeTotals() {
    this.spendingTotals$.next(this.spendingList.map((category) => {
      let total = 0;
      category.expenses.forEach(element => {
        total += element.value;
      });

      
      return { total: total, name: category.name };
    }));
  }

  getCategotyPosition(categoryName: string): number {
    return this.spendingList.map((obj) => obj.name).indexOf(categoryName);
  }

  getSpendingPosition(categoryPosition: number, spendingId: string): number {
    return this.spendingList[categoryPosition].expenses.map(obj => obj.id).indexOf(spendingId);
  }

  getSpendingList(): Observable<ISpendingCategory[]> {
    return this._http.get('http://localhost:3000/expenses_categories?userId=1').pipe(
      map((data: any) => data[0].categories),
      tap(data => {
        this.spendingList$.next(data);

        this.computeTotals();
      })
    );
  }

  addSpending(spending: any) {
    const newSpending = {
      id: "|BLANK|",
      name: spending.name,
      value: spending.value,
      date: spending.date,
      recurring: Recurrence.Daily
    }

    const body = {
      category: spending.category,
      spending: newSpending
    };

    this.spendingList[this.getCategotyPosition(spending.category)].expenses.push(newSpending);
    this.spendingList$.next(this.spendingList);

    return this._http.post('http://localhost:3000/expenses_categories/spendings?userId=1', body, { responseType: "text" }).pipe(
      tap(data => {
        this.handleResponse(data);
      })
    );
  }

  addSpendingCategory(categoryName: string) {
    const body: ISpendingCategory = { name: categoryName, expenses: [] };

    this.spendingList.push(body);
    this.spendingList$.next(this.spendingList);

    return this._http.post('http://localhost:3000/expenses_categories/categories?userId=1', body, { responseType: "text" }).pipe(
      tap(data => {
        this.handleResponse(data);
      })
    );
  }

  removeSpending(categoryName: string, spendingId: string) {
    const categoryPosition = this.getCategotyPosition(categoryName);
    const spendingPosition = this.getSpendingPosition(categoryPosition, spendingId);

    this.spendingList[categoryPosition].expenses.splice(spendingPosition, 1);
    this.spendingList$.next(this.spendingList);

    return this._http.delete(`http://localhost:3000/expenses_categories/spendings?userId=1&spendingId=${spendingId}&category=${categoryName}`, { responseType: "text" }).pipe(
      tap(data => {
        this.handleResponse(data);
      })
    );
  }

  removeSpendingCategory(categoryName: string) {
    const categoryPosition = this.getCategotyPosition(categoryName);

    this.spendingList.splice(categoryPosition, 1);
    this.spendingList$.next(this.spendingList);

    return this._http.delete(`http://localhost:3000/expenses_categories/categories?userId=1&name=${categoryName}`, { responseType: "text" }).pipe(
      tap(data => {
        this.handleResponse(data);
      })
    );
  }

  editCategory(oldCategory: string, newCategory: string) {
    const categoryPosition = this.getCategotyPosition(oldCategory);

    this.spendingList[categoryPosition].name = newCategory;
    this.spendingList$.next(this.spendingList);

    return this._http.put(`http://localhost:3000/expenses_categories/categories?userId=1&oldName=${oldCategory}&newName=${newCategory}`, {}, { responseType: "text" }).pipe(
      tap(data => {
        this.handleResponse(data);
      })
    );

  }
}