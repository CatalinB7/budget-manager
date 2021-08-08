import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddSpendingDialog } from 'src/modals/add-spending/add-spending-dialog';

import {
  CategoryModalComponent,
} from '../category-modal/category-modal.component';
import {
  IComputedSpendCateg,
  ISpendingCategory,
} from '../model/spendingCategory';

@Component({
  selector: 'app-spending-card',
  templateUrl: './spending-card.component.html',
  styleUrls: ['./spending-card.component.scss']
})
export class SpendingCardComponent implements OnInit {
  @Input() spendingList: ISpendingCategory[] = [];
  @Input() categoryList: IComputedSpendCateg[] = []; //mapped spendingList so it contains total
  iconText = "arrow_upward";

  constructor(private _dialog: MatDialog) { }

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

  openDialog() {
    const dialogRef = this._dialog.open(AddSpendingDialog, {
      disableClose: true,
      autoFocus: true,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
    });
  }
  
  openDialogCategories() {
    const dialogRef = this._dialog.open(CategoryModalComponent, {
      width: '75vw',
      height: '75vh',
      data: {categoryList: this.categoryList},
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clickedIcon(); //sort new array
      this.clickedIcon();
    });
  }

}
