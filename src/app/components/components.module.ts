import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStackComponent } from './card-stack/card-stack.component';
import { MarkdownModule } from 'ngx-markdown';
import { ShareComponent } from './share/share.component';
import { PipesModule } from '@pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardStackComponent, ShareComponent],
  imports: [CommonModule, PipesModule, MarkdownModule.forChild(), RouterModule],
  exports: [CardStackComponent, ShareComponent],
  providers: [],
})
export class ComponentsModule {}
