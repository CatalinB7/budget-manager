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

  computeTotals() {
    this.spendingTotals$.next(this.spendingList.map((category) => {
      let total = 0;
      category.expenses.forEach(element => {
        total += element.value;
      });

      
      return { total: total, name: category.name };
    }));
  }

  getSpendingList(): Observable<ISpendingCategory[]> {
    return this._http.get('http://localhost:3000/expenses_categories?userId=1').pipe(
      map((data: any) => data[0].categories),
      tap(data => {
        console.log(data);
        this.spendingList$.next(data);

        this.computeTotals();

        console.log(this.spendingTotals$);
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

    this.spendingList.filter(obj => obj.name == spending.category)[0].expenses.push(newSpending);
    this.spendingList$.next(this.spendingList);

    return this._http.post('http://localhost:3000/expenses_categories/spendings?userId=1', body, { responseType: "text" }).pipe(
      tap(data => {
        console.log(data);
        if (data === "OK") {
          this.computeTotals();
        } else {
          location.reload();
        }
      })
    );
  }

  addSpendingCategory(categoryName: string) {
    let body: ISpendingCategory = { name: categoryName, expenses: [] };
    return this._http.post('http://localhost:3000/expenses_categories/categories?userId=1', body, { responseType: "text" });
  }

  removeSpending(categoryName: string, spendingId: string) {
    return this._http.delete(`http://localhost:3000/expenses_categories/spendings?userId=1&spendingId=${spendingId}&category=${categoryName}`, { responseType: "text" });
  }

  removeSpendingCategory(categoryName: string) {
    return this._http.delete(`http://localhost:3000/expenses_categories/categories?userId=1&name=${categoryName}`, { responseType: "text" });
  }

  editCategory(oldCategory: string, newCategory: string) {
    console.log("editing name", oldCategory, newCategory);
    return this._http.put(`http://localhost:3000/expenses_categories/categories?userId=1&oldName=${oldCategory}&newName=${newCategory}`, {},
      { responseType: "text" }).pipe(tap(data => console.log(data)));

  }


}