import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description.component';

@NgModule({
  declarations: [DescriptionComponent],
  exports: [DescriptionComponent],
  imports: [CommonModule],
})
export class DescriptionModule {}
