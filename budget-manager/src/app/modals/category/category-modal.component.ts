import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  ViewChild,
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

import { Observable } from 'rxjs';
import { IAppData } from 'src/app/model/data';
import {
  MyErrorStateMatcher,
} from 'src/app/utils/form-validators/MyErrorStateMatcher';
import { SnackbarService } from 'src/app/utils/services/snackbar.service';

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
  matcher = new MyErrorStateMatcher();
  maxCharLen = 22;

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.maxCharLen)
    ]),
  });

  oldCategory = '';
  showSubmit = true;
  labelName = 'New Category';

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data$: Observable<IAppData> | undefined,
    private _spendingService: SpendingService,
    private _snackBarService: SnackbarService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  @ViewChild('categoryInput')
  inputElement!: ElementRef;

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    if (this.form.valid) {
      this._spendingService.addSpendingCategory(this.form.value.category)
        .subscribe((result: any) => {
          this._snackBarService.openSuccessSnackBar(`Created ${this.form.value.category}`, 800);
          this.form.reset();
        },
          err => this._snackBarService.openErrorSnackBar(err.error, 1000));
    }
  }

  deleteCategory(categoryName: string) {
    this._spendingService.removeSpendingCategory(categoryName).
      subscribe(
        () => this._snackBarService.openSuccessSnackBar(`Succesfully deleted ${categoryName}`, 1000),
        (err: any) => this._snackBarService.openErrorSnackBar(err.error, 1000)
      );
  }

  editCategory(newCategory: string): void {
    this._spendingService.editCategory(this.oldCategory, newCategory).
      subscribe((res: any) => {
        this.dropEdit();
        this._snackBarService.openSuccessSnackBar(`Edited ${this.oldCategory} to ${newCategory}`, 1500)
      }, (err: any) => this._snackBarService.openErrorSnackBar(err.error, 1000));
  }

  changeInputToEdit(category: string) {
    this.setInput(category);
    this.oldCategory = category;
    this.showSubmit = false;
    this.labelName = "Edit Category";
    this.form.markAsPristine();
  }

  dropEdit() {
    this.setInput('');
    this.showSubmit = true;
    this.labelName = 'New Category';
    this.oldCategory = '';
  }

  setInput(val: string) {
    this.inputElement.nativeElement.focus();
    this.form.setValue({ 'category': val });
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
