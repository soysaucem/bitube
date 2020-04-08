import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageVideosComponent } from './mainpage-videos.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageVideosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageVideosRoutingModule {}
