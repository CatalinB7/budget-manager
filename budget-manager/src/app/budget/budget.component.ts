import { Component, Input, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { IBudget } from '../model/budget';
import { ISpendingCategory } from '../model/spendingCategory';
import { SpendingService } from '../services/spending.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @Input()spendingList: ISpendingCategory[] = [];
  @Input()budget: IBudget = {value: 0, plannedSaving: 0};

  constructor() {}

  ngOnInit(): void {

  }

}
