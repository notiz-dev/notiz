import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then(m => m.BlogModule)
  },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: "**",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        m => m.PageNotFoundModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
