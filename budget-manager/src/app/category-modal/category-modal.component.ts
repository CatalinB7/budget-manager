import {
  Component,
  Inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
export class CategoryModalComponent {

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  oldCategory = "";
  showSubmit = true;
  labelName = "New Category";

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryList: IComputedSpendCateg[] },
    private _spendingService: SpendingService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    if(this.form.status === 'VALID') {
      this._spendingService.addSpendingCategory(this.form.value.category)
      .subscribe((result: any) => {
        this.data.categoryList.push({ total: 0, name: this.form.value.category, expenses: [] });
        this.form.reset();
      },
        err => console.log(err));
    } else {
      //display an error
    }
  }

  removeCategory(categoryName: string): void {
    this._spendingService.removeSpendingCategory(categoryName).
      subscribe((res: any) => {
        this.data.categoryList.forEach((el, idx) => {
          if (el.name == categoryName) {
            this.data.categoryList.splice(idx, 1);
            return;
          }
        });
      })
  }

  editCategory(newCategory: string): void {
    this._spendingService.editCategory(this.oldCategory, newCategory).
      subscribe((res: any) => {
        this.data.categoryList.forEach((el, idx) => {
          if (el.name == this.oldCategory) {
            this.data.categoryList[idx].name = newCategory;
            return;
          }
        });
        this.dropEdit();
      }, (err: any) => console.log(err));
  }

  changeInputToEdit(category: string) {
    this.setInput(category);
    this.oldCategory = category;
    this.showSubmit = false;
    this.labelName = "Edit Category";
  }

  dropEdit() {
    this.setInput("");
    this.showSubmit = true;
    this.labelName = "New Category";
    this.oldCategory = "";
  }

  setInput(val: string) {
    this.form.setValue({'category': val});
  }

}
