import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

import { ISpendingCategory } from '../model/spendingCategory';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    spendingList$ = new BehaviorSubject<ISpendingCategory[]>([{name: '', spending: []}]);
    spendingListObs$ = new Observable<ISpendingCategory[]>();

    constructor() {
        this.spendingListObs$ = this.spendingList$.asObservable();
    }
    
}