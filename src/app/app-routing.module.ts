import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    data: { breadcrumb: '' },
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blog/blog.module').then((m) => m.BlogModule),
    data: { breadcrumb: 'Blog' },
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./pages/authors/authors.module').then((m) => m.AuthorsModule),
    data: { breadcrumb: 'Authors' },
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./pages/tags/tags.module').then((m) => m.TagsModule),
    data: { breadcrumb: 'Tags' },
  },
  {
    path: 'confirm-subscription',
    loadChildren: () =>
      import('./pages/newsletter-confirm/newsletter-confirm.module').then(
        (m) => m.NewsletterConfirmModule
      ),
    data: { breadcrumb: 'Confirm Subscription' },
  },
  {
    path: 'unsubscribe',
    loadChildren: () =>
      import(
        './pages/newsletter-unsubscribe/newsletter-unsubscribe.module'
      ).then((m) => m.NewsletterUnsubscribeModule),
    data: { breadcrumb: 'Unsubscribe' },
  },
  {
    path: 'legal',
    loadChildren: () =>
      import('./pages/legal/legal.module').then((m) => m.LegalModule),
    data: { breadcrumb: 'Legal' },
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
    data: { breadcrumb: '404' },
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
