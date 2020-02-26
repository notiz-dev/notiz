import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors.component';
import { IonicModule } from '@ionic/angular';
import { AuthorsRoutingModule } from './authors-routing.module';
import { ComponentsModule } from '@components/components.module';
import { AuthorModule } from '@pages/author/author.module';
import { NewsletterSignupModule } from 'src/app/components/newsletter-signup/newsletter-signup.module';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    IonicModule,
    AuthorsRoutingModule,
    AuthorModule,
    ComponentsModule,
    NewsletterSignupModule
  ]
})
export class AuthorsModule {}
