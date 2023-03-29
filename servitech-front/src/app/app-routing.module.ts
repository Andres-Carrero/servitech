import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "../app/pages/pageNotFound/pageNotFound.component";

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },

  {
    path: "",
    loadChildren:  () => import('./public/public.module').then(m => m.PublicModule),
  },{
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
