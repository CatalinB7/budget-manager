import {
  ChangeDetectionStrategy,
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
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IComputedSpendCateg } from '../../model/spendingCategory';
import { SpendingService } from '../../utils/services/spending.service';
import {
  DeleteWarningDialogComponent,
} from '../delete-warning/delete-warning-dialog.component';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryModalComponent {

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(22)
    ]),
  });
  oldCategory = "";
  showSubmit = true;
  labelName = "New Category";

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryList: IComputedSpendCateg[] },
    private _spendingService: SpendingService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    if (this.form.status === 'VALID') {
      this._spendingService.addSpendingCategory(this.form.value.category)
        .subscribe((result: any) => {
          this.data.categoryList.push({ total: 0, name: this.form.value.category, expenses: [] });
          this.openSnackBar(`Created ${this.form.value.category}`, 800);
          this.form.reset();
        },
          err => this.openSnackBar(err.error, 1000));
    } else {
      this.openSnackBar('Category name must have length between 1 and 22 characters', 2000);
    }
  }

  deleteCategory(categoryName: string) {
    this._spendingService.removeSpendingCategory(categoryName).
      subscribe((res: any) => {
        this.data.categoryList.forEach((el, idx) => {
          if (el.name == categoryName) {
            this.data.categoryList.splice(idx, 1);
            return;
          }
        });
      }, (err: any) => this.openSnackBar(err.error, 1000));
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
      }, (err: any) => this.openSnackBar(err.error, 1000));
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
    this.form.setValue({ 'category': val });
  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration });
  }


  openDialogDelWarn(toDelete: string) {
    const dialogRef = this._dialog.open(DeleteWarningDialogComponent, {
      width: '350px',
      data: toDelete,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteCategory(toDelete);
    });
  }

}
