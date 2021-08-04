import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllMaterialModule } from './material.module';
import { BudgetComponent } from './budget/budget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageBudgetDialog } from 'src/modals/manage-budget/manage-budget-dialog';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    ManageBudgetDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
