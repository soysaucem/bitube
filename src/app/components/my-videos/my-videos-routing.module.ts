import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../../guards/login.guard';
import { MyVideosComponent } from './my-videos.component';

const routes: Routes = [
  {
    path: '',
    component: MyVideosComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyVideosRoutingModule {}
