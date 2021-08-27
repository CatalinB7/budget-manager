import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ManageBudgetDialog,
} from 'src/app/modals/manage-budget/manage-budget-dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { SpendingsModule } from './spendings/spendings.module';
import {
  LoadingInterceptorService,
} from './utils/interceptors/loading.interceptor';
import { PieInputPipe } from './utils/pipes/pie-input.pipe';
import {
  SharedPipesModule,
} from './utils/pipes/shared-pipes/shared-pipes.module';
import { SpendcardInputPipe } from './utils/pipes/spendcard-input.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    ManageBudgetDialog,
    PieInputPipe,
    SpendcardInputPipe
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
    SharedPipesModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
