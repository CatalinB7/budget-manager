import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  AddSpendingDialog,
} from 'src/app/modals/add-spending/add-spending-dialog';

import {
  CategoryModalComponent,
} from '../modals/category/category-modal.component';
import {
  DeleteWarningDialogComponent,
} from '../modals/delete-warning/delete-warning-dialog.component';
import { ISpending } from '../model/spending';
import {
  IComputedSpendCateg,
  ISpendingCategory,
} from '../model/spendingCategory';
import { ISpendingDeleteData } from '../model/spendingOperations';
import { ISpendingTotal } from '../model/spendingTotal';

@Component({
  selector: 'app-spending-card',
  templateUrl: './spending-card.component.html',
  styleUrls: ['./spending-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingCardComponent implements OnInit {
  @Input()
  get spendingList() { return this._spendingList }
  set spendingList(spendingList: ISpendingCategory[]) {
    this._spendingList = spendingList;
  }

  @Input()
  get spendingTotals() { return this._spendingTotals }
  set spendingTotals(spendingTotals: ISpendingTotal[]) {
    this._spendingTotals = spendingTotals;
  }

  @Output() deleteEvent = new EventEmitter<ISpendingDeleteData>();
  @Output() addEvent = new EventEmitter<ISpending>();

  private _spendingList: ISpendingCategory[] = [];
  private _spendingTotals: ISpendingTotal[] = [];
  
  iconText = "arrow_upward";

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.spendingList = changes.spendingList.currentValue
      .sort((a: IComputedSpendCateg, b: IComputedSpendCateg) => a.total < b.total ? -1 : 1);
  }

  clickedIcon() {
    if (this.iconText == "arrow_upward") {
      this.iconText = "arrow_downward";
      this.spendingList = this.spendingList.sort((a: any, b: any) => a.total > b.total ? -1 : 1);
    } else {
      this.iconText = "arrow_upward";
      this.spendingList = this.spendingList.sort((a: any, b: any) => a.total < b.total ? -1 : 1);
    }
  }

  onDelete(categoryName: string, spendingId: string) {
    this.deleteEvent.emit({categoryName, spendingId});
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
    const dialogRef = this._dialog.open(CategoryModalComponent, {
      width: '75vw',
      height: '75vh',
      data: { spendingList: this.spendingList },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clickedIcon(); //sort new array
      this.clickedIcon();
    });
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
