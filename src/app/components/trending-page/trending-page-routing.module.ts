import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingPageComponent } from './trending-page.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingPageRoutingModule {}
