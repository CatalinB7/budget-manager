import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';
import { IResponse } from 'src/app/model/IResponse';

import { Recurrence } from '../../enums/recurrences';
import { ISpendingCategory } from '../../model/spendingCategory';
import { SpendingResponse } from '../../model/spendingResponse';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class SpendingService {
  duration = 2000;
  headers = { responseType: 'application/json' };
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

  constructor(
    private _http: HttpClient,
    private _snackBarService: SnackbarService
  ) { }

  handleResponse(data: IResponse, newValue: ISpendingCategory[], successMsg: string) {
    if (data.status === 'SUCCESS') {
      this.spendingList$.next([...newValue]);
      this._snackBarService.openSuccessSnackBar(successMsg, this.duration);
    } else {
      this.getSpendingList();
      this._snackBarService.openErrorSnackBar(data.response.message, this.duration);
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

  addSpending(spendingPayload: any) {
    const newSpending = {
      name: spendingPayload.name,
      value: spendingPayload.value,
      date: spendingPayload.date,
      recurring: Recurrence.Daily
    }

    const body = {
      category: spendingPayload.category,
      spending: newSpending
    };

    const successMsg = 'Inserted a new spending';

    return this._http.post<IResponse>('http://localhost:3000/expenses_categories/spendings?userId=1',
      body, { headers: this.headers }).pipe(
        tap(data => {
          this.spendingList$.value[this.getCategotyPosition(spendingPayload.category)].expenses.push(data.response);
          
          this.handleResponse(data, this.spendingList$.value, successMsg);
        })
      );
  }

  addSpendingCategory(categoryName: string) {
    const body: ISpendingCategory = { name: categoryName, expenses: [] };
    const successMsg = `Inserted new category ${categoryName} succesfully!`;

    return this._http.post<IResponse>('http://localhost:3000/expenses_categories/categories?userId=1',
      body, { headers: this.headers }).pipe(
      tap(data => {
        this.handleResponse(data, [...this.spendingList$.value, body], successMsg);
      })
    );
  }

  removeSpending(categoryName: string, spendingId: string) {
    const categoryPosition = this.getCategotyPosition(categoryName);
    const spendingPosition = this.getSpendingPosition(categoryPosition, spendingId);

    return this._http.delete<IResponse>(`http://localhost:3000/expenses_categories/spendings?userId=1&spendingId=${spendingId}&category=${categoryName}`,
      { headers: this.headers }).pipe(
      tap(data => {
        const spending = this.spendingList$.value[categoryPosition].expenses.splice(spendingPosition, 1);
        const successMsg = `Deleted ${spending[0].name} succesfully!`;

        this.handleResponse(data, this.spendingList$.value, successMsg);
      })
    );
  }

  removeSpendingCategory(categoryName: string) {
    const categoryPosition = this.getCategotyPosition(categoryName);
    const successMsg = `Deleted ${categoryName} succesfully!`

    return this._http.delete<IResponse>(`http://localhost:3000/expenses_categories/categories?userId=1&name=${categoryName}`,
      { headers: this.headers }).pipe(
      tap(data => {
        this.spendingList$.value.splice(categoryPosition, 1);

        this.handleResponse(data, this.spendingList$.value, successMsg);
      })
    );
  }

  editCategory(oldCategory: string, newCategory: string) {
    const categoryPosition = this.getCategotyPosition(oldCategory);
    const successMsg = `Changed category name \"${oldCategory}\" to \"${newCategory}\" succesfully!`;

    return this._http.put<IResponse>(`http://localhost:3000/expenses_categories/categories?userId=1&oldName=${oldCategory}&newName=${newCategory}`, {},
      { headers: this.headers }).pipe(
      tap(data => {
        this.spendingList$.value[categoryPosition].name = newCategory;

        this.handleResponse(data, this.spendingList$.value, successMsg);
      })
    );
  }
}