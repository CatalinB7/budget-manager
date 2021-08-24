import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DollarPipe } from '../dollar.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DollarPipe],
  exports: [DollarPipe]
})
export class SharedPipesModule { }
