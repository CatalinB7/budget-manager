import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ManageBudgetDialog,
} from 'src/modals/manage-budget/manage-budget-dialog';
import { DollarPipe } from 'src/utils/dollar.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { AllMaterialModule } from './material.module';
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
    AllMaterialModule,
    HttpClientModule,
    SpendingsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
