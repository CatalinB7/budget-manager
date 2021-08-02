import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

import { IBudget } from '../model/budget';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    budget$ = new BehaviorSubject<IBudget>({monthlyBudget: 0, totalSpent: 0, targetSavings: 0});
    budgetObs$ = new Observable<IBudget>();

    constructor() {
        this.budgetObs$ = this.budget$.asObservable();
    }
    
}