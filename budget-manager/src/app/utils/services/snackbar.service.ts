import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  config = new MatSnackBarConfig();
  constructor(private _snackBar: MatSnackBar) { }

  openSuccessSnackBar(message: string, duration: number) {
    this.config.panelClass = ['snackbar-success'];
    this.config.duration = duration;
    this._snackBar.open(message, undefined, this.config);
  }

  openErrorSnackBar(message: string, duration: number) {
    this.config.panelClass = ['snackbar-error'];
    this.config.duration = duration;
    this._snackBar.open(message, undefined, this.config);
  }

}
