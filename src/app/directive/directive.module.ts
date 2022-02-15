import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabIndexMoveDirective} from './tab-index-move.directive'


@NgModule({
  declarations: [TabIndexMoveDirective],
  imports: [
    CommonModule
  ],
  exports: [TabIndexMoveDirective]
})
export class DirectiveModule { }
