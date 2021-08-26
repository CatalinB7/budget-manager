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

import { Observable } from 'rxjs';
import { IAppData } from 'src/app/model/data';
import {
  BasicErrorStateMatcher,
} from 'src/app/utils/form-validators/BasicErrorStateMatcher';
import {
  ModalLoadingService,
} from 'src/app/utils/services/modal-loading.service';

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
  matcher = new BasicErrorStateMatcher();
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
  loading$ = this._modalLoadingService.loading$;

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data$: Observable<IAppData> | undefined,
    private _spendingService: SpendingService,
    private _dialog: MatDialog,
    private _modalLoadingService: ModalLoadingService,
  ) { }

  @ViewChild('categoryInput')
  inputElement!: ElementRef;

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    if (this.form.valid) {
      this._modalLoadingService.startLoading();
      this._spendingService.addSpendingCategory(this.form.value.category)
        .subscribe(() => this.form.reset());
    }
  }

  deleteCategory(categoryName: string) {
    this._modalLoadingService.startLoading();
    this._spendingService.removeSpendingCategory(categoryName).
      subscribe();
  }

  editCategory(newCategory: string): void {
    this._modalLoadingService.startLoading();
    this._spendingService.editCategory(this.oldCategory, newCategory).
      subscribe(() => this.dropEdit());
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
