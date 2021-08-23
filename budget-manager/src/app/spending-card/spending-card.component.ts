import {
  Component,
  Input,
  OnInit,
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
import { IComputedSpendCateg } from '../model/spendingCategory';
import { SnackbarService } from '../utils/services/snackbar.service';
import { SpendingService } from '../utils/services/spending.service';

@Component({
  selector: 'app-spending-card',
  templateUrl: './spending-card.component.html',
  styleUrls: ['./spending-card.component.scss']
})
export class SpendingCardComponent implements OnInit {
  @Input() categoryList: IComputedSpendCateg[] = [];
  iconText = "arrow_upward";

  constructor(
    private _dialog: MatDialog,
    private _spendingService: SpendingService,
    private _snackBarService: SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categoryList = changes.categoryList.currentValue
      .sort((a: IComputedSpendCateg, b: IComputedSpendCateg) => a.total < b.total ? -1 : 1);
  }

  clickedIcon() {
    if (this.iconText == "arrow_upward") {
      this.iconText = "arrow_downward";
      this.categoryList = this.categoryList.sort((a: any, b: any) => a.total > b.total ? -1 : 1);
    } else {
      this.iconText = "arrow_upward";
      this.categoryList = this.categoryList.sort((a: any, b: any) => a.total < b.total ? -1 : 1);
    }
  }

  onDelete(categoryName: string, spendingId: string) {
    this._spendingService.removeSpending(categoryName, spendingId).subscribe();
    this._snackBarService.openSuccessSnackBar('Successfully deleted', 1000);
    location.reload();
  }

  openDialog() {
    const dialogRef = this._dialog.open(AddSpendingDialog, {
      data: this.categoryList,
      disableClose: true,
      autoFocus: true,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._spendingService.addSpending(result).subscribe(
          () => this._snackBarService.openSuccessSnackBar('Successfully created spending', 1000)
        );
        location.reload();
      }
    });
  }

  openDialogCategories() {
    const dialogRef = this._dialog.open(CategoryModalComponent, {
      width: '75vw',
      height: '75vh',
      data: { categoryList: this.categoryList },
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
