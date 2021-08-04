import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingCardComponent } from '../spending-card/spending-card.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShowIfTruncatedDirective } from '../show-if-truncated.directive';



@NgModule({
  declarations: [
    SpendingCardComponent,
    ShowIfTruncatedDirective,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [SpendingCardComponent]
})
export class SpendingsModule { }
