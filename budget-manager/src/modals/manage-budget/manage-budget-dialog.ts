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

import { IBudget } from 'src/app/model/budget';

@Component({
    selector: 'manage-budget-dialog',
    templateUrl: 'manage-budget-dialog.html',
    styleUrls: ['./manage-budget-dialog.scss']
})
export class ManageBudgetDialog {
    form = new FormGroup({
        value: new FormControl(this.data.value, [
            Validators.required,
            Validators.max(9999999),
            Validators.min(0)
        ]),
        plannedSaving: new FormControl(this.data.plannedSaving, [
            Validators.required,
            Validators.max(1),
            Validators.min(0)
        ])
    });

    constructor(
        public dialogRef: MatDialogRef<ManageBudgetDialog>,
        @Inject(MAT_DIALOG_DATA) public data: IBudget
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(this.form.value);
    }
}