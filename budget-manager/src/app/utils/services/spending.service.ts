import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { Recurrence } from '../../enums/recurrences';
import { ISpendingCategory } from '../../model/spendingCategory';
import { SpendingResponse } from '../../model/spendingResponse';

@Injectable({ providedIn: 'root' })
export class SpendingService {
  spendingList$ = new BehaviorSubject<ISpendingCategory[]>([]);

  spendingTotals$ = this.spendingList$.pipe(
    map((categories) => {
      return categories.map((category) => {
        let total = 0;
        category.expenses.forEach(element => {
          total += element.value;
        });

        return { total, name: category.name };
      });
    }));

  constructor(private _http: HttpClient) { }

  handleResponse(data: string, newValue: ISpendingCategory[]) {
    if (data === 'OK') {
      this.spendingList$.next(newValue);
    } else {
      this.getSpendingList();
    }
  }

  getCategotyPosition(categoryName: string): number {
    return this.spendingList$.value.map((obj) => obj.name).indexOf(categoryName);
  }

  getSpendingPosition(categoryPosition: number, spendingId: string): number {
    return this.spendingList$.value[categoryPosition].expenses.map(obj => obj.id).indexOf(spendingId);
  }

  getSpendingList() {
    return this._http.get<SpendingResponse>('http://localhost:3000/expenses_categories?userId=1').pipe(
      map((data) => data[0].categories),
      tap(data => {
        this.spendingList$.next(data);
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


    return this._http.post('http://localhost:3000/expenses_categories/spendings?userId=1', body, { responseType: "text" }).pipe(
      tap(data => {
        const currentSpending = this.spendingList$.value;

        currentSpending[this.getCategotyPosition(spending.category)].expenses.push(newSpending);

        this.handleResponse(data, [...currentSpending]);
      })
    );
  }

  addSpendingCategory(categoryName: string) {
    const body: ISpendingCategory = { name: categoryName, expenses: [] };

    return this._http.post('http://localhost:3000/expenses_categories/categories?userId=1', body, { responseType: "text" }).pipe(
      tap(data => {
        this.handleResponse(data, [...this.spendingList$.value, body]);
      })
    );
  }

  removeSpending(categoryName: string, spendingId: string) {
    const categoryPosition = this.getCategotyPosition(categoryName);
    const spendingPosition = this.getSpendingPosition(categoryPosition, spendingId);

    return this._http.delete(`http://localhost:3000/expenses_categories/spendings?userId=1&spendingId=${spendingId}&category=${categoryName}`, { responseType: "text" }).pipe(
      tap(data => {
        this.spendingList$.value[categoryPosition].expenses.splice(spendingPosition, 1);

        this.handleResponse(data, this.spendingList$.value);
      })
    );
  }

  removeSpendingCategory(categoryName: string) {
    const categoryPosition = this.getCategotyPosition(categoryName);

    return this._http.delete(`http://localhost:3000/expenses_categories/categories?userId=1&name=${categoryName}`, { responseType: "text" }).pipe(
      tap(data => {
        this.spendingList$.value.splice(categoryPosition, 1);

        this.handleResponse(data, this.spendingList$.value);
      })
    );
  }

  editCategory(oldCategory: string, newCategory: string) {
    const categoryPosition = this.getCategotyPosition(oldCategory);

    return this._http.put(`http://localhost:3000/expenses_categories/categories?userId=1&oldName=${oldCategory}&newName=${newCategory}`, {}, { responseType: "text" }).pipe(
      tap(data => {
        this.spendingList$.value[categoryPosition].name = newCategory;

        this.handleResponse(data, this.spendingList$.value);
      })
    );

  }
}