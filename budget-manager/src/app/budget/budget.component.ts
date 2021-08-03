import { Component, Input, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { ISpendingCategory } from '../model/spendingCategory';
import { SpendingService } from '../services/spending.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @Input()spendingList: ISpendingCategory[] = [];

  constructor() {}

  ngOnInit(): void {

  }

}
