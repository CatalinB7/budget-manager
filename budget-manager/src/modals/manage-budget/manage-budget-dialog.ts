import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBudget } from 'src/app/model/budget';

@Component({
    selector: 'manage-budget-dialog',
    templateUrl: 'manage-budget-dialog.html',
})
export class ManageBudgetDialog {

    constructor(
        public dialogRef: MatDialogRef<ManageBudgetDialog>,
        @Inject(MAT_DIALOG_DATA) public data: IBudget
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit() {

    }
}