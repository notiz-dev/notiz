import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorSmallComponent } from './author-small.component';

@NgModule({
  declarations: [AuthorSmallComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthorSmallComponent],
  providers: [],
})
export class AuthorSmallModule {}
