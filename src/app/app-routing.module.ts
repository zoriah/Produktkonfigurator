import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { ProductComponent } from './product/product.component';
import { FileInputComponent } from './file-input/file-input.component';

const routes:Routes=[
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  //{ path: 'fileInput', component: FileInputComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
