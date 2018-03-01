import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CanDoDirective} from './can-do.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CanDoDirective
  ],
  exports: [
    CanDoDirective
  ]
})
export class CanDoModule { }
