import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../../guards/login.guard';
import { FollowingVideosComponent } from './following-videos.component';

const routes: Routes = [
  {
    path: '',
    component: FollowingVideosComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowingVideosRoutingModule {}
