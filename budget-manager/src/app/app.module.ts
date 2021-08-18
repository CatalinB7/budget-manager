import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ManageBudgetDialog,
} from 'src/modals/manage-budget/manage-budget-dialog';
import { DollarPipe } from 'src/utils/dollar.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { SpendingsModule } from './spendings/spendings.module';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    ManageBudgetDialog,
    DollarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SpendingsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
