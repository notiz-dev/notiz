import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogHeadlineComponent } from './blog-headline.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BlogHeadlineComponent],
  imports: [CommonModule, IonicModule],
  exports: [BlogHeadlineComponent],
  providers: []
})
export class BlogHeadlineModule {}
