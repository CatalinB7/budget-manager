import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { Observable } from 'rxjs';
import {
  AddSpendingDialog,
} from 'src/app/modals/add-spending/add-spending-dialog';

import {
  CategoryModalComponent,
} from '../modals/category/category-modal.component';
import {
  DeleteWarningDialogComponent,
} from '../modals/delete-warning/delete-warning-dialog.component';
import { IAppData } from '../model/data';
import { ISpending } from '../model/spending';
import { IComputedSpendCategory } from '../model/spendingCategoryComputed';
import { ISpendingDeleteData } from '../model/spendingOperations';

@Component({
  selector: 'app-spending-card',
  templateUrl: './spending-card.component.html',
  styleUrls: ['./spending-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingCardComponent {

  sortOrder = 1;

  @Input()
  get spendingList() { return this._spendingList; }
  set spendingList(spendingList: IComputedSpendCategory[]) {
    this._spendingList = this.sortArrayByTotals(spendingList, this.sortOrder);
  }

  @Input() modalObs: Observable<IAppData> | undefined = undefined;

  @Output() deleteEvent = new EventEmitter<ISpendingDeleteData>();
  @Output() addEvent = new EventEmitter<ISpending>();

  private _spendingList: IComputedSpendCategory[] = [];

  get iconText() {
    if(this.sortOrder === 1)
      return 'arrow_upward';
    return 'arrow_downward';
  };

  dialogRef: MatDialogRef<CategoryModalComponent, any> | undefined;

  constructor(
    private _dialog: MatDialog,
  ) { }

  sortArrayByTotals(list: IComputedSpendCategory[], order: number) {
    return list.sort((a, b) => a.total < b.total ? order : order * (-1));
  }

  clickedIcon() {
    this.sortOrder *= -1;
    this.spendingList = this.sortArrayByTotals(this.spendingList, this.sortOrder);
  }

  onDelete(categoryName: string, spendingId: string) {
    this.deleteEvent.emit({ categoryName, spendingId });
  }

  openDialog() {
    const dialogRef = this._dialog.open(AddSpendingDialog, {
      data: this.spendingList,
      disableClose: true,
      autoFocus: true,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent.emit(result);
      }
    });
  }

  openDialogCategories() {
    this.dialogRef = this._dialog.open(CategoryModalComponent, {
      width: '500px',
      height: '700px',
      data: this.modalObs,
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(
      () => this.dialogRef = undefined
    );
  }

  openDialogDelWarn(toDelete: string, categoryName: string, spendingId: string) {
    const dialogRef = this._dialog.open(DeleteWarningDialogComponent, {
      width: '350px',
      data: toDelete,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.onDelete(categoryName, spendingId);
    });
  }
}
