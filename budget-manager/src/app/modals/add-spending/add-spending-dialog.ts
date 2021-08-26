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
  MatDialogRef,
} from '@angular/material/dialog';

import { ISpendingCategory } from 'src/app/model/spendingCategory';
import {
  BasicErrorStateMatcher,
} from 'src/app/utils/form-validators/BasicErrorStateMatcher';

@Component({
    selector: 'add-spending-dialog',
    templateUrl: 'add-spending-dialog.html',
    styleUrls: ['./add-spending-dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSpendingDialog {
    matcher = new BasicErrorStateMatcher();
    maxVal = 9999999999;
    minVal = 0;
    maxCharLen = 22;

    form = new FormGroup({
        value: new FormControl('', [
            Validators.required,
            Validators.max(this.maxVal),
            Validators.min(this.minVal),
        ]),
        date: new FormControl((new Date()).toISOString(), [
            Validators.required,
        ]),
        category: new FormControl('', [
            Validators.required,
        ]),
        name: new FormControl('', [
            Validators.required,
            Validators.maxLength(this.maxCharLen),
        ])
    });

    constructor(
        public dialogRef: MatDialogRef<AddSpendingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ISpendingCategory[]
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(this.form.value);
    }
}