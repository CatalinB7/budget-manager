import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ISpending } from '../model/spending';
import { ISpendingCategory } from '../model/spendingCategory';

@Component({
  selector: 'app-spending-card',
  templateUrl: './spending-card.component.html',
  styleUrls: ['./spending-card.component.scss']
})
export class SpendingCardComponent implements OnInit {
  categories: string[] = ["electronics", "hobbies", "groceries",];
  total: number[] = [1200, 5000, 4000];
  @Input() spendingList: ISpendingCategory[] = [];
  categoryList: any = [];
  iconText = "arrow_upward";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("received changes", changes.spendingList.currentValue);
    let names = changes.spendingList.currentValue.map((el: ISpendingCategory) => el.name);
    let totals: number[] = changes.spendingList.currentValue
      .map((cat: ISpendingCategory) => cat.expenses
        .reduce((a: ISpending, b: ISpending) => ({ value: a.value + b.value } as ISpending)))
          .map((el: ISpending) => el.value);
    this.categoryList = totals.map((el, idx) => ({
      total: el,
      name: names[idx],
      expenses: changes.spendingList.currentValue[idx].expenses
    })).sort((a, b) => a.total < b.total? -1 : 1);
  }

  clickedIcon() {
    if (this.iconText == "arrow_upward") {
      this.iconText  = "arrow_downward";
      this.categoryList = this.categoryList.sort((a: any, b: any) => a.total < b.total? -1 : 1);
    } else {
      this.iconText  = "arrow_upward";
      this.categoryList = this.categoryList.sort((a: any, b: any) => a.total > b.total? -1 : 1);
    }
  }

}
