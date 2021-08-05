import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { IComputedSpendCateg } from '../model/spendingCategory';
import { SpendingService } from '../services/spending.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {
  newCategory = "";
  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryList: IComputedSpendCateg[] },
    private _spendingService: SpendingService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // console.log("dialog data", this.data);
  }

  addCategory(): void {
    this._spendingService.addSpendingCategory(this.newCategory).
      subscribe((result: any) => {
        this.data.categoryList.push({ total: 0, name: this.newCategory, expenses: [] });
        // console.log("new data =", this.data.categoryList);
        this.newCategory = "";
      },
        err => console.log(err));
  }

  removeCategory(categoryName: string): void {

    this._spendingService.removeSpendingCategory(categoryName).
      subscribe((res: any) => {
        //this.data.categoryList = this.data.categoryList.filter(el => el.name != categoryName);
        //i need to edit the same array i got from parent
        this.data.categoryList.forEach((el, idx) => {
          if(el.name == categoryName) {
            this.data.categoryList.splice(idx);
            return;
          }
        });
      })
  }

  editCategory(oldCategory: string, newCategory: string): void {
    console.log("got this to edit", oldCategory, newCategory);
    this._spendingService.editCategory(oldCategory, newCategory).
      subscribe((res: any) => {
        this.data.categoryList.forEach((el, idx) => {
          if(el.name == oldCategory) {
            this.data.categoryList[idx].name = newCategory;
            return;
          }
        });
      }), (err: any) => console.log(err)
  }

}
