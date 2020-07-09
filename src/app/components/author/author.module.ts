import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';

@NgModule({
  declarations: [AuthorComponent],
  imports: [CommonModule, IonicModule, RouterModule, MarkdownModule.forChild()],
  exports: [AuthorComponent],
  providers: [],
})
export class AuthorModule {}
