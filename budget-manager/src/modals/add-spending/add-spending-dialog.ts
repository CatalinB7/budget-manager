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

import { ISpending } from 'src/app/model/spending';

@Component({
    selector: 'add-spending-dialog',
    templateUrl: 'add-spending-dialog.html',
})
export class AddSpendingDialog {
    form = new FormGroup({
        value: new FormControl('', [
            Validators.required,
            Validators.max(9999999),
            Validators.min(0)
        ]),
        date: new FormControl('', [
            Validators.required,
        ]),
        reccuring: new FormControl('', [
            Validators.required
        ]),
        name: new FormControl('', [
            Validators.required
        ])
    });

    constructor(
        public dialogRef: MatDialogRef<AddSpendingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ISpending
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(this.form.value);
    }
}